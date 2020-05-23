const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {

      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
          type: Sequelize.STRING,
          allowNull:false
      }
});

//User.sync({force: false});
//Linha que deve ser removida depois de criar o 
//a tabela se não ele vai tentar criar novamente

module.exports = User;