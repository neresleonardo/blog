const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define("articles", {

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
          type: Sequelize.STRING,
          allowNull:false
      },
      body: {
          type: Sequelize.TEXT,
          allowNull: false
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
     

    
});
// Relacionamento 
Article.belongsTo(Category);
Category.hasMany(Article);

//Article.sync({force: true});
//Linha que deve ser removida depois de criar o 
//a tabela se não ele vai tentar criar novamente

module.exports = Article;