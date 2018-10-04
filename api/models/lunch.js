export const LunchModel = (sequelize, type) => {
    return sequelize.define('lunch', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: type.STRING,
        date : type.DATEONLY,
        vote: {
            type: type.INTEGER,
            defaultValue: 0
        }
    })
}