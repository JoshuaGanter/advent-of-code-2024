import { assertEquals } from "jsr:@std/assert";
import { parseInput, solveFirst } from "./day03.ts";

const EXAMPLE_DATA: string =
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

Deno.test("Day 03, first part example works", () => {
    assertEquals(solveFirst(parseInput(EXAMPLE_DATA)), 161);
});
