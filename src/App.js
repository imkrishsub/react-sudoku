import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';
import Game from './components/Game.js';
import expect from 'expect';
import deepFreeze from 'deepfreeze';

function updateSudoku (state, action) {
    if (typeof state === undefined) {
        state = {
            values: Array(81).fill(0),
            isToggled: Array(81).fill(false),
        }
    }
    switch(action.type) {
        case 'TOGGLE_CELL':
            return toggleCell(state.isToggled, action.index);
        case 'ADD_CELL_VALUE':
            return addCellValue(state.values, action.index, action.value);
        case 'DELETE_CELL_VALUE':
            return deleteCellValue(state.values, action.index);
        case 'UPDATE_CELL_VALUE':
            return updateCellValue(state.values, action.index, action.value);
        default:
            return state;
    }
}

const toggleCell = (list, index) => {
    return [
        ...list.slice(0, index),
        !list[index],
        ...list.slice(index + 1)
    ];
};

const addCellValue = (list, index, value) => {
    return [
        ...list.slice(0, index),
        value,
        ...list.slice(index + 1)
    ];
};

const deleteCellValue = (list, index) => {
    return [
        ...list.slice(0, index),
        null,
        ...list.slice(index + 1)
    ];
}

const updateCellValue = (list, index, value) => {
    return [
        ...list.slice(0, index),
        value,
        ...list.slice(index + 1)
    ];
}

// Tests
const testToggleCell = () => {
    const listBefore = [false];
    const listAfter = [true];

    deepFreeze(listBefore);

    expect(toggleCell(listBefore, 0)).toEqual(listAfter);
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

let store = createStore(updateSudoku);

function App() {
  return (
    <Game />
  );
}

export default App;
