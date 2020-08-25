const Event = require('../../models/event');
const Boogkin = require('../../models/booking');

const { transformBooking, transformEvent } = require('./merge')


module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not promistion")
        }
        try {
            const bookings = await Boogkin.find({ user: req.userId });
            return bookings.map(booking => {
                return transformBooking(booking);
            })
        } catch (err) {
            throw new err;
        }
    },
    Allbookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not promistion")
        }
        try {
            const bookings = await Boogkin.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            })
        } catch (err) {
            throw new err;
        }
    },
    bookingsByEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not promistion")
        }
        try {
            const bookings = await Boogkin.find({ user: req.userId });
            const fetchedEvent = await Event.findOne({ _id: args.eventId });
            const booking = new Boogkin({
                user: req.userId,
                event: fetchedEvent
            })
            const result = await booking.save();
            const newLocal = transformBooking(result);

            return newLocal;
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not promistion")
        }
        try {
            const fetchedEvent = await Event.findOne({ _id: args.eventId });
            const CreatorId = (fetchedEvent._doc.creator._id).toString();
            const findIfBooked = await Boogkin.findOne({ user: req.userId, event: args.eventId })
            if (findIfBooked === null && CreatorId !== req.userId) {
                const booking = new Boogkin({
                    user: req.userId,
                    event: fetchedEvent
                })
                //fetchedEvent.usersBookings.push(booking)
                const result = await booking.save();
                const newLocal = transformBooking(result);
                return newLocal;
            } else {
                throw new Error("Alredy booked/admin booked to his own events")
            }
        } catch (err) {
            throw err;
        }
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not promistion")
        }
        try {
            const booking = await Boogkin.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Boogkin.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }
    },
}