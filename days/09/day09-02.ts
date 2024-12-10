import { join } from "@std/path";
import { assertEquals } from "@std/assert";

type FileBlockSpan = {
    isSpace: false;
    id: number;
    length: number;
};

type BlockSpan = {
    isSpace: true;
    length: number;
} | FileBlockSpan;

export function parseInput2(input: string): readonly BlockSpan[] {
    const lines: string[] = input.split("\n").filter((row) => row !== "");
    assertEquals(lines.length, 1);
    const blocks: BlockSpan[] = [];
    for (let i = 0; i < lines[0].length; i++) {
        if (i % 2 === 0) {
            blocks.push({
                isSpace: false,
                id: i / 2,
                length: Number(lines[0][i]),
            });
        } else {
            blocks.push({
                isSpace: true,
                length: Number(lines[0][i]),
            });
        }
    }

    return blocks;
}

export function solveSecond(blocks: readonly BlockSpan[]): number {
    const sortedBlocks: BlockSpan[] = [];
    let fileBlocks: readonly FileBlockSpan[] = blocks.filter(
        (block) => !block.isSpace,
    );

    for (const block of blocks) {
        if (!block.isSpace) {
            if (
                sortedBlocks.findIndex((sortedBlock) =>
                    !sortedBlock.isSpace && sortedBlock.id === block.id
                ) !== -1
            ) {
                sortedBlocks.push({ isSpace: true, length: block.length });
                continue;
            }
            sortedBlocks.push(block);
            fileBlocks = fileBlocks.filter((fileBlock) =>
                fileBlock.id !== block.id
            );
            continue;
        }
        let freeSpace: number = block.length;
        const listOfCandidates = Array.from(fileBlocks);

        while (freeSpace > 0 && listOfCandidates.length > 0) {
            const candidate = listOfCandidates.pop()!;
            if (candidate.length <= freeSpace) {
                sortedBlocks.push(candidate);
                fileBlocks = fileBlocks.filter((fileBlock) =>
                    fileBlock.id !== candidate.id
                );
                freeSpace -= candidate.length;
            }
        }
        if (freeSpace > 0) {
            sortedBlocks.push({ isSpace: true, length: freeSpace });
        }
    }

    let ptr: number = 0;
    return sortedBlocks.reduce((total, block) => {
        if (block.isSpace) {
            ptr += block.length;
            return total;
        }
        let blockSum: number = 0;
        for (let i = 0; i < block.length; i++) {
            blockSum += block.id * (i + ptr);
        }
        ptr += block.length;
        return total + blockSum;
    }, 0);
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: readonly BlockSpan[] = parseInput2(inputText);
    console.log(`Result #2: ${solveSecond(input)}`);
}
