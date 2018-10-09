export const VoiceModel = (sequelize, type) => {
    return sequelize.define('voice', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
    })
}