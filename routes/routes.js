
const express = require('express')
const axios = require('axios')
const User = require("../entities/user")
const app = express()
const validator = require("email-validator")
var bcrypt = require('bcrypt')
app.use(express.json())
var salt =10;

//*********SIGNUP*********
app.post("/signup",(req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password =req.body.password
    const phone = req.body.phone

    if (validator.validate(email)){

        User.find({}).then((DBitem)=>{
            const db = DBitem.find(user =>user.email == email)
            console.log("dbb",db)
            bcrypt.genSalt(salt,function(err,salt){
                bcrypt.hash(password,salt,function(err,hash){
                    if ( !db){
                        var user = new User({
                            username : req.body.username,
                            email:req.body.email,
                            password:hash,
                            phone:phone
                        })
                        user.save();
                        return res.status(200).json({message:"valid"})
                    }
                    return res.status(403).json({message:"used email"})
                })
            })

        })
       
    }
    else
    return res.status(405).json({message:"noovalid"})
})
//*********SIGNIN********
app.post("/signin",(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    User.find({}).then((DBitem)=>{
        const db = DBitem.find(user =>user.email == email)

        if (db){
            bcrypt.compare(password,db.password,function(err,result){
                if ( result ==true){
                    return res.status(200).json(db);
                }
                else
                return res.status(405).json({message:false})
            })
        }
        else
        return res.status(404).json({message:false})
    })

})
app.get("/newsProvider",async(req,res)=>{
    const url = 'https://newsdata.io/api/1/news?apikey=pub_107409dcb1703223557997e3fc8b2f8e70e9c&q=crypto&language=en,fr '
    
   await axios
      .get(url ,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({data}) => {
        //console.log(data);
        return res.json(data['results'])
    });
})
app.get("/classment",async(req,res)=>{
    const url = 'https://query2.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=true&scrIds=all_cryptocurrencies_us&start=0&count=20'
    
   await axios
      .get(url ,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({data}) => {
        //console.log(data);
        return res.json(data['finance']['result'][0]['quotes'])
    });
})
app.get("/classmentdata",async(req,res)=>{
    const url = 'https://query2.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=true&scrIds=all_cryptocurrencies_us&start=0&count=15'
    
   await axios
      .get(url ,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({data}) => {
        //console.log(data);
        return res.json(data['finance']['result'][0]['quotes'])
    });
})
app.get("/exchanges",async(req,res)=>{
    const url = 'https://api.coingecko.com/api/v3/exchanges'
    
   await axios
      .get(url ,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({data}) => {
        //console.log(data);
        return res.json(data)
    });
})
module.exports = app