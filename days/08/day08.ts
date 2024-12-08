import { join } from "@std/path";

interface Vec2D {
    x: number;
    y: number;
}

interface ParseResult {
    size: Vec2D;
    antennas: Map<string, Vec2D[]>;
}

export function parseInput(input: string): ParseResult {
    const lines: string[] = input.split("\n").filter((row) => row !== "");
    const size = {
        x: lines[0].length,
        y: lines.length,
    };
    const antennas: Map<string, Vec2D[]> = new Map<string, Vec2D[]>();

    for (let row = 0; row < size.y; row++) {
        for (let column = 0; column < size.x; column++) {
            const frequency: string = lines[row][column];
            if (frequency === ".") continue;
            if (antennas.has(frequency)) {
                antennas.get(frequency)!.push({ x: column, y: row });
                continue;
            }
            antennas.set(lines[row][column], [{ x: column, y: row }]);
        }
    }

    return {
        size,
        antennas,
    };
}

function listContains(needle: Vec2D, haystack: Vec2D[]): boolean {
    return haystack.some((vec2d) =>
        vec2d.x === needle.x && vec2d.y === needle.y
    );
}

function getAntinodesOfFrequency(coordinates: Vec2D[]): Vec2D[] {
    const antinodes: Vec2D[] = [];
    for (let i = 0; i < coordinates.length; i++) {
        for (let j = 0; j < i; j++) {
            const firstAntenna: Vec2D = coordinates[i];
            const secondAntenna: Vec2D = coordinates[j];

            const deltaX: number = secondAntenna.x - firstAntenna.x;
            const deltaY: number = secondAntenna.y - firstAntenna.y;

            antinodes.push({
                x: secondAntenna.x + deltaX,
                y: secondAntenna.y + deltaY,
            });
            antinodes.push({
                x: firstAntenna.x - deltaX,
                y: firstAntenna.y - deltaY,
            });
        }
    }
    return antinodes;
}

export function solveFirst(parseResult: ParseResult): number {
    const antinodes: Vec2D[] = [];

    for (const frequency of parseResult.antennas.keys()) {
        const frequencyAntinodes: Vec2D[] = getAntinodesOfFrequency(
            parseResult.antennas.get(frequency)!,
        );
        const antinodesInBounds: Vec2D[] = frequencyAntinodes.filter((vec2d) =>
            vec2d.x >= 0 && vec2d.y >= 0 && vec2d.x < parseResult.size.x &&
            vec2d.y < parseResult.size.y
        );
        for (const antinode of antinodesInBounds) {
            if (!listContains(antinode, antinodes)) antinodes.push(antinode);
        }
    }

    return antinodes.length;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: ParseResult = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
}
