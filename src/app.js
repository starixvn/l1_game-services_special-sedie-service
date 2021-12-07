import { Core } from "sc-game-base";
import { GameData } from "sc-pool-betting-game-base";

import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { generateResult, getSettlementResult } from "./helpers";
import SpecialSedieContainerRegistry from "./special-sedie-container-registry";

const run = async () => {
    const gameData = new GameData(gameSettings.durations.wholeRound);
    const definition = new Core.GameDefinition(gameSettings, generateResult, getSettlementResult);
    const container = new SpecialSedieContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("SpecialSeDie", appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
