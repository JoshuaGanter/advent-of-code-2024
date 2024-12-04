import { assertEquals } from "jsr:@std/assert";
import { parseInput, solveFirst, solveSecond } from "./day04.ts";

const EXAMPLE_DATA: string = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

Deno.test("Day 04, first part example works", () => {
    assertEquals(solveFirst(parseInput(EXAMPLE_DATA)), 18);
});

Deno.test("Day 04, second part example works", () => {
    assertEquals(solveSecond(parseInput(EXAMPLE_DATA)), 9);
});
