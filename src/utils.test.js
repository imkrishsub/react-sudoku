import { assign, hasDuplicates, hasNullOrZero } from "./utils";

describe("assigning multiple values of an array", () => {
    test("should work as expected", () => {
        const arrayBefore = [1, 2, 3, 4, 5];
        const arrayAfter = [1, 7, 7, 7, 5];

        assign(arrayBefore, [1, 2, 3], Array(3).fill(7));

        expect(arrayBefore).toEqual(arrayAfter);
    });
});

describe("hasDuplicates function", () => {
    test("should return true when array has duplicates", () => {
        const arrayWithDuplicates = [1, 2, 3, 1, 4];

        expect(hasDuplicates(arrayWithDuplicates)).toBe(true);
    });

    test("should return false when array does not have duplicates", () => {
        const arrayWithoutDuplicates = [1, 2, 3, 4, 5];

        expect(hasDuplicates(arrayWithoutDuplicates)).toBe(false);
    });
});

describe("hasNullOrZero", () => {
    test("should return false when array has no null or zero", () => {
        const arrayWithoutNullOrZero = [1, 2, 3, 4, 5];

        expect(hasNullOrZero(arrayWithoutNullOrZero)).toBe(false);
    });

    test("should return true when array has null values", () => {
        const arrayWithNull = [1, 2, null, 4, 5];

        expect(hasNullOrZero(arrayWithNull)).toBe(true);
    });

    test("should return true when array has zero", () => {
        const arrayWithZero = [0, 1, 2, 3, 4];

        expect(hasNullOrZero(arrayWithZero)).toBe(true);
    });

    test("should return true when array has zero AND null", () => {
        const arrayWithNullAndZero = [0, 1, 2, null, 4];

        expect(hasNullOrZero(arrayWithNullAndZero)).toBe(true);
    });
});
