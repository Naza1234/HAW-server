const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const {UserEmail} = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ UserEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new UserModel(req.body);
        await newUser.save();

        res.status(201).json(newUser._id);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { UserEmail, UserPassword } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ UserEmail });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(UserPassword, user.UserPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json(user._id);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.ChangeUserPasswordByOldPassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { OldPassword, NewPassword } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the old password is correct
        const isPasswordValid = await bcrypt.compare(OldPassword, user.UserPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid old password' });
        }

        // Update the password with the new one
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(NewPassword, salt);

        user.UserPassword = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
