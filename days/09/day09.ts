import { join } from "@std/path";
import { assertEquals } from "@std/assert";

type Block = number | ".";

export function parseInput(input: string): readonly Block[] {
    const lines: string[] = input.split("\n").filter((row) => row !== "");
    assertEquals(lines.length, 1);
    const blocks: Block[] = [];
    for (let i = 0; i < lines[0].length; i++) {
        const length: number = Number(lines[0][i]);
        blocks.push(...new Array(length).fill(i % 2 === 0 ? i / 2 : "."));
    }

    return blocks;
}

export function solveFirst(blocks: readonly Block[]): number {
    const blocksCopy = Array.from(blocks);
    const sortedBlocks: Block[] = [];
    while (blocksCopy.length > 0) {
        const block = blocksCopy.shift()!;
        if (block !== ".") {
            sortedBlocks.push(block);
            continue;
        }
        const lastFileBlockIndex = blocksCopy.findLastIndex((block) =>
            block !== "."
        );
        sortedBlocks.push(blocksCopy[lastFileBlockIndex]);
        blocksCopy.splice(lastFileBlockIndex);
    }

    return sortedBlocks.reduce<number>((total, block, index) => {
        return block === "." ? total : total + (index * block);
    }, 0);
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: readonly Block[] = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
}
