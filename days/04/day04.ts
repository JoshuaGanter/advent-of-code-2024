import { join } from "@std/path";
import { assertEquals } from "@std/assert";

const FILTERS: string[][][] = [
    [
        ["X", "M", "A", "S"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
    ],
    [
        ["X", ".", ".", "."],
        ["M", ".", ".", "."],
        ["A", ".", ".", "."],
        ["S", ".", ".", "."],
    ],
    [
        ["X", ".", ".", "."],
        [".", "M", ".", "."],
        [".", ".", "A", "."],
        [".", ".", ".", "S"],
    ],
    [
        [".", ".", ".", "X"],
        [".", ".", "M", "."],
        [".", "A", ".", "."],
        ["S", ".", ".", "."],
    ],
    [
        ["S", "A", "M", "X"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
    ],
    [
        ["S", ".", ".", "."],
        ["A", ".", ".", "."],
        ["M", ".", ".", "."],
        ["X", ".", ".", "."],
    ],
    [
        ["S", ".", ".", "."],
        [".", "A", ".", "."],
        [".", ".", "M", "."],
        [".", ".", ".", "X"],
    ],
    [
        [".", ".", ".", "S"],
        [".", ".", "A", "."],
        [".", "M", ".", "."],
        ["X", ".", ".", "."],
    ],
];

export function parseInput(input: string): string[][] {
    return input.split("\n").filter((str) => str !== "").map((str) =>
        Array.from(str)
    );
}

function filterMatches(
    lines: string[][],
    filter: string[][],
    rowStart: number,
    columnStart: number,
): boolean {
    for (let rowOffset = 0; rowOffset < filter.length; rowOffset++) {
        for (
            let columnOffset = 0;
            columnOffset < filter.length;
            columnOffset++
        ) {
            if (
                filter[rowOffset][columnOffset] === "."
            ) continue;
            if (
                filter[rowOffset][columnOffset] !==
                    lines[rowStart + rowOffset]?.[columnStart + columnOffset]
            ) return false;
        }
    }
    return true;
}

export function solveFirst(lines: string[][]): number {
    let numberOfHits: number = 0;
    const matrixWidth: number = lines[0].length;
    for (let row = 0; row < lines.length; row++) {
        assertEquals(lines[row].length, matrixWidth);
        for (let column = 0; column < matrixWidth; column++) {
            for (const filter of FILTERS) {
                if (filterMatches(lines, filter, row, column)) {
                    numberOfHits++;
                }
            }
        }
    }
    return numberOfHits;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: string[][] = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
}
