export const PlaceModel = (sequelize, type) => {
    return sequelize.define('place', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        lat: {
            type: type.FLOAT,
            allowNull: false
        },
        lng: {
            type: type.FLOAT,
            allowNull: false
        },
        type: {
            type: type.STRING,
            allowNull: false
        },
    })
}