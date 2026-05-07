const app = require("./app");
const initDB = require("./config/initDB");

const PORT = 3000;

const startServer = async () => {
    // await initDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();