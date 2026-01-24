const dao = require("../dao/userDb");

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: "Email and password required"
            });
        }
        const user = await dao.findByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({
                msg: "Invalid email or password"
            });
        }
        return res.status(200).json({
            msg: "login successful",
            user: { id: user.id, name: user.name, email: user.email }
        });
    },

    register: async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                msg: "Name, email and password required"
            });
        }
        const existingUser = await dao.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                msg: "User already exists"
            });
        }
        const newUser = await dao.createUser({ name, email, password });
        return res.status(201).json({
            msg: "user registered successfully",
            user: { id: newUser.id }
        });
    }
};

module.exports = authController;
