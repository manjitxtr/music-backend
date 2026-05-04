// Source: AWS SDK docs

const { GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { docClient } = require("../config/db");

// LOGIN (keep as is)
const loginUser = async (email, password) => {
    const result = await docClient.send(new GetCommand({
        TableName: "login",
        Key: { email }
    }));

    if (!result.Item || result.Item.password !== password) {
        return { success: false };
    }

    return {
        success: true,
        username: result.Item.username
    };
};

// REGISTER (new function)
const registerUser = async (email, username, password) => {

    // Step 1: check if user already exists
    const existing = await docClient.send(new GetCommand({
        TableName: "login",
        Key: { email }
    }));

    if (existing.Item) {
        return { success: false, message: "The email already exists" };
    }

    // Step 2: insert new user
    await docClient.send(new PutCommand({
        TableName: "login",
        Item: {
            email,
            username,
            password
        }
    }));

    return { success: true };
};

module.exports = { loginUser, registerUser };