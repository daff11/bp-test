require("dotenv").config();
require("./src/queue/worker");

const app = require("./src/app");

const sequelize = require("./src/config/db");

const PORT = process.env.PORT;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("DB terhubung");
        
        await sequelize.sync();
        console.log("Table synced");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error.message);
    }
}

startServer();