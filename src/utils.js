// https://stackoverflow.com/questions/20294193/shortest-way-to-change-multiple-values-of-an-array-at-once
export const assign = (obj, props, vals) => {
    for (var i = 0; i < props.length; i++) {
        obj[props[i]] = vals[i];
    }
}
