import Chance from "chance";
import Random from "random";
import { Random as RandomJS, MersenneTwister19937 } from "random-js";
import { randomInt } from "crypto";

const settlementRuleEntries = Object.entries({
    odd: (totalReds) => totalReds % 2 === 1,
    even: (totalReds) => totalReds % 2 === 0,
});

const mathRandom = () => {
    return Math.random();
};

const random1 = () => {
    return (mathRandom() * 2) >> 0 !== 0;
};

const random2 = () => {
    return Math.floor(mathRandom() * 6) + Math.floor(mathRandom() * 6) + Math.floor(mathRandom() * 6) + 3 <= 10;
};

const random3 = () => {
    return (Math.floor(mathRandom() * 6) + Math.floor(mathRandom() * 6) + Math.floor(mathRandom() * 6) + 3) % 2 === 0;
};

const random4 = () => {
    return (Math.floor(mathRandom() * 10000) + 1) % 2 !== 0;
};

const random5 = () => {
    return randomInt(1, 7) > 3;
};

const random6 = () => {
    const chance = new Chance();
    return chance.integer({ min: 1, max: 6 }) > 3;
};

const random7 = () => {
    return Random.int(1, 6) > 3;
};

const random8 = () => {
    const randomJS = new RandomJS(MersenneTwister19937.autoSeed());
    return randomJS.integer(1, 6) > 3;
};

const randomModes = {
    1: [random1, random2, random3, random4],
    2: [random5, random6, random7, random8],
    3: [random1, random3, random5, random7],
};

export const generateResult = (randomMode) => {
    const selectedMode = randomMode >= 1 && randomMode <= 3 ? randomMode : 1;
    const red1 = randomModes[selectedMode][0]();
    const red2 = randomModes[selectedMode][1]();
    const red3 = randomModes[selectedMode][2]();
    const red4 = randomModes[selectedMode][3]();

    return { red1, red2, red3, red4 };
};

export const getSettlementResult = (roundResult) => {
    const totalReds = Object.values(roundResult).filter((value) => value === true).length;

    return settlementRuleEntries.reduce((result, [choice, rule]) => {
        result[choice] = rule(totalReds);

        return result;
    }, {});
};
