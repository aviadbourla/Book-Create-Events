
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../../emails/acoount');

module.exports = {
    creatUser: async args => {
        try {
            const user = await User.findOne({ email: args.userInput.email })
            if (user) {
                throw new Error("User exists already")
            }
            else {
                const hasedPassword = await bcrypt.hash(args.userInput.password, 12);
                const user = new User({
                    email: args.userInput.email,
                    password: hasedPassword,
                    fullName: args.userInput.fullName
                });
                const result = await user.save();
                sendWelcomeEmail(args.userInput.email);
                return result;
            }
        }
        catch (err) {
            throw err;
        }

    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User does not Exist")
        }
        const IsEqual = await bcrypt.compare(password, user.password);
        if (!IsEqual) {
            throw new Error("Wrong Password")
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, `${process.env.JWT_KEY}`, { expiresIn: '1h' })
        return { userId: user.id, token: token, toeknExpiration: 1 }
    }
};

