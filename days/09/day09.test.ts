import { assertEquals } from "jsr:@std/assert";
import { parseInput, solveFirst } from "./day09.ts";

const EXAMPLE_DATA: string = `2333133121414131402`;
const parseResult = parseInput(EXAMPLE_DATA);

Deno.test("Day 09, example is parsed correctly", () => {
    const result = parseResult.join("");
    assertEquals(result, "00...111...2...333.44.5555.6666.777.888899");
});

Deno.test("Day 09, first part example works", () => {
    assertEquals(solveFirst(parseResult), 1928);
});
