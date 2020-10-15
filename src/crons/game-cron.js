import { Crons } from "sc-pool-betting-game-base";

export default class GameCron extends Crons.GameCron {
    isStartingTime(remainingTime, durations) {
        return remainingTime === (durations.placingBets + durations.shakeThePlateDuration);
    }
}