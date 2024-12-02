import { assertEquals } from "jsr:@std/assert";
import { solveFirst, solveSecond, parseInput } from "./day02.ts";

const EXAMPLE_DATA: string = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

Deno.test("Day 02, first part example works", () => {
    assertEquals(solveFirst(parseInput(EXAMPLE_DATA)), 2);
});

Deno.test("Day 02, second part example works", () => {
    assertEquals(solveSecond(parseInput(EXAMPLE_DATA)), 4);
});
