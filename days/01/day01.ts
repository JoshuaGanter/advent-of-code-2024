import { join } from "@std/path";
import { assertEquals, assert } from "@std/assert";

type LocationIdLists = { leftList: readonly number[], rightList: readonly number[] };

function parseInput(input: string): LocationIdLists {
    const leftList: number[] = [];
    const rightList: number[] = [];
    
    for (const line of input.split("\n")) {
        if (line === "") continue;
        const [ leftIdAsString, rightIdAsString ] = line.split("   ");
    
        const leftId = Number(leftIdAsString);
        const rightId = Number(rightIdAsString);
    
        assert(Number.isSafeInteger(leftId));
        assert(Number.isSafeInteger(rightId));
    
        leftList.push(leftId);
        rightList.push(rightId);
    }

    return {
        leftList,
        rightList
    };
}

function distanceBetween(a: number, b: number): number {
    return Math.abs(a - b);
}

function solveFirst(params: LocationIdLists): number {
    const leftListSorted: number[] = params.leftList.toSorted((a, b) => a - b);
    const rightListSorted: number[] = params.rightList.toSorted((a, b) => a - b);

    assertEquals(leftListSorted.length, rightListSorted.length);

    let sumOfDistances: number = 0;
    for (let i = 0; i < leftListSorted.length; i++) {
        sumOfDistances += distanceBetween(leftListSorted[i], rightListSorted[i]);
    }

    return sumOfDistances;
}

function solveSecond(locationIdLists: LocationIdLists): number {
    let sum: number = 0;
    for (const locationId of locationIdLists.leftList) {
        const occurrencesInRightList: number = locationIdLists.rightList.reduce((total, element) => total += (element === locationId ? 1 : 0), 0);
        sum += locationId * occurrencesInRightList;
    }
    return sum;
}

if (import.meta.main) {
    const inputText: string = await Deno.readTextFile(join(import.meta.dirname!, "input.txt"));
    const input: LocationIdLists = parseInput(inputText);
    console.log(`Result #1: ${ solveFirst(input) }`);
    console.log(`Result #2: ${ solveSecond(input) }`);
}
