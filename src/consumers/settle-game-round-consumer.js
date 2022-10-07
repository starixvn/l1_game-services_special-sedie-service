import { SettleGameRoundConsumer } from "sc-pool-betting-game-base";

export default class SpecialSedieSettleGameRoundConsumer extends SettleGameRoundConsumer {
    async settleBets({ result, settlementResult, roundId, time }) {
        const bets = await this.queryBets(roundId);

        if (bets && bets.length) {
            const testCurrencies = await this.currencyRepository.find({ isTest: true }, "name partnerId").lean().exec();

            const realBets = bets.filter(
                (bet) => !testCurrencies.some((currency) => currency.name === bet.currency && currency.partnerId === bet.partnerId)
            );

            console.log("real bets");
            console.log(realBets);
            console.log("total bets");
            console.log(this.gameData.totalBets);

            const realBetProcessors = this.settleBetsByGroup(realBets, roundId, settlementResult, this.gameData.totalBets);

            const testBets = bets.filter((bet) =>
                testCurrencies.some((currency) => currency.name === bet.currency && currency.partnerId === bet.partnerId)
            );

            console.log("test bets");
            console.log(testBets);
            console.log("total test bets");
            console.log(this.gameData.totalTestBets);

            const testBetProcessors = this.settleBetsByGroup(testBets, roundId, settlementResult, this.gameData.totalTestBets);

            await Promise.all(realBetProcessors.concat(testBetProcessors));

            const settledBets = await this.querySettledBets(roundId);

            await Promise.all(
                settledBets.map(async (bet) => {
                    const betResult = this.calculateBetResult(bet);

                    await this.callEndGame(bet, roundId, time, betResult);
                    this.captureBetResult(bet.uid, betResult);

                    if (bet.playerId) {
                        this.userBetResultPublisher.publish(bet.uid, betResult);
                    }
                })
            );
        }

        this.roundResultPublisher.publishRoundResult(this.collectRoundResult(result, settlementResult, roundId));
    }
}
