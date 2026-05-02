const { DescribeTableCommand } = require("@aws-sdk/client-dynamodb");
const { client } = require("./db");

const createLoginTable = require("../scripts/createLoginTable");
const seedLoginTable = require("../scripts/seedLoginTable");

const ensureTableExists = async (tableName, createFn, seedFn) => {
    try {
        await client.send(new DescribeTableCommand({ TableName: tableName }));
        console.log(`${tableName} exists`);
    } catch (err) {
        if (err.name === "ResourceNotFoundException") {
            console.log(`${tableName} not found → creating`);

            await createFn();   // create table
            await seedFn();     // seed ONLY once

        } else {
            throw err;
        }
    }
};

const initDB = async () => {
    await ensureTableExists("login", createLoginTable, seedLoginTable);
};

module.exports = initDB;