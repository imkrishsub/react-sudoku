import { createStore } from 'redux';
import expect from 'expect';
import deepFreeze from 'deepfreeze';

function updateSudoku (state = generateInitialGameState(), action) {
    switch(action.type) {
        case 'TOGGLE_CELL':
            return {
                ...state,
                clickState: toggleCell(state.clickState, action.index)
            };
        case 'ADD_CELL_VALUE':
            return {
                ...state,
                values: addCellValue(state.values, action.index, action.value)
            };
        case 'DELETE_CELL_VALUE':
            return {
                ...state,
                values: deleteCellValue(state.values, action.index)
            };
        default:
            return state;
    }
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

export const toggleCell = (list, index) => {
    let toggledList = Array(list.length).fill(false);
    toggledList[index] = true;
    return toggledList;
};

export const addCellValue = (list, index, value) => {
    let boxIterator = Math.floor(index / 9);
    let cellIterator = index % 9;

    let changedArray = [
        ...list[boxIterator].slice(0, cellIterator),
        value,
        ...list[boxIterator].slice(cellIterator + 1)
    ];

    return [
        ...list.slice(0, boxIterator),
        changedArray,
        ...list.slice(boxIterator + 1)
    ];
};

export const deleteCellValue = (list, index) => {
    let boxIterator = Math.floor(index / 9);
    let cellIterator = index % 9;

    let changedArray = [
        ...list[boxIterator].slice(0, cellIterator),
        null,
        ...list[boxIterator].slice(cellIterator + 1)
    ];

    return [
        ...list.slice(0, boxIterator),
        changedArray,
        ...list.slice(boxIterator + 1)
    ];
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

testToggleCell();
testAddCellValue();
testDeleteCellValue();
testUpdateCellValue();

console.log("Tests have passed!");

let store = createStore(updateSudoku, generateInitialGameState());

export default store;
