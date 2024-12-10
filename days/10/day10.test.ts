import { assertEquals } from "jsr:@std/assert";
import { parseInput, solveFirst } from "./day10.ts";

const EXAMPLE_DATA: string = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

Deno.test("Day 10, first part example works", () => {
    assertEquals(solveFirst(parseInput(EXAMPLE_DATA)), 36);
});
