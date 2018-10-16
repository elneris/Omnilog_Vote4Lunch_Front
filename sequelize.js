require('dotenv').config()

import Sequelize from 'sequelize';

import { PlaceModel } from './models/place';
import { VoteModel } from './models/vote';
import { VoiceModel } from './models/voice';

import fs from 'fs';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
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

sequelize.sync({ force: process.env.DEBUG })
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