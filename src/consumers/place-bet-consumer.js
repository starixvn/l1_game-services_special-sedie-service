import { helpers } from "sc-common";
import { EventConsumers } from "sc-pool-betting-game-base";

export default class PlaceBetConsumer extends EventConsumers.PlaceBetConsumer {
    composeBettingTimeValidationCriteria() {
        const configs = this.gameData.gameConfigs;
        const shakeThePlateTime = this.definition.durations.placingBets + this.definition.durations.shakeThePlateDuration;

        return [
            {
                failure: !configs.enabled,
                notice: helpers.noticeHelper.placeBetNextRound,
            },
            {
                failure:
                    this.gameData.remainingTime >= this.definition.durations.placingBets &&
                    this.gameData.remainingTime <= shakeThePlateTime,
                notice: helpers.noticeHelper.cannotPlaceBet,
            },
            {
                failure:
                    this.gameData.remainingTime < this.definition.durations.lockingBet || this.gameData.remainingTime > shakeThePlateTime,
                notice: helpers.noticeHelper.placeBetNextRound,
            },
        ];
    }
}
