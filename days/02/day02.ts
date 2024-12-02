import { join } from "@std/path";
import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/equals";

type Level = number;
type Report = Level[];

export function parseInput(input: string): Report[] {
    const reports: Report[] = [];

    for (const line of input.split("\n")) {
        if (line === "") continue;
        const levelsAsStrings: string[] = line.split(" ");
        const report: Report = levelsAsStrings.map((value) => Number(value));
        reports.push(report);
    }

    return reports;
}

enum ReportLevelTrend {
    INCREASING,
    DECREASING,
}

type ReportSafetyResult = {
    isSafe: true;
} | {
    isSafe: false;
    indexOfErroneousLevel: number;
};

function reportIsSafe(specimen: Report): ReportSafetyResult {
    const trend: ReportLevelTrend = specimen[1] - specimen[0] > 0
        ? ReportLevelTrend.INCREASING
        : ReportLevelTrend.DECREASING;
    for (let i = 0; i < (specimen.length - 1); i++) {
        const distanceToNextLevel: number = specimen[i + 1] - specimen[i];
        if (distanceToNextLevel < 0 && trend === ReportLevelTrend.INCREASING) {
            return { isSafe: false, indexOfErroneousLevel: i };
        }
        if (distanceToNextLevel > 0 && trend === ReportLevelTrend.DECREASING) {
            return { isSafe: false, indexOfErroneousLevel: i };
        }
        if (
            Math.abs(distanceToNextLevel) < 1 ||
            Math.abs(distanceToNextLevel) > 3
        ) return { isSafe: false, indexOfErroneousLevel: i };
    }
    return { isSafe: true };
}

export function solveFirst(reports: Report[]): number {
    const sumOfSafeReports: number = reports.reduce(
        (total, report) => total += reportIsSafe(report).isSafe ? 1 : 0,
        0,
    );
    return sumOfSafeReports;
}

export function solveSecond(reports: Report[]): number {
    let sumOfSafeReports: number = 0;
    for (const report of reports) {
        const reportResult: ReportSafetyResult = reportIsSafe(report);
        if (reportResult.isSafe) {
            sumOfSafeReports++;
            continue;
        }
        // Try to remove the erroneous level, as well as the level before and
        // after, to get a potentially correct report.
        for (const offset of [-1, 0, 1]) {
            const correctedReport = report.toSpliced(
                reportResult.indexOfErroneousLevel + offset,
                1,
            );
            if (reportIsSafe(correctedReport).isSafe) {
                sumOfSafeReports++;
                break;
            }
        }
    }
    return sumOfSafeReports;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: Report[] = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
    console.log(`Result #2: ${solveSecond(input)}`);
}
