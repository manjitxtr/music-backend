// Source: AWS SDK docs

const { CreateTableCommand, DescribeTableCommand } = require("@aws-sdk/client-dynamodb");
const { client } = require("../config/db");

const waitForTableActive = async (tableName) => {
    let status = "CREATING";

    while (status !== "ACTIVE") {
        const data = await client.send(new DescribeTableCommand({ TableName: tableName }));
        status = data.Table.TableStatus;

        console.log(`Waiting... current status: ${status}`);

        if (status !== "ACTIVE") {
            await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3 sec
        }
    }

    console.log(`${tableName} is ACTIVE`);
};

const createLoginTable = async () => {
    const params = {
        TableName: "login",
        KeySchema: [
            { AttributeName: "email", KeyType: "HASH" }
        ],
        AttributeDefinitions: [
            { AttributeName: "email", AttributeType: "S" }
        ],
        BillingMode: "PAY_PER_REQUEST"
    };

    await client.send(new CreateTableCommand(params));
    console.log("Login table creation started");

    //WAIT HERE
    await waitForTableActive("login");
};

module.exports = createLoginTable;