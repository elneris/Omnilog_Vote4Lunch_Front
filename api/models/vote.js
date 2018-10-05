export const VoteModel = (sequelize, type) => {
    return sequelize.define('vote', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        pseudo: type.STRING,
        email: type.STRING,
        date: type.DATE
    })
}