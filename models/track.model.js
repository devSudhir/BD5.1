let { sequelize, Datatypes } = require('../lib');

let movieModel = sequelize.define('movies', {
  id: {
    type: Datatypes.INTEGER,
    primaryKey: true,
  },
  title: Datatypes.TEXT,
  director: Datatypes.TEXT,
  genre: Datatypes.TEXT,
  release_year: Datatypes.INTEGER,
  rating: Datatypes.FLOAT,
  actor: Datatypes.TEXT,
  box_office_collection: Datatypes.INTEGER,
});

module.exports = { movieModel };
