const { loginUser } = require("../services/authService");

const login = async (req, res) => {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    if (!result.success) {
        return res.json({ message: "email or password is invalid" });
    }

    res.json(result);
};

const register = async (req, res) => {
    res.json({ message: "Register route working" });
};

module.exports = {
    login,
    register
};

