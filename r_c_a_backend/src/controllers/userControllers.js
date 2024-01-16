import User from '../models/user.js';
import generateToken from '../utils/generateToken.js'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Please fill all fields' });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'This email already exists. Please use another email' });
            return;
        }

        const user = await new User({
            name,
            email,
            password
        });
        await user.save();

        if (user) {

            const token = generateToken(user._id);
            if (!token) {
                res.status(400).json({ error: 'Error while creating User' });
                return;
            };

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ error: 'Failed to create User' });
        }
    } catch (error) {
        res.status(500).json({ error: `Server Error: ${error.message}` });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Please fill all fields' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: 'User doesn\'t exist' });
            return;
        }
        if (await user.matchPassword(password)) {
            const token = generateToken(user._id);
            if (!token) {
                res.status(400).json({ error: 'Error while creating User' });
            }
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: token
            })
        }

    } catch (error) {
        res.status(500).json({ error: `Server Error: ${error.message}` });
    }
}

export const getAllUsers = async (req, res) => {
    const keyword = req.query.search ?
        {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ],
        } : {}
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
}