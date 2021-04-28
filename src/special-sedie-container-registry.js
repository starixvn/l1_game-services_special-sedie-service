import { asClass, asValue } from "awilix";
import { ContainerRegistry } from "sc-pool-betting-game-base";

import { SpecialSediePlaceBetConsumer } from "./consumers";
import { SpecialSedieGameCron } from "./crons";
import { SpecialSeDieBetLogs, SpecialSeDieBets, SpecialSeDieRounds } from "./models";

export default class SpecialSedieContainerRegistry extends ContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(SpecialSeDieRounds),
            betsRepository: asValue(SpecialSeDieBets),
            betLogsRepository: asValue(SpecialSeDieBetLogs),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(SpecialSediePlaceBetConsumer).singleton(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            gameCron: asClass(SpecialSedieGameCron).singleton().proxy(),
        });
    }
}
