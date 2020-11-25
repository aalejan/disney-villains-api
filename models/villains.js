const villains = (Connection, Sequelize) => {
  return Connection.define('villains', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    movie: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },
  }, { paranoid: true })
}

module.exports = villains
