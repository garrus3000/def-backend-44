require('dotenv').config();
const mongoose = require('mongoose');
const { logger, loggerError } = require('../logs/winston');

const config = {
    mongoDb: {
        url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.0fgn7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
}

const ConnectToMongoDB = () => {
    try {
        mongoose.connect(config.mongoDb.url, config.mongoDb.options);
        logger.log("info", "Connected to MongoDB");
    } catch (error) {
        loggerError.log("error", error.message);
    }
};

module.exports = {config, ConnectToMongoDB};