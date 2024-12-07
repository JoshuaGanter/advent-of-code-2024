import { assertEquals } from "jsr:@std/assert";
import { parseInput, solveFirst, solveSecond } from "./day06.ts";

const EXAMPLE_DATA: string = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

Deno.test("Day 06, first part example works", () => {
    assertEquals(solveFirst(parseInput(EXAMPLE_DATA)), 41);
});

Deno.test("Day 06, second part example works", () => {
    assertEquals(solveSecond(parseInput(EXAMPLE_DATA)), 6);
});
