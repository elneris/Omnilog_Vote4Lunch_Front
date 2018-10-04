const place = (sequelize, type) => {
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

export default place;