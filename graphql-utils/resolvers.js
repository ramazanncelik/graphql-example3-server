const { users, events, locations, participants } = require("../data.json");
const { v4: uuidv4 } = require("uuid");

const resolvers = {
    Query: {
        users: () => users,
        events: () => events,
        event: (parent, args) => {
            const eventData = events.find((event) => event.id == args.id);
            return eventData
        },
        locations: () => locations,
        participants: () => participants,
    },
    Mutation: {
        // User ---------------------------------------
        addUser: (parent, args) => {
            const newUser = { id: uuidv4(), ...args.data }
            users.push(newUser);
            return newUser;
        },
        updateUser: (parent, { data }) => {
            const userIndex = users.findIndex((user) => user.id == data.id);
            if (userIndex === -1) { return new Error("Data not found!") };
            const newUpdatedUser = users[userIndex] = { ...users[userIndex], ...data };
            return newUpdatedUser;
        },
        deleteUser: (parent, { data }) => {
            const userIndex = users.findIndex((user) => user.id == data.id);
            if (userIndex === -1) { return new Error("Data not found!") };
            const deletedUser = users[userIndex];
            users.splice(userIndex, 1);
            return deletedUser;
        },
        deleteAllUser: () => {
            users.splice(0, users.length);
            return true;
        },


        // Event ---------------------------------------
        addEvent: (parent, args) => {
            const newEvent = { id: uuidv4(), ...args.data }
            events.push(newEvent);
            return newEvent;
        },
        updateEvent: (parent, { data }) => {
            const eventIndex = events.findIndex((event) => event.id == data.id);
            if (eventIndex === -1) { return new Error("Data not found!") };
            const newUpdatedEvent = events[eventIndex] = { ...events[eventIndex], ...data };
            return newUpdatedEvent;
        },
        deleteEvent: (parent, { data }) => {
            const eventIndex = events.findIndex((event) => event.id == data.id);
            if (eventIndex === -1) { return new Error("Data not found!") };
            const deletedEvent = events[eventIndex];
            events.splice(eventIndex, 1);
            return deletedEvent;
        },
        deleteAllEvent: () => {
            events.splice(0, events.length);
            return true;
        },


        // Location ---------------------------------------
        addLocation: (parent, args) => {
            const newLocation = { id: uuidv4(), ...args.data }
            locations.push(newLocation);
            return newLocation;
        },
        updateLocation: (parent, { data }) => {
            const locationIndex = locations.findIndex((location) => location.id == data.id);
            if (locationIndex === -1) { return new Error("Data not found!") };
            const newUpdatedLocation = locations[locationIndex] = { ...locations[locationIndex], ...data };
            return newUpdatedLocation;
        },
        deleteLocation: (parent, { data }) => {
            const locationIndex = locations.findIndex((location) => location.id == data.id);
            if (locationIndex === -1) { return new Error("Data not found!") };
            const deletedLocation = locations[locationIndex];
            locations.splice(locationIndex, 1);
            return deletedLocation;
        },
        deleteAllLocation: () => {
            locations.splice(0, locations.length);
            return true;
        },


        // Participant ---------------------------------------
        addParticipant: (parent, args) => {
            const newParticipant = { id: uuidv4(), ...args.data }
            participants.push(newParticipant);
            return newParticipant;
        },
        updateParticipant: (parent, { data }) => {
            const participantIndex = participants.findIndex((participant) => participant.id == data.id);
            if (participantIndex === -1) { return new Error("Data not found!") };
            const newUpdatedParticipant = participants[participantIndex] = { ...participants[participantIndex], ...data };
            return newUpdatedParticipant;
        },
        deleteParticipant: (parent, { data }) => {
            const participantIndex = participants.findIndex((participant) => participant.id == data.id);
            if (participantIndex === -1) { return new Error("Data not found!") };
            const deletedParticipant = participants[participantIndex];
            participants.splice(participantIndex, 1);
            return deletedParticipant;
        },
        deleteAllParticipant: () => {
            participants.splice(0, participants.length);
            return true;
        }
    },
    User: {
        events: (parent, args) => {
            return events.filter(event => event.user_id === parent.id);
        },
        participants: (parent, args) => {
            return participants.filter(participant => participant.user_id === parent.id);
        }
    },
    Event: {
        user: (parent, args) => {
            return users.find(user => user.id === parent.user_id);
        },
        location: (parent, args) => {
            return locations.find(location => location.id === parent.location_id);
        },
        participants: (parent, args) => {
            return participants.filter(participant => participant.event_id === parent.id);
        }
    },
    Participant: {
        user: (parent, args) => {
            return users.find(user => user.id === parent.user_id);
        },
        event: (parent, args) => {
            return events.find(event => event.id === parent.event_id);
        },
    }
};

module.exports = resolvers;