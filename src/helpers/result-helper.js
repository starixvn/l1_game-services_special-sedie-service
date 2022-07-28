import Chance from "chance";
import Random from "random";
import { Random as RandomJS, MersenneTwister19937 } from "random-js";

const chance = new Chance();

const settlementRuleEntries = Object.entries({
    odd: (totalReds) => totalReds % 2 === 1,
    even: (totalReds) => totalReds % 2 === 0,
});

const random1 = () => {
    const red1 = (Math.random() * 2) >> 0 !== 0;
    const red2 = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3 <= 10;
    const red3 = (Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3) % 2 === 0;
    const red4 = (Math.floor(Math.random() * 10000) + 1) % 2 !== 0;

    return { red1, red2, red3, red4 };
};

const random2 = () => {
    return { red1: chance.bool(), red2: chance.bool(), red3: chance.bool(), red4: chance.bool() };
};

const random3 = () => {
    return { red1: Random.bool(), red2: Random.bool(), red3: Random.bool(), red4: Random.bool() };
};

const random4 = () => {
    const randomEngine = new RandomJS(MersenneTwister19937.autoSeed());

    return { red1: randomEngine.bool(), red2: randomEngine.bool(), red3: randomEngine.bool(), red4: randomEngine.bool() };
};

const randomModes = {
    1: [random1],
    2: [random2],
    3: [random3, random4],
};

export const generateResult = (randomMode) => {
    const randomFunctions = randomModes[randomMode] ?? randomModes[1];
    const randomFunction = chance.pickone(randomFunctions);

    return randomFunction();
};

export const getSettlementResult = (roundResult) => {
    const totalReds = Object.values(roundResult).filter((value) => value === true).length;

    return settlementRuleEntries.reduce((result, [choice, rule]) => {
        result[choice] = rule(totalReds);

        return result;
    }, {});
};
