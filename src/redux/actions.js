import { assign } from "./store";

export const highlightCells = (index) => {
    let highlightedCells = Array(81).fill(false);

    // Toggle cells in the box
    const boxId = Math.floor(index / 9);

    for (var i = boxId*9; i < boxId*9+9; i++) {
        highlightedCells[i] = true;
    }

    // Toggle row cells
    const rowLevel = index % 9;
    let startingBoxId = 3*Math.floor(boxId / 3);

    let span = [];

    switch(rowLevel) {
        case 0:
        case 1:
        case 2:
            span = [0, 1, 2];
            break;
        case 3:
        case 4:
        case 5:
            span = [3, 4, 5];
            break;
        default:
            span = [6, 7, 8];
            break;
    }

    for (i = startingBoxId*9; (i < startingBoxId*9 + 27) && (i < 81); i = i+9) {
        assign(highlightedCells, [i + span[0], i + span[1], i + span[2]], Array(3).fill(true));
    }

    // Toggle column cells
    const columnLevel = index % 9;

    switch(columnLevel % 3) {
        case 0:
            span = [0, 3, 6];
            break;
        case 1:
            span = [1, 4, 7];
            break;
        default:
            span = [2, 5, 8];
            break;
    }

    startingBoxId = boxId % 3;

    for (i = startingBoxId*9; i < 81; i = i+27) {
        assign(highlightedCells, [i + span[0], i + span[1], i + span[2]], Array(3).fill(true));
    }

    highlightedCells[index] = true;
    return highlightedCells;
};

export const toggleCell = (index) => {
    let toggledCells = Array(81).fill(false);
    return [
        ...toggledCells.slice(0, index),
        true,
        ...toggledCells.slice(index + 1)
    ];
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
