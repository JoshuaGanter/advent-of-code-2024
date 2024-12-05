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

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: ParseResult = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
}
