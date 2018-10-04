import Sequelize from 'sequelize'
 import PlaceModel from './models/place'


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

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })