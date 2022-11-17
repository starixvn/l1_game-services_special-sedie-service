import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";

import { initUserSession } from "./init-user-session";
import { socketOptions } from "./stubs/test-data";

export default function inGameTest() {
    describe("when user join game", () => {
        let driver;
        beforeAll((done) => {
            driver = new GameClientDriver(socketOptions, initUserSession(normalUser));
            driver.handleSignedInEvent(() => {
                done();
            });
        });

        afterAll(() => {
            driver.close();
        });

        // Arrange
        const expectedGameConfigs = {
            minBet: 1,
            maxBet: 2000,
            odds: { odd: 1.97, even: 1.97 },
        };

        const expectedUser = {
            UID: 1,
            avatarId: 1,
            currency: "$US",
            name: "NormalUser",
            rate: 1,
            red: 25000,
            type: false,
        };

        const expectedRoundHistory = [
            {
                roundId: 823211,
                result: { red1: true, red2: true, red3: false, red4: false },
                settlementResult: { odd: false, even: true },
            },
            {
                roundId: 823210,
                result: { red1: true, red2: true, red3: true, red4: false },
                settlementResult: { odd: false, even: true },
            },
            {
                roundId: 823209,
                result: { red1: true, red2: true, red3: true, red4: true },
                settlementResult: { odd: false, even: true },
            },
        ];

        it("should return game configuration (odds, min bet, max bet)", (done) => {
            // Act
            driver.sendInGameEvent();

            // Assert
            driver.handleInGameEvent((inGameData) => {
                console.log("inGameData", inGameData);
                if (inGameData?.gameConfigs) {
                    if (inGameData.gameConfigs) {
                        expect(inGameData.gameConfigs.minBet).toEqual(expectedGameConfigs.minBet);
                        expect(inGameData.gameConfigs.maxBet).toEqual(expectedGameConfigs.maxBet);
                        expect(inGameData.gameConfigs.odds).toStrictEqual(expectedGameConfigs.odds);

                        done();
                    }
                }
            });
        });

        it("should return user information", (done) => {
            // Act
            driver.sendInGameEvent();

            // Assert
            driver.handleInGameEvent((inGameData) => {
                if (inGameData?.user?.UID) {
                    expect(inGameData.user).toStrictEqual(expectedUser);

                    done();
                }
            });
        });

        it("should return old round history", (done) => {
            // Act
            driver.sendInGameEvent();

            // Assert
            driver.handleInGameEvent((inGameData) => {
                console.log("inGameData", inGameData);
                if (inGameData?.roundHistory) {
                    expect(inGameData.roundHistory[inGameData.roundHistory.length - 1]).toEqual(
                        expectedRoundHistory[expectedRoundHistory.length - 1]
                    );
                    done();
                }
            });
        });
    });
}
