const { DescribeTableCommand } = require("@aws-sdk/client-dynamodb");
const { client } = require("./db");

const createLoginTable = require("../scripts/createLoginTable");

const ensureTableExists = async (tableName, createFn) => {
    try {
        await client.send(new DescribeTableCommand({ TableName: tableName }));
        console.log(`${tableName} exists`);
    } catch (err) {
        if (err.name === "ResourceNotFoundException") {
            console.log(`${tableName} not found → creating`);
            await createFn();
        } else {
            throw err;
        }
    }
};

const initDB = async () => {
    await ensureTableExists("login", createLoginTable);
};

module.exports = initDB;