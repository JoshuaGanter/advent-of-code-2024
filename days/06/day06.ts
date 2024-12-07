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

function levelIsLooping(parseResult: ParseResult): boolean {
    const visitedPositions: { point: Point2D; direction: Direction }[] = [];

    let currentPosition: Point2D = parseResult.startPosition;
    let currentDirection: Direction = Direction.NORTH;

    while (
        currentPosition.x < parseResult.size.x && currentPosition.x >= 0 &&
        currentPosition.y < parseResult.size.y && currentPosition.y >= 0
    ) {
        if (
            visitedPositions.some((val) =>
                val.point.x === currentPosition.x &&
                val.point.y === currentPosition.y &&
                val.direction === currentDirection
            )
        ) {
            return true;
        }
        visitedPositions.push({
            point: currentPosition,
            direction: currentDirection,
        });
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

    return false;
}

export function solveSecond(parseResult: ParseResult): number {
    let loopingVariants: number = 0;
    for (let x = 0; x < parseResult.size.x; x++) {
        for (let y = 0; y < parseResult.size.y; y++) {
            if (
                parseResult.obstacles.some((val) => val.x === x && val.y === y)
            ) continue;
            if (
                parseResult.startPosition.x === x &&
                parseResult.startPosition.y === y
            ) continue;
            const newObstacles = Array.from(parseResult.obstacles);
            newObstacles.push({ x, y });
            if (
                levelIsLooping({
                    obstacles: newObstacles,
                    size: parseResult.size,
                    startPosition: parseResult.startPosition,
                })
            ) loopingVariants++;
        }
    }
    return loopingVariants;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: ParseResult = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
    console.log(`Result #2: ${solveSecond(input)}`);
}
