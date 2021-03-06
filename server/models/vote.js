export default (sequelize, type) => sequelize.define('vote', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: type.STRING,
  date: type.DATE,
  end_date: type.DATE,
  url: type.STRING,
  active: type.BOOLEAN,
});
