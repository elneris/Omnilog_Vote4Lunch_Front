import fs from 'fs';
import Sequelize from 'sequelize';

import { PlaceModel } from './models/place';
import { VoteModel } from './models/vote';
import { VoiceModel } from './models/voice';

require('dotenv').config();

const development = process.env.ENV;

let config;

// add SSL support for production
if (development !== 'production') {
  config = {
    host: process.env.DB_HOST,
    dialect: 'postgresql',
    poll: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
} else {
  config = {
    host: process.env.DB_HOST,
    dialect: 'postgresql',
    poll: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: true
    }
  };
}

const sequelize = new Sequelize(process.env.POSTGRES_DB_URL, config);

// Model's initialization
export const Place = PlaceModel(sequelize, Sequelize);
export const Vote = VoteModel(sequelize, Sequelize);
export const Voice = VoiceModel(sequelize, Sequelize);

// Relationship between tables
Voice.belongsTo(Vote);
Voice.belongsTo(Place);

// M2M relationship between Vote and Place
const VotePlace = sequelize.define('vote_place', {});

Vote.belongsToMany(Place, { through: VotePlace });
Place.belongsToMany(Vote, { through: VotePlace });

// Database initialization
if (development !== 'production') {
  sequelize.sync({ force: true })
    .then(() => {
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
      );
    });
} else {
  sequelize.sync({ force: false })
    .then(() => {
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
      );
    });
}
