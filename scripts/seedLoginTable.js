// Source: AWS SDK docs (PutCommand)

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "ap-southeast-2" });
const docClient = DynamoDBDocumentClient.from(client);

const users = [
    { email: "user1@gmail.com", username: "user1", password: "pass1" },
    { email: "user2@gmail.com", username: "user2", password: "pass2" },
    { email: "user3@gmail.com", username: "user3", password: "pass3" },
    { email: "user4@gmail.com", username: "user4", password: "pass4" },
    { email: "user5@gmail.com", username: "user5", password: "pass5" },
    { email: "user6@gmail.com", username: "user6", password: "pass6" },
    { email: "user7@gmail.com", username: "user7", password: "pass7" },
    { email: "user8@gmail.com", username: "user8", password: "pass8" },
    { email: "user9@gmail.com", username: "user9", password: "pass9" },
    { email: "user10@gmail.com", username: "user10", password: "pass10" }
];

const seedData = async () => {
    for (const user of users) {
        await docClient.send(new PutCommand({
            TableName: "login",
            Item: user
        }));
    }
    console.log("Users inserted");
};

seedData();