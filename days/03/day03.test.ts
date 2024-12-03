import { assertEquals } from "jsr:@std/assert";
import { parseInput, solveFirst, solveSecond } from "./day03.ts";

const EXAMPLE_DATA: string =
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

const EXAMPLE_DATA_2: string =
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

Deno.test("Day 03, first part example works", () => {
    assertEquals(solveFirst(parseInput(EXAMPLE_DATA)), 161);
});

Deno.test("Day 03, second part example works", () => {
    assertEquals(solveSecond(EXAMPLE_DATA_2), 48);
});
