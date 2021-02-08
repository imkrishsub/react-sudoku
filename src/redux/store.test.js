import { checkForCompletion, convertToBoxes } from "./store";

describe("checkForCompletion function", () => {
    test("should return true for a completed puzzle", () => {
        const completedPuzzle = [[6, 3, 1, 2, 7, 5, 9, 4, 8],
                                 [5, 4, 9, 8, 3, 1, 6, 7, 2],
                                 [8, 7, 2, 6, 9, 4, 5, 1, 3],
                                 [8, 2, 3, 7, 5, 4, 1, 6, 9],
                                 [1, 5, 7, 3, 9, 6, 2, 8, 4],
                                 [4, 6, 9, 2, 8, 1, 7, 3, 5],
                                 [5, 1, 6, 4, 9, 2, 3, 8, 7],
                                 [9, 2, 8, 7, 6, 3, 4, 1, 5],
                                 [3, 4, 7, 1, 5, 8, 9, 2, 6]];

        expect(checkForCompletion(completedPuzzle)).toBe(true);
    });

    test("should return false for an incomplete puzzle", () => {
        const incompletePuzzle = [[6, 3, 0, 2, 7, 5, 9, 4, 8],
                                 [5, 4, 9, 0, 3, 1, 6, 7, 2],
                                 [8, 7, 2, 6, 9, 4, 5, 1, 3],
                                 [8, 2, 3, 7, 5, 4, 1, 6, 9],
                                 [1, 5, 7, 3, 9, 6, 2, 8, 4],
                                 [4, 6, 9, 2, 8, 1, 7, 3, 5],
                                 [5, 1, 6, 4, 9, 2, 3, 8, 7],
                                 [9, 2, 8, 7, 6, 3, 4, 1, 5],
                                 [3, 4, 7, 1, 5, 8, 9, 2, 6]];

        expect(checkForCompletion(incompletePuzzle)).toBe(false);
    });

    test("should return false for an incorrectly solved puzzle", () => {
        const incorrectPuzzle = [[3, 6, 1, 2, 7, 5, 9, 4, 8],
                                 [5, 4, 9, 8, 3, 1, 6, 7, 2],
                                 [8, 7, 2, 6, 9, 4, 5, 1, 3],
                                 [8, 2, 3, 7, 5, 4, 1, 6, 9],
                                 [1, 5, 7, 0, 9, 6, 2, 8, 4],
                                 [4, 6, 9, 2, 8, 1, 7, 3, 5],
                                 [5, 1, 6, 4, 9, 2, 3, 8, 7],
                                 [9, 2, 8, 7, 6, 3, 4, 1, 5],
                                 [3, 4, 7, 1, 5, 8, 9, 2, 6]];

        expect(checkForCompletion(incorrectPuzzle)).toBe(false);
    });
});

describe("convertToBoxes function", () => {
    test("should tranpose values correctly", () => {
        let valuesByRows = [[6, 3, 1, 2, 7, 5, 9, 4, 8],
                            [5, 4, 9, 8, 3, 1, 6, 7, 2],
                            [8, 7, 2, 6, 9, 4, 5, 1, 3],
                            [8, 2, 3, 7, 5, 4, 1, 6, 9],
                            [1, 5, 7, 3, 9, 6, 2, 8, 4],
                            [4, 6, 9, 2, 8, 1, 7, 3, 5],
                            [5, 1, 6, 4, 9, 2, 3, 8, 7],
                            [9, 2, 8, 7, 6, 3, 4, 1, 5],
                            [3, 4, 7, 1, 5, 8, 9, 2, 6]];

        let valuesByBoxes = [[6, 3, 1, 5, 4, 9, 8, 7, 2],
                             [2, 7, 5, 8, 3, 1, 6, 9, 4],
                             [9, 4, 8, 6, 7, 2, 5, 1, 3],
                             [8, 2, 3, 1, 5, 7, 4, 6, 9],
                             [7, 5, 4, 3, 9, 6, 2, 8, 1],
                             [1, 6, 9, 2, 8, 4, 7, 3, 5],
                             [5, 1, 6, 9, 2, 8, 3, 4, 7],
                             [4, 9, 2, 7, 6, 3, 1, 5, 8],
                             [3, 8, 7, 4, 1, 5, 9, 2, 6]];

        expect(convertToBoxes(valuesByRows)).toStrictEqual(valuesByBoxes);
    });
});
