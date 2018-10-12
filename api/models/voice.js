export const VoiceModel = (sequelize, type) => {
    return sequelize.define('voice', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        pseudo: {
            type: type.STRING,
        },
        email: {
            type: type.STRING,
        },
    })
}