const { loginUser, registerUser } = require("../services/authService");

// LOGIN (unchanged)
const login = async (req, res) => {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    if (!result.success) {
        return res.json({ message: "email or password is invalid" });
    }

    res.json(result);
};

// REGISTER (updated)
const register = async (req, res) => {
    const { email, username, password } = req.body;

    const result = await registerUser(email, username, password);

    if (!result.success) {
        return res.json({ message: result.message });
    }

    res.json({ success: true });
};

module.exports = {
    login,
    register
};