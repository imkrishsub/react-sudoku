import { assign } from "../utils";
import { toggleCell, highlightCells, deleteCellValue, addCellValue } from "./actions";
import { checkForCompletion } from "./store";
import expect from "expect";
import deepFreeze from "deepfreeze";

describe("toggling a cell", () => {
    test("should toggle cell to true", () => {
        let listAfter = Array(81).fill(false);
        listAfter[21] = true;

        expect(toggleCell(21)).toStrictEqual(listAfter);
    });
});

describe("highlighting a cell", () => {
    test("should toggle cells with similar values in row, column, and box", () => {
        let listAfter = Array(81).fill(false);

        assign(listAfter, [0, 1, 2, 3, 4, 5, 6, 7, 8], Array(9).fill(true));
        assign(listAfter, [3, 4, 5, 12, 13, 14, 21, 22, 23], Array(9).fill(true));
        assign(listAfter, [1, 4, 7, 28, 31, 34, 55, 58, 61], Array(9).fill(true));

        expect(highlightCells(4)).toStrictEqual(listAfter);
    });
});

describe("adding a value to a cell", () => {
    test("should change values array", () => {
        const listBefore = [[0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1]];
        const listAfter = [[0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 1, 1, 1, 1, 1, 1, 1]];

        deepFreeze(listBefore);

        expect(addCellValue(listBefore, 10, 2)).toStrictEqual(listAfter);
    });
});

describe("deleting a value in a cell", () => {
    test("should remove element from the values array", () => {
        const listBefore = [[0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1]];
        const listAfter = [[0, 0, 0, 0, 0, 0, 0, 0], [1, null, 1, 1, 1, 1, 1, 1, 1]];

        deepFreeze(listBefore);

        expect(deleteCellValue(listBefore, 10)).toStrictEqual(listAfter);
    });
});
