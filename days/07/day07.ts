import { join } from "@std/path";

interface ParseResult {
    testValues: number[];
    operationValues: number[][];
}

export function parseInput(
    input: string,
): ParseResult {
    const lines: string[] = input.split("\n").filter((row) => row !== "");
    const testValues: number[] = [];
    const operants: number[][] = [];
    lines.forEach((line) => {
        const [testValueAsString, operantsAsString] = line.split(": ");
        testValues.push(Number(testValueAsString));
        operants.push(operantsAsString.split(" ").map((val) => Number(val)));
    });

    return {
        testValues,
        operationValues: operants,
    };
}

function calculateValue(
    current: number,
    expected: number,
    numbers: readonly number[],
): boolean {
    if (numbers.length === 0) {
        return current === expected;
    }
    const nextNumbers: number[] = Array.from(numbers);
    const nextNumber: number = nextNumbers.shift()!;
    return calculateValue(current + nextNumber, expected, nextNumbers) ||
        calculateValue(current * nextNumber, expected, nextNumbers);
}

export function solveFirst(parseResult: ParseResult): number {
    let sumOfOperableTestValues: number = 0;
    for (let i = 0; i < parseResult.testValues.length; i++) {
        const firstNumber: number = parseResult.operationValues[i].shift()!;
        if (
            calculateValue(
                firstNumber,
                parseResult.testValues[i],
                parseResult.operationValues[i],
            )
        ) sumOfOperableTestValues += parseResult.testValues[i];
    }
    return sumOfOperableTestValues;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: ParseResult = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
}
