const mongoose = require('mongoose');
import app from "./app"
import config from "./app/config";

const port = 5000;


async function main() {
    try {
        await mongoose.connect(config.db_url as string);
        app.listen(config.port, () => {
            console.log(`eCommerce backend listening on port ${config.port}`)
        })
    } catch (error) {
        console.log("Error from main:", error);
    }
}




