import Sequelize from 'sequelize';
import { PlaceModel } from './models/place';
import { VoteModel } from './models/vote';
import { VoiceModel } from './models/voice';
import fs from 'fs';

const sequelize = new Sequelize('vote4lunch', 'db_user', 'fakepassword', {
    host: 'localhost',
    dialect: 'postgresql',
    poll: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// Model's initialization

export const Place = PlaceModel(sequelize, Sequelize);
export const Vote = VoteModel(sequelize, Sequelize);
export const Voice = VoiceModel(sequelize, Sequelize);

// Relationship between tables

Voice.belongsTo(Vote);
Voice.belongsTo(Place);

// M2M relationship between Vote and Place

let VotePlace = sequelize.define('vote_place', {});

Vote.belongsToMany(Place, { through: VotePlace });
Place.belongsToMany(Vote, { through: VotePlace });

// Database initialization

sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`)

        const PlacesData = JSON.parse(fs.readFileSync('./.json_data/places.json', 'UTF-8'));

        PlacesData.map(place => Place
            .findOrCreate({
                where: {
                    name: place.tags.name,
                    lat: parseFloat(place.lat),
                    lng: parseFloat(place.lon),
                    type: place.tags.amenity
                }
            })
        )
    })