//Operations on database y
const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./model/connection')
const app = express()

//Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/home",(req,res) =>{
    res.render('user')
})


app.post("/user",(req,res) =>{
    let user = {name:req.body.name,email:req.body.email,phone:req.body.mobile,city:req.body.city}
    let sql = "INSERT INTO `users`  SET ?"
    db.query(sql,user,(err,result) =>{
        if(err) throw err
        res.redirect('/')
    })
})

app.get("/",(req,res) =>{
    let sql = "SELECT * FROM `users`"
    db.query(sql,(err,result)=>{
        if(err) throw err
        console.log(result)
        res.render('showUser',{list:result})
    })
})

app.get("/del/:id",(req,res) =>{
    let id = +req.params.id
    let sql = "DELETE FROM `users` WHERE id = "+id;
    db.query(sql,(err,result) =>{
        if(err) throw err
        res.redirect('/')
    })
})

app.get('/upd/:id',(req,res) =>{
    let id = +req.params.id
    let sql = "SELECT * FROM `users` WHERE id = "+id;
    db.query(sql,(err,result) =>{
        if(err) throw err
        res.render('updUser',{user:result[0]})
    })
})

app.post("/updUser",(req,res) =>{
    let sql = `UPDATE users SET name='${req.body.name}',phone='${req.body.mobile}',city='${req.body.city}' WHERE  email = '${req.body.email}'`
    db.query(sql,(err,result) =>{
        if(err) throw err
        res.redirect("/")
    })

})



const PORT = 3000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))
