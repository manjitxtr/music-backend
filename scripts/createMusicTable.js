// Source: AWS SDK docs

const {
  CreateTableCommand,
  DescribeTableCommand
} = require("@aws-sdk/client-dynamodb");

const { client } = require("../config/db");

// wait until table is ACTIVE
const waitForTableActive = async (tableName) => {
  let status = "CREATING";

  while (status !== "ACTIVE") {
    const data = await client.send(new DescribeTableCommand({ TableName: tableName }));
    status = data.Table.TableStatus;

    console.log(`Waiting... ${status}`);

    if (status !== "ACTIVE") {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log(`${tableName} is ACTIVE`);
};

const createMusicTable = async () => {
  const params = {
    TableName: "music",

    KeySchema: [
      { AttributeName: "artist", KeyType: "HASH" },        // PK
      { AttributeName: "title_year", KeyType: "RANGE" }    // SK
    ],

    AttributeDefinitions: [
      { AttributeName: "artist", AttributeType: "S" },
      { AttributeName: "title_year", AttributeType: "S" },
      { AttributeName: "year", AttributeType: "N" },
      { AttributeName: "album", AttributeType: "S" }
    ],

    // LSI (same PK, different SK)
    LocalSecondaryIndexes: [
      {
        IndexName: "year-index",
        KeySchema: [
          { AttributeName: "artist", KeyType: "HASH" },
          { AttributeName: "year", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        }
      }
    ],

    // GSI (different PK)
    GlobalSecondaryIndexes: [
      {
        IndexName: "album-index",
        KeySchema: [
          { AttributeName: "album", KeyType: "HASH" },
          { AttributeName: "title_year", KeyType: "RANGE" }
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        BillingMode: "PAY_PER_REQUEST"
      }
    ],

    BillingMode: "PAY_PER_REQUEST"
  };

  await client.send(new CreateTableCommand(params));
  console.log("Music table creation started");

  await waitForTableActive("music");
};

module.exports = createMusicTable;