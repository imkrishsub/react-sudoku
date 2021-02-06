import { assign } from "../utils";
import { toggleCell, highlightCells, deleteCellValue, addCellValue } from "./actions";
import { checkForCompletion } from "./store";
import expect from "expect";
import deepFreeze from "deepfreeze";

const testToggleCell = () => {
    let listAfter = Array(81).fill(false);
    listAfter[21] = true;

    expect(toggleCell(21)).toEqual(listAfter);
};

const testHighlightCells = () => {
    let listAfter = Array(81).fill(false);

    assign(listAfter, [0, 1, 2, 3, 4, 5, 6, 7, 8], Array(9).fill(true));
    assign(listAfter, [3, 4, 5, 12, 13, 14, 21, 22, 23], Array(9).fill(true));
    assign(listAfter, [1, 4, 7, 28, 31, 34, 55, 58, 61], Array(9).fill(true));

    expect(highlightCells(4)).toEqual(listAfter);
    expect(listAfter.length).toEqual(listAfter.length);
};

const testAddCellValue = () => {
    const listBefore = [[0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1]];
    const listAfter = [[0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 1, 1, 1, 1, 1, 1, 1]];

    deepFreeze(listBefore);

    expect(addCellValue(listBefore, 10, 2)).toEqual(listAfter);
}

const testDeleteCellValue = () => {
    const listBefore = [[0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1]];
    const listAfter = [[0, 0, 0, 0, 0, 0, 0, 0], [1, null, 1, 1, 1, 1, 1, 1, 1]];

    deepFreeze(listBefore);

    expect(deleteCellValue(listBefore, 10)).toEqual(listAfter);
}

const testCheckForCompletion = () => {
    const values =  [[6, 3, 1, 2, 7, 5, 9, 4, 8],
                     [5, 4, 9, 8, 3, 1, 6, 7, 2],
                     [8, 7, 2, 6, 9, 4, 5, 1, 3],
                     [8, 2, 3, 7, 5, 4, 1, 6, 9],
                     [1, 5, 7, 3, 9, 6, 2, 8, 4],
                     [4, 6, 9, 2, 8, 1, 7, 3, 5],
                     [5, 1, 6, 4, 9, 2, 3, 8, 7],
                     [9, 2, 8, 7, 6, 3, 4, 1, 5],
                     [3, 4, 7, 1, 5, 8, 9, 2, 6]];

    expect(checkForCompletion(values)).toEqual(true);
}

const runTests = () => {
    testToggleCell();
    testHighlightCells();
    testAddCellValue();
    testDeleteCellValue();
    testCheckForCompletion();

    console.log("Tests have passed!");
}

export default runTests;
