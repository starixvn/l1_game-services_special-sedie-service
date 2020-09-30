import mongoose from "mongoose";
import { middlewares } from "sc-common";
import { GameStartup, Routers } from "sc-pool-betting-game-base";

import { PlaceBetConsumer } from "./consumers";

export default class Startup extends GameStartup {
    /**
     * @param {socketIo.Socket} socketClient
     */
    initSocketRouter(socketClient) {
        const router = new Routers.SocketRouter({
            definition: this.definition,
            gameData: this.gameData,
            placeBetConsumer: new PlaceBetConsumer({ definition: this.definition, gameData: this.gameData }),
        });

        router.init(socketClient);
    }

    async configureServices(app) {
        super.configureServices(app);

        await middlewares.database.configureDatabase(mongoose, this.appConfigs.database);
    }
}
