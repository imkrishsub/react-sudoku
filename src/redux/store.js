import { createStore } from "redux";
import expect from "expect";
import deepFreeze from "deepfreeze";
import { toggleCell, highlightCells, addCellValue, deleteCellValue, highlightCellsWithSameNumber } from './actions';
import {ADD_VALUE, DELETE_VALUE, TOGGLE_CELL} from "./actionTypes";

function sudoku(state = generateInitialGameState(), action) {
    switch(action.type) {
        case TOGGLE_CELL:
            return {
                ...state,
                highlightState: highlightCells(action.index),
                clickState: toggleCell(action.index),
                numberHighlightState: highlightCellsWithSameNumber(state.values, action.index)
            };
        case ADD_VALUE:
            state = {
                ...state,
                values: addCellValue(state.values, action.index, action.value),
            };

            state.isComplete = checkForCompletion(state.values);
            state.numberHighlightState = highlightCellsWithSameNumber(state.values, action.index);
            
            return state;
        case DELETE_VALUE:
            return {
                ...state,
                values: deleteCellValue(state.values, action.index)
            };
        default:
            return state;
    }
}

export const checkForCompletion = (values) => {
    let sequence = [];

    // Check rows
    for (var i=0; i<9; i=i+3) {
        for (var j=0; j<7; j=j+3) {
            sequence.push(
                values[i][j], values[i][j+1], values[i][j+2],
                values[i+1][j], values[i+1][j+1], values[i+1][j+2],
                values[i+2][j], values[i+2][j+1], values[i+2][j+2]
            );

            if (hasDuplicates(sequence) || hasNull(sequence)) { return false; }

            sequence = [];
        }

    }

    // Check columns
    for (i=0; i<3; i++) {

        for (j=0; j<3; j++) {
            sequence.push(
                values[i][j], values[i][j+3], values[i][j+6],
                values[i+3][j], values[i+3][j+3], values[i+3][j+6],
                values[i+6][j], values[i+6][j+3], values[i+6][j+6]
            );


            if (hasDuplicates(sequence) || hasNull(sequence)) { return false; }

            sequence = [];
        }
    }

    // Check boxes
    for (var aBox of values) {
        if (hasDuplicates(aBox) || hasNull(aBox)) { return false; }
    }

    return true;
}

// https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

const hasNull = (array) => {
    return array.includes(null);
}


const generateInitialGameState = () => {
    let state = {
        values: [[6, null, null, null, 7, 5, null, null, null],
                 [null, null, null, null, null, 1, null, null, 2],
                 [8, 7, 2, 6, null, null, null, null, 3],
                 [null, 2, null, null, null, 4, null, 6, 9],
                 [null, 5, null, 3, null, 6, null, null, 4],
                 [null, null, 9, null, null, 1, null, null, 5],
                 [null, null, null, 4, null, 2, null, null, null],
                 [9, null, null, 7, null, null, 4, null, null],
                 [null, null, null, 1, null, 8, null, 2, 6]],
        clickState: Array(81).fill(false),
        highlightState: Array(81).fill(false),
        numberHighlightState: Array(81).fill(false),
        isComplete: false
    };

    state.editState = getEditState(state.values);

    return state;
}

const getEditState = (values) => {
    let editState = Array(81).fill(true);

    for(var aBox of values) {
        for (var aCell of aBox) {
            const index = values.indexOf(aBox)*9 + aBox.indexOf(aCell);

            if (aCell !== null) { editState[index] = false; }
        }

    }

    return editState;
}

// Tests
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

// https://stackoverflow.com/questions/20294193/shortest-way-to-change-multiple-values-of-an-array-at-once
export const assign = (obj, props, vals) => {
    for (var i = 0; i < props.length; i++) {
        obj[props[i]] = vals[i];
    }
}

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

testToggleCell();
testHighlightCells();
testAddCellValue();
testDeleteCellValue();
testCheckForCompletion();

console.log("Tests have passed!");

let store = createStore(sudoku, generateInitialGameState());

export default store;
