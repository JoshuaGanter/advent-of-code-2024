import { join } from "@std/path";

interface Point2D {
    x: number;
    y: number;
}

enum Direction {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
}

interface ParseResult {
    obstacles: Point2D[];
    size: Point2D;
    startPosition: Point2D;
}

export function parseInput(input: string): ParseResult {
    const matrix: string[][] = input.split("\n").filter((row) => row !== "")
        .map((row) => Array.from(row));
    const size: Point2D = { x: matrix.length, y: matrix[0].length };
    let startPosition: Point2D = { x: 0, y: 0 };
    const obstacles: Point2D[] = [];
    for (let row = 0; row < size.y; row++) {
        for (let column = 0; column < size.x; column++) {
            switch (matrix[row][column]) {
                case "^":
                    startPosition = { x: column, y: row };
                    break;
                case "#":
                    obstacles.push({ x: column, y: row });
                    break;
                default:
                    continue;
            }
        }
    }
    return {
        obstacles,
        size,
        startPosition,
    };
}

function getNextPosition(position: Point2D, direction: Direction): Point2D {
    switch (direction) {
        case Direction.NORTH:
            return { x: position.x, y: position.y - 1 };
        case Direction.EAST:
            return { x: position.x + 1, y: position.y };
        case Direction.SOUTH:
            return { x: position.x, y: position.y + 1 };
        case Direction.WEST:
            return { x: position.x - 1, y: position.y };
        default:
            throw new Error(`Incorrect value for direction "${direction}"`);
    }
}

export function solveFirst(parseResult: ParseResult): number {
    const visitedPositions: Point2D[] = [];

    let currentPosition: Point2D = parseResult.startPosition;
    let currentDirection: Direction = Direction.NORTH;

    while (
        currentPosition.x < parseResult.size.x && currentPosition.x >= 0 &&
        currentPosition.y < parseResult.size.y && currentPosition.y >= 0
    ) {
        if (
            !visitedPositions.some((val) =>
                val.x === currentPosition.x && val.y === currentPosition.y
            )
        ) {
            visitedPositions.push(currentPosition);
        }
        let nextPosition = getNextPosition(currentPosition, currentDirection);
        while (
            parseResult.obstacles.some((val) =>
                val.x === nextPosition.x && val.y === nextPosition.y
            )
        ) {
            currentDirection += 1;
            currentDirection %= 4;
            nextPosition = getNextPosition(currentPosition, currentDirection);
        }
        currentPosition = nextPosition;
    }

    return visitedPositions.length;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: ParseResult = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
}
