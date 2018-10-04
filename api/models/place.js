export const PlaceModel = (sequelize, type) => {
    return sequelize.define('place', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        lat: type.FLOAT,
        lng: type.FLOAT
    })
}

export const TypeModel = (sequelize, type) => {
    return sequelize.define('type', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
    })
}
