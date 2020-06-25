const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Booking {
    _id: ID,
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String! 
}
type Event{
    _id: ID,
    title: String!
    description: String!
    price: Float!
    date: String! 
    creator: User! 
    usersBookings: [User]
 }
type User {
    _id: ID!
    email: String!
    password: String!
    fullName: String!
    createdEvents: [Event!]
}
type AuthData {
    userId: ID!
    token: String!
    toeknExpiration: Int!
}
input EvnetInput {
    title: String!
    description: String!
    price: Float!
    date: String! 
}
input UserInput{
    email: String!
    password: String!
    fullName: String!
}
type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    Allbookings: [Booking!]!
    bookingsByEvent: [Booking!]
    login(email: String!, password: String!): AuthData!
}
type RootMutation{
    createEvent(evnetInput: EvnetInput) : Event
    creatUser(userInput : UserInput) : User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}
schema {
     query: RootQuery
     mutation: RootMutation
}
`)

// bookedUsers: [User]
