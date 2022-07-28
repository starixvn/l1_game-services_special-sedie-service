import { generateResult, getSettlementResult } from "../result-helper";

const chanceMock = { pickoneIndex: 0 };

jest.mock("chance", () => {
    return function () {
        const orig = {
            ...jest.requireActual("chance"),
        };

        return {
            bool: (opt) => {
                return new orig.Chance().bool(opt);
            },
            pickone: (arr) => arr[chanceMock.pickoneIndex],
        };
    };
});

describe("getSettlementResult tests", () => {
    it("should return odd if results have ONE red", () => {
        // arrange
        const roundResult = { red1: true, red2: false, red3: false, red4: false };
        const expected = {
            odd: true,
            even: false,
        };

        // act
        var result = getSettlementResult(roundResult);

        // assert
        expect(result).toStrictEqual(expected);
    });

    it("should return even if results have TWO reds", () => {
        // arrange
        const roundResult = { red1: true, red2: true, red3: false, red4: false };
        const expected = {
            odd: false,
            even: true,
        };

        // act
        var result = getSettlementResult(roundResult);

        // assert
        expect(result).toStrictEqual(expected);
    });

    it("should return odd if results have THREE reds", () => {
        // arrange
        const roundResult = { red1: true, red2: true, red3: true, red4: false };
        const expected = {
            odd: true,
            even: false,
        };

        // act
        var result = getSettlementResult(roundResult);

        // assert
        expect(result).toStrictEqual(expected);
    });

    it("should return even if results have FOUR reds", () => {
        // arrange
        const roundResult = { red1: true, red2: true, red3: true, red4: true };
        const expected = {
            odd: false,
            even: true,
        };

        // act
        var result = getSettlementResult(roundResult);

        // assert
        expect(result).toStrictEqual(expected);
    });

    it("should return even and white4 if results have NO reds", () => {
        // arrange
        const roundResult = { red1: false, red2: false, red3: false, red4: false };
        const expected = {
            odd: false,
            even: true,
        };

        // act
        var result = getSettlementResult(roundResult);

        // assert
        expect(result).toStrictEqual(expected);
    });
});

describe("generateResult tests", () => {
    const testCases = [
        { randomMode: undefined, pickoneIndex: 0 },
        { randomMode: 1, pickoneIndex: 0 },
        { randomMode: 2, pickoneIndex: 0 },
        { randomMode: 3, pickoneIndex: 0 },
        { randomMode: 3, pickoneIndex: 1 },
    ];

    it.each(testCases)("should return correct results", ({ randomMode, pickoneIndex }) => {
        // Arrange
        chanceMock.pickoneIndex = pickoneIndex;

        // Act
        const result = generateResult(randomMode);

        // Assert
        expect(Object.keys(result).length).toBe(4);
        expect(Object.values(result).some((dice) => typeof dice != "boolean")).toBeFalsy();
    });
});
