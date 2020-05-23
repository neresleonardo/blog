const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Category.sync({ force: true });
//Linha que deve ser removida depois de criar o 
//a tabela se não ele vai tentar criar novamente

module.exports = Category;