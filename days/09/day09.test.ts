import { assertEquals } from "jsr:@std/assert";
import { parseInput, solveFirst } from "./day09.ts";
import { parseInput2, solveSecond } from "./day09-02.ts";

const EXAMPLE_DATA: string = `2333133121414131402`;
const parseResult = parseInput(EXAMPLE_DATA);

Deno.test("Day 09, example is parsed correctly", () => {
    const result = parseResult.join("");
    assertEquals(result, "00...111...2...333.44.5555.6666.777.888899");
});

Deno.test("Day 09, first part example works", () => {
    assertEquals(solveFirst(parseResult), 1928);
});

const parseResult2 = parseInput2(EXAMPLE_DATA);

Deno.test("Day 09, example is parsed correctly (pt. 2)", () => {
    const result = parseResult2.map((block) =>
        block.isSpace
            ? ".".repeat(block.length)
            : block.id.toString().repeat(block.length)
    ).join("");
    assertEquals(result, "00...111...2...333.44.5555.6666.777.888899");
});

Deno.test("Day 09, second part example works", () => {
    assertEquals(solveSecond(parseResult2), 2858);
});
