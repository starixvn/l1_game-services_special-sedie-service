export default {
    hostingPort: 7002,
    apiSettings: {
        enabledApi: true,
        apiUrl: "http://10.99.99.101:7300",
        authUrl: "http://10.99.99.101:7303",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },
        useAuthenticate: true,
        placeBetTimeout: 4500,
        requestTimeout: 10000, // 10s
        enabledApiLogs: true,
    },
    mainServerApiSettings: {
        url: "http://10.99.99.101:7202",
        auth: {
            url: "http://10.99.99.101:7303",
            id: "game-services",
            secret: "gameservices@20luminet&",
        },
        requestTimeout: 10000,
        placeBetTimeout: 4500,
        useAuthenticate: true,
    },
    socketOptions: {
        pingInterval: 60 * 1000,
        pingTimeout: 60 * 1000,
        transports: ["websocket"],
        allowUpgrades: false,
    },
    enabledLogs: true,
    database: {
        url: "mongodb://lmn_backend:LmnBackend%4022027@10.99.99.187:27201/?replicaSet=SabaUAT",
        options: {
            dbName: "minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
    sentry: {
        sentryUrl: "http://27695e2250c741e298cdfb69b0b4ffa5@10.99.99.187:800/136",
        logIdentifier: "special-sedie",
        env: "UAT",
    },
    authenticateSettings: {
        audiences: ["api", "admin-api"],
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    enableCorsWs: true,
    corsUrls: ["http://uat.sabagame.com", "https://uat.sabagame.com", "http://uat-adm.sabagame.com", "https://uat-adm.sabagame.com"],
};
