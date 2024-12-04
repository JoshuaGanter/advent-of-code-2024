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

const FILTERS_2: string[][][] = [
    [
        ["M", ".", "S"],
        [".", "A", "."],
        ["M", ".", "S"],
    ],
    [
        ["M", ".", "M"],
        [".", "A", "."],
        ["S", ".", "S"],
    ],
    [
        ["S", ".", "M"],
        [".", "A", "."],
        ["S", ".", "M"],
    ],
    [
        ["S", ".", "S"],
        [".", "A", "."],
        ["M", ".", "M"],
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

function matchFiltersOverInput(
    lines: string[][],
    filters: string[][][],
): number {
    let numberOfHits: number = 0;
    const matrixWidth: number = lines[0].length;
    for (let row = 0; row < lines.length; row++) {
        assertEquals(lines[row].length, matrixWidth);
        for (let column = 0; column < matrixWidth; column++) {
            for (const filter of filters) {
                if (filterMatches(lines, filter, row, column)) {
                    numberOfHits++;
                }
            }
        }
    }
    return numberOfHits;
}

export function solveFirst(lines: string[][]): number {
    return matchFiltersOverInput(lines, FILTERS);
}

export function solveSecond(lines: string[][]): number {
    return matchFiltersOverInput(lines, FILTERS_2);
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: string[][] = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
    console.log(`Result #2: ${solveSecond(input)}`);
}
