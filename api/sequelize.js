import Sequelize from 'sequelize'
import { PlaceModel, TypeModel } from './models/place'
import { LunchModel } from './models/lunch'

const sequelize = new Sequelize('vote4lunch','db_user','fakepassword', {
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
export const Type = TypeModel(sequelize, Sequelize)

// Type.hasMany(Place)
Place.Type = Place.belongsTo(Type)

export const Lunch = LunchModel(sequelize, Sequelize)

// Place.hasMany(Lunch)
Lunch.Place = Lunch.belongsTo(Place)

sequelize.sync({force: true})
  .then(() => {
    console.log(`Database & tables created!`)
  })