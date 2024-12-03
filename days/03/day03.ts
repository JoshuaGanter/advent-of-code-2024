import { join } from "@std/path";

export function parseInput(input: string): string[] {
    return input.split("\n").filter((val) => val.trim().length !== 0);
}

export function solveFirst(lines: string[]): number {
    let sum: number = 0;
    for (const line of lines) {
        const matchResult = line.matchAll(/mul\((\d+),(\d+)\)/g);
        for (const match of matchResult) {
            sum += Number(match[1]) * Number(match[2]);
        }
    }

    return sum;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: string[] = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
}
