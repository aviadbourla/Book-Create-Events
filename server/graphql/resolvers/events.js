const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge')

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        }
        catch (err) {
            throw err;
        }
    },

    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not promistion")
        }
        const event = new Event({
            title: args.evnetInput.title,
            description: args.evnetInput.description,
            date: new Date(args.evnetInput.date),
            creator: req.userId
        })
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const creator = await User.findById(req.userId);
            if (!creator) {
                throw new Error("User exists already")
            }
            creator.createdEvents.push(event);
            creator.save();
            return createdEvent;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
}