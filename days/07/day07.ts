import { join } from "@std/path";

interface ParseResult {
    testValues: readonly bigint[];
    operationValues: readonly (readonly bigint[])[];
}

export function parseInput(
    input: string,
): ParseResult {
    const lines: string[] = input.split("\n").filter((row) => row !== "");
    const testValues: bigint[] = [];
    const operants: bigint[][] = [];
    lines.forEach((line) => {
        const [testValueAsString, operantsAsString] = line.split(": ");
        testValues.push(BigInt(testValueAsString));
        operants.push(operantsAsString.split(" ").map((val) => BigInt(val)));
    });

    return {
        testValues,
        operationValues: operants,
    };
}

function calculateValue(
    current: bigint,
    expected: bigint,
    numbers: readonly bigint[],
): boolean {
    if (numbers.length === 0) {
        return current === expected;
    }
    const nextNumbers: bigint[] = Array.from(numbers);
    const nextNumber: bigint = nextNumbers.shift()!;
    return calculateValue(current + nextNumber, expected, nextNumbers) ||
        calculateValue(current * nextNumber, expected, nextNumbers);
}

export function solveFirst(parseResult: ParseResult): bigint {
    let sumOfOperableTestValues: bigint = BigInt(0);
    for (let i = 0; i < parseResult.testValues.length; i++) {
        const operands: bigint[] = Array.from(parseResult.operationValues[i]);
        const firstNumber: bigint = operands.shift()!;
        if (
            calculateValue(
                firstNumber,
                parseResult.testValues[i],
                operands,
            )
        ) sumOfOperableTestValues += parseResult.testValues[i];
    }
    return sumOfOperableTestValues;
}

function calculateValue2(
    current: bigint,
    expected: bigint,
    numbers: readonly bigint[],
): boolean {
    if (numbers.length === 0) {
        return current === expected;
    }
    const nextNumbers: bigint[] = Array.from(numbers);
    const nextNumber: bigint = nextNumbers.shift()!;
    return calculateValue2(current + nextNumber, expected, nextNumbers) ||
        calculateValue2(current * nextNumber, expected, nextNumbers) ||
        calculateValue2(
            BigInt(`${current.toString()}${nextNumber.toString()}`),
            expected,
            nextNumbers,
        );
}

export function solveSecond(parseResult: ParseResult): bigint {
    let sumOfOperableTestValues: bigint = BigInt(0);
    for (let i = 0; i < parseResult.testValues.length; i++) {
        const operands: bigint[] = Array.from(parseResult.operationValues[i]);
        const firstNumber: bigint = operands.shift()!;
        if (
            calculateValue2(
                firstNumber,
                parseResult.testValues[i],
                operands,
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
    console.log(`Result #2: ${solveSecond(input)}`);
}
