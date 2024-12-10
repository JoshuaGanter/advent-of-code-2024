import { join } from "@std/path";

interface Coordinate {
    row: number;
    column: number;
}

export function parseInput(input: string): number[][] {
    return input.split("\n").filter((row) => row !== "").map((heightLine) =>
        Array.from(heightLine).map((height) => Number(height))
    );
}

function listContains(
    needle: Coordinate,
    haystack: readonly Coordinate[],
): boolean {
    return haystack.some((coordinate) =>
        coordinate.row === needle.row && coordinate.column === needle.column
    );
}

export function solveFirst(parseResult: number[][]): number {
    const trailheads: Coordinate[] = [];
    const rows: number = parseResult.length;
    const columns: number = parseResult[0].length;

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (parseResult[row][column] === 0) {
                trailheads.push({ row: row, column: column });
            }
        }
    }

    let scoreSum = 0;
    for (const head of trailheads) {
        const queue: Coordinate[] = [head];
        const visited: Coordinate[] = [head];
        const reachedSummits: Coordinate[] = [];
        while (queue.length > 0) {
            const coordinate = queue.pop()!;
            for (const dir of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const newRow = coordinate.row + dir[0];
                const newCol = coordinate.column + dir[1];
                if (
                    newRow < 0 || newRow >= rows || newCol < 0 ||
                    newCol >= columns
                ) continue;
                if (
                    parseResult[newRow][newCol] !==
                        parseResult[coordinate.row][coordinate.column] + 1
                ) continue;
                if (listContains({ row: newRow, column: newCol }, visited)) {
                    continue;
                }
                visited.push({ row: newRow, column: newCol });
                if (parseResult[newRow][newCol] === 9) {
                    reachedSummits.push({ row: newRow, column: newCol });
                }
                queue.unshift({ row: newRow, column: newCol });
            }
        }
        scoreSum += reachedSummits.length;
    }
    return scoreSum;
}

export function solveSecond(parseResult: number[][]): number {
    const trailheads: Coordinate[] = [];
    const rows: number = parseResult.length;
    const columns: number = parseResult[0].length;

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (parseResult[row][column] === 0) {
                trailheads.push({ row: row, column: column });
            }
        }
    }

    let scoreSum = 0;
    for (const head of trailheads) {
        const queue: Coordinate[] = [head];
        while (queue.length > 0) {
            const coordinate = queue.pop()!;
            for (const dir of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const newRow = coordinate.row + dir[0];
                const newCol = coordinate.column + dir[1];
                if (
                    newRow < 0 || newRow >= rows || newCol < 0 ||
                    newCol >= columns
                ) continue;
                if (
                    parseResult[newRow][newCol] !==
                        parseResult[coordinate.row][coordinate.column] + 1
                ) continue;
                if (parseResult[newRow][newCol] === 9) {
                    scoreSum++;
                } else {
                    queue.unshift({ row: newRow, column: newCol });
                }
            }
        }
    }
    return scoreSum;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: number[][] = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
    console.log(`Result #2: ${solveSecond(input)}`);
}
