const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");
// importando o body-parser aqui ......
const bodyParser = require('body-parser');

// body-parser
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());


//Rotas GET
router.get("/admin/categories", adminAuth ,(req,res)=>{
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories:categories});
    });
});

router.get("/admin/categories/new", adminAuth , (req,res)=> {
    res.render("admin/categories/new");
})

// ROTAS POST
router.post("/categories/save", adminAuth ,(req, res) => {
    var title = req.body.title;
    if(title != undefined){

        Category.create({
            title:title,
            slug:slugify(title) // funtando as palavras
        }).then(()=>{
            res.redirect("/admin/categories");
        })

    }else{
    res.redirect("/admin/categories/new");
    }
    
});

//ROTAS DELETE

router.post("/categories/delete", adminAuth , (req,res) => {
    var id = req.body.id;
    if(id != undefined){
    if(!isNaN(id)){

    Category.destroy({
        where: {
            id: id
        }
    }).then(()=> {
        res.redirect("/admin/categories");
    })
    }else {
        res.redirect("/admin/categories");
    }
  }else {
        res.redirect("/admin/categories");
  }
})

// Editar 

router.get("/admin/categories/edit/:id", adminAuth , (req,res) => {
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){
        res.render("admin/categories/edit", {category: category})
        }else{
            res.redirect("/admin/categories");
        }   
    }).catch(erro => {
        res.redirect("/admin/categories");
    }) //procurando id
});

// Update

    router.post("/categories/update", adminAuth , (req,res) => {
        var id = req.body.id;
        var title = req.body.title;

        Category.update({title: title, slug: slugify(title)},{
            where: {
                id: id
            }
        }).then(()=> {
            res.redirect("/admin/categories");
        })
    });

module.exports = router;
