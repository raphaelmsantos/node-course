import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        // check if the user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({
            message: "User registered successfully!",
            user: {id: user._id, email: user.email, username: user.username}
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", 
            error: error.message
        })
    }
};

const loginUser = async (req, res) => {
    try {
        // validate fields
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) return res.status(400).json({
            message: "User or password is wrong!"
        });

        // Checking the password
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) return res.status(400).json({
            message: "User or password is wrong!"
        });

        res.status(200).json({
            message: "Logged in!",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "An error happend!"
        })
    }
};


const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }

        res.status(200).json({
            message: "Logout successful"
        })
    } catch (error) {
        res.status(500).json("Internal server error.");
    }
    
}

export {
    registerUser,
    loginUser,
    logoutUser
}
