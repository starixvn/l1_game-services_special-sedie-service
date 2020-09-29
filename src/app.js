import { Core } from "sc-game-base";
import { GameData } from "sc-pool-betting-game-base";

import gameSettings from "./game-settings";
import { SpecialSeDieBetLogs, SpecialSeDieBets, SpecialSeDieRounds } from "./models";

const settlementRuleEntries = Object.entries({
    odd: (totalReds) => totalReds % 2 === 1,
    even: (totalReds) => totalReds % 2 === 0,
});

const generateResult = () => {
    const red1 = (Math.random() * 2) >> 0 !== 0;
    const red2 = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3 <= 10;
    const red3 = (Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3) % 2 === 0;
    const red4 = (Math.floor(Math.random() * 10000) + 1) % 2 !== 0;

    return { red1, red2, red3, red4 };
};

const getSettlementResult = (roundResult) => {
    const totalReds = Object.values(roundResult).filter((value) => value === true).length;

    return settlementRuleEntries.reduce((result, [choice, rule]) => {
        result[choice] = rule(totalReds);

        return result;
    }, {});
};

const run = async () => {
    const gameData = new GameData(gameSettings.durations.wholeRound);
    const gameDefinition = new Core.GameDefinition(
        gameSettings,
        generateResult,
        getSettlementResult,
        SpecialSeDieRounds,
        SpecialSeDieBets,
        SpecialSeDieBetLogs
    );
};

run();
