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
        case 'UPDATE_CELL_VALUE':
            return {
                ...state,
                values: updateCellValue(state.values, action.index, action.value)
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
        clickState: Array(81).fill(false)
    };

    return state;
}

export const toggleCell = (list, index) => {
    let toggledList = Array(list.length).fill(false);
    toggledList[index] = true;
    return toggledList;
};

export const addCellValue = (list, index, value) => {
    return [
        ...list.slice(0, index),
        value,
        ...list.slice(index + 1)
    ];
};

export const deleteCellValue = (list, index) => {
    return [
        ...list.slice(0, index),
        null,
        ...list.slice(index + 1)
    ];
}

export const updateCellValue = (list, index, value) => {
    return [
        ...list.slice(0, index),
        value,
        ...list.slice(index + 1)
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
    const listBefore = [0, 0, 0];
    const listAfter = [0, 2, 0];

    deepFreeze(listBefore);

    expect(addCellValue(listBefore, 1, 2)).toEqual(listAfter);
}

const testDeleteCellValue = () => {
    const listBefore = [1, 3, 4];
    const listAfter = [1, 3, null];

    deepFreeze(listBefore);

    expect(deleteCellValue(listBefore, 2)).toEqual(listAfter);
}

const testUpdateCellValue = () => {
    const listBefore = [1, 5, 4];
    const listAfter = [9, 5, 4];

    deepFreeze(listBefore);

    expect(updateCellValue(listBefore, 0, 9)).toEqual(listAfter);
}

testToggleCell();
testAddCellValue();
testDeleteCellValue();
testUpdateCellValue();

console.log("Tests have passed!");

let store = createStore(updateSudoku, generateInitialGameState());

export default store;
