import { join } from "@std/path";

interface ParseResult {
    rules: Map<number, number[]>;
    pages: number[][];
}

export function parseInput(input: string): ParseResult {
    const [unparsedRules, unparsedPages] = input.split("\n\n");

    const rules = new Map<number, number[]>();
    for (
        const [leftPage, rightPage] of unparsedRules.split("\n")
            .map((unparsedRule) =>
                unparsedRule.split("|").map((page) => Number(page))
            )
    ) {
        if (!rules.has(rightPage)) {
            rules.set(rightPage, [leftPage]);
            continue;
        }
        rules.get(rightPage)?.push(leftPage);
    }

    const pages: number[][] = unparsedPages.split("\n").map((unparsedPage) =>
        unparsedPage.split(",").map((page: string) => Number(page))
    );
    return {
        rules,
        pages,
    };
}

export function solveFirst(parseResult: ParseResult): number {
    const validPrintQueues: number[][] = [];
    for (const printQueue of parseResult.pages) {
        const visitedPages: number[] = [];
        let queueValid: boolean = true;
        for (const page of printQueue) {
            if (
                parseResult.rules.has(page) &&
                !parseResult.rules.get(page)?.every((val) =>
                    !printQueue.includes(val) || visitedPages.includes(val)
                )
            ) {
                queueValid = false;
                break;
            }
            visitedPages.push(page);
        }
        if (queueValid) {
            validPrintQueues.push(printQueue);
        }
    }

    return validPrintQueues.reduce(
        (total, queue) => total + queue[Math.floor(queue.length / 2)],
        0,
    );
}

interface FixResult {
    queue: number[];
    rounds: number;
}

function fixQueue(queue: FixResult, rules: Map<number, number[]>): FixResult {
    let queueValid: boolean = true;
    const visitedPages: number[] = [];
    for (let i = 0; i < queue.queue.length; i++) {
        const page: number = queue.queue[i];
        if (!rules.has(page)) {
            visitedPages.push(page);
            continue;
        }
        const pagesBefore: number[] = rules.get(page)!.filter((val) =>
            queue.queue.includes(val) && !visitedPages.includes(val)
        );
        if (pagesBefore.length === 0) {
            visitedPages.push(page);
            continue;
        }
        const index: number = queue.queue.findIndex((val) =>
            val === pagesBefore[0]
        );
        queue.queue.splice(i, 0, pagesBefore[0]);
        queue.queue.splice(index + 1, 1);
        queueValid = false;
        break;
    }
    if (!queueValid) {
        queue.rounds += 1;
        return fixQueue(queue, rules);
    }
    return queue;
}

export function solveSecond(parseResult: ParseResult): number {
    const fixedQueues: number[][] = [];
    for (const queue of parseResult.pages) {
        const fixResult: FixResult = fixQueue(
            { queue, rounds: 0 },
            parseResult.rules,
        );
        if (fixResult.rounds === 0) {
            continue;
        }
        fixedQueues.push(fixResult.queue);
    }
    return fixedQueues.reduce(
        (total, queue) => total + queue[Math.floor(queue.length / 2)],
        0,
    );
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: ParseResult = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
    console.log(`Result #2: ${solveSecond(input)}`);
}
