import Sequelize from 'sequelize'
import { PlaceModel } from './models/place'
import { LunchModel } from './models/lunch'
import  { VoteModel } from './models/vote'
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

export const Place = PlaceModel(sequelize, Sequelize)

export const Lunch = LunchModel(sequelize, Sequelize)

Place.hasMany(Lunch)
Lunch.Place = Lunch.belongsTo(Place)

export const Vote = VoteModel(sequelize, Sequelize)

let VotePlace = sequelize.define('vote_place', {});

Vote.belongsToMany(Place, { through: VotePlace });
Place.belongsToMany(Vote, { through: VotePlace });

sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`)

        const PlacesData = JSON.parse(fs.readFileSync('./.json_data/places.json', 'UTF-8'));

        PlacesData.map(place => Place
            .create({
                name: place.tags.name,
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lon),
                type: place.tags.amenity
            })
        )
    })