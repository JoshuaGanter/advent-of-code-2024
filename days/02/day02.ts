import { join } from "@std/path";
import { assert, assertEquals } from "@std/assert";

type Level = number;
type Report = Level[];

function parseInput(input: string): Report[] {
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

function reportIsSafe(specimen: Report): boolean {
    const trend: ReportLevelTrend = specimen[1] - specimen[0] > 0
        ? ReportLevelTrend.INCREASING
        : ReportLevelTrend.DECREASING;
    for (let i = 0; i < (specimen.length - 1); i++) {
        const distanceToNextLevel: number = specimen[i + 1] - specimen[i];
        if (distanceToNextLevel < 0 && trend === ReportLevelTrend.INCREASING) {
            return false;
        }
        if (distanceToNextLevel > 0 && trend === ReportLevelTrend.DECREASING) {
            return false;
        }
        if (
            Math.abs(distanceToNextLevel) < 1 ||
            Math.abs(distanceToNextLevel) > 3
        ) return false;
    }
    return true;
}

function solveFirst(reports: Report[]): number {
    let sumOfSafeReports: number = reports.reduce(
        (total, report) => total += reportIsSafe(report) ? 1 : 0,
        0,
    );
    return sumOfSafeReports;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(
        join(import.meta.dirname!, "input.txt"),
    );
    const input: Report[] = parseInput(inputText);
    console.log(`Result #1: ${solveFirst(input)}`);
}
