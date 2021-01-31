import { createStore } from "redux";
import expect from "expect";
import deepFreeze from "deepfreeze";
import { toggleCell, addCellValue, deleteCellValue } from './actions';
import {ADD_VALUE, DELETE_VALUE, TOGGLE_CELL} from "./actionTypes";

function sudoku(state = generateInitialGameState(), action) {
    switch(action.type) {
        case TOGGLE_CELL:
            return {
                ...state,
                clickState: toggleCell(state.clickState, action.index)
            };
        case ADD_VALUE:
            state = {
                ...state,
                values: addCellValue(state.values, action.index, action.value)
            };

            state.isComplete = checkForCompletion(state.values);
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
    const listBefore = [false, false, false, false];
    const listAfter = [false, true, false, false];

    deepFreeze(listBefore);

    expect(toggleCell(listBefore, 1)).toEqual(listAfter);
    expect(listBefore.length).toEqual(listAfter.length);
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

testToggleCell();
testAddCellValue();
testDeleteCellValue();
testCheckForCompletion();

console.log("Tests have passed!");

let store = createStore(sudoku, generateInitialGameState());

export default store;
