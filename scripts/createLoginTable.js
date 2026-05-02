// Source: Adapted from AWS SDK v3 documentation

const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");
require("dotenv").config();


const client = new DynamoDBClient({
    region: process.env.AWS_REGION
});

const createTable = async () => {
    const params = {
        TableName: "login",

        KeySchema: [
            { AttributeName: "email", KeyType: "HASH" } // Partition key
        ],

        AttributeDefinitions: [
            { AttributeName: "email", AttributeType: "S" }
        ],

        BillingMode: "PAY_PER_REQUEST"
    };

    try {
        const data = await client.send(new CreateTableCommand(params));
        console.log("Login table created:", data);
    } catch (err) {
        console.error("Error creating table:", err);
    }
};

createTable();