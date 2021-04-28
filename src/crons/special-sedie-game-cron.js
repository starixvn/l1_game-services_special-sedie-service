import { GameCron } from "sc-pool-betting-game-base";

export default class SpecialSedieGameCron extends GameCron {
    isStartingTime(remainingTime, durations) {
        return remainingTime === durations.placingBets + durations.shakeThePlateDuration;
    }
}
