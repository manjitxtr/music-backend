// Source: AWS SDK docs

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
    region: "ap-southeast-2"
});

const docClient = DynamoDBDocumentClient.from(client);

module.exports = {
    client,      // for CreateTable, DescribeTable
    docClient    // for Put, Get, Query
};