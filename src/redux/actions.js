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
