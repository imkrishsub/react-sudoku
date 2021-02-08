import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { ADD_VALUE, DELETE_VALUE, TOGGLE_CELL, LOAD_PUZZLE } from "./actionTypes";
import { toggleCell, highlightCells, addCellValue, deleteCellValue, highlightCellsWithSameNumber } from "./actions";
import { hasDuplicates, hasNullOrZero } from "../utils";

// The reducer
function sudoku(state = generateInitialGameState(), action) {
    switch(action.type) {
        case LOAD_PUZZLE:
            state = {
                ...state,
                values: convertToBoxes(action.payload.puzzle)
            };

            state.editState = getEditState(state.values);

            return state;
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

// A custom Sudoku validator
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

            if (hasDuplicates(sequence) || hasNullOrZero(sequence)) { return false; }

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


            if (hasDuplicates(sequence) || hasNullOrZero(sequence)) { return false; }

            sequence = [];
        }
    }

    // Check boxes
    for (var aBox of values) {
        if (hasDuplicates(aBox) || hasNullOrZero(aBox)) { return false; }
    }

    return true;
}

export const convertToBoxes = (values) => {
    let valuesTransposedToBoxes = Array(9);

    for (var i=0; i<9; i++) {
        // for each row

        valuesTransposedToBoxes[i] = Array(9).fill(0);

        for (var j=0; j<9; j=j+3) {
            var rowId = 3* Math.floor(i / 3) + Math.floor(j / 3);
            var index = 3 * (i % 3);

            valuesTransposedToBoxes[i][j] = values[rowId][index];
            valuesTransposedToBoxes[i][j+1] = values[rowId][index+1];
            valuesTransposedToBoxes[i][j+2] = values[rowId][index+2];
        }
    }

    return valuesTransposedToBoxes;
}


const generateInitialGameState = () => {
    let state = {
        values: [Array(9).fill(0),
                 Array(9).fill(0),
                 Array(9).fill(0),
                 Array(9).fill(0),
                 Array(9).fill(0),
                 Array(9).fill(0),
                 Array(9).fill(0),
                 Array(9).fill(0),
                 Array(9).fill(0)],
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

            if (aCell !== 0) { editState[index] = false; }
        }

    }

    return editState;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(sudoku, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;
