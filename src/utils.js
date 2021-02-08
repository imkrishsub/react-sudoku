// https://stackoverflow.com/questions/20294193/shortest-way-to-change-multiple-values-of-an-array-at-once
export const assign = (obj, props, vals) => {
    for (var i = 0; i < props.length; i++) {
        obj[props[i]] = vals[i];
    }
}

// https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
export const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

export const hasNullOrZero = (array) => {
    return array.includes(null) || array.includes(0);
}
