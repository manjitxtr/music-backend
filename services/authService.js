const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const docClient = require("../config/db");

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

module.exports = { loginUser };