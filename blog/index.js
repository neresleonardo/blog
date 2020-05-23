const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

//Sessiom

app.use(session({
    secret: "qualquercoisa", 
    cookie: { maxAge: 300000000} //tempo de session
}))

// Rotas Controller

const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");
const usersController = require("./users/usersController");

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

//Modell

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const Users = require("./users/Users");

//Static ( Pasta Public )

app.use(Express.static("public"));

// Views

app.set('view engine','ejs');

// Body Parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Connection

connection
.authenticate()
.then(()=>{
    console.log("Connection com Sucesso");
})
.catch((error) =>{
    console.log(error);
})

//Rotas principal 

app.get("/",(req,res)=> {

    Article.findAll({
        order: [
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", { articles: articles , categories: categories });
        })

        
    });
})

app.get("/:slug", (req,res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug:slug
        }
    }).then(article => {
        if(article != undefined ){
            res.render("article", {article: article});
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
})

app.get("/categorie/:slug", (req,res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if(category !=undefined){

    Category.findAll().then(categories => {
        res.render("index", {articles: category.articles, categories: categories  })
    });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/")
    })

})

//Servidor
app.listen(4444);