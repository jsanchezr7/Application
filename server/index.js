import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import request from "superagent"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/login", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    gituser: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

app.get('/user/signin/callback',(req, res) => {
    const { query } = req;
    const { code } = query;

    console.log(code);

    request
    .post('https://github.com/login/oauth/access_token')
    .send({ client_id:'22d94d324bf35bb94d9b', client_secret:'518df9209586417dc70e4bf46794837bfdcbe06f', code:code})
    .set('Accept', 'application/json')
    .then(function(result) {
        const data = result.body;
        const accessToken = data.access_token;
        request
        .get('https://api.github.com/user')
        .set('Authorization', 'token ' + accessToken)
        .set('User-Agent', 'app')
        .then(function(result){
            res.redirect(`http://localhost:3000/user/${result.body.login}`);
            // res.send(result.body.login);
        })
    })
})


app.post("/login", (req, res)=>{
    const {name, gituser, password} = req.body
    User.findOne({gituser:gituser}, (err,user)=>{
        console.log(user)
        if(user){
            if(password === user.password){
                res.send({message:"Welcome", user:user, type:1})
            }else{
                res.send({message:"Incorrect password", type:0})
            }
        } else {
            res.send({message:"Could not find user", type:0})
        }
    })
})

app.post("/register", (req, res)=>{
    const { name, gituser, password } = req.body
    User.findOne({gituser: gituser}, (err, user) =>{
        if(user){
            // console.log("Usuario ya existe")
            res.send({message:"The user already exists", type:0})
        }else{
            const user = new User({
                name,
                gituser,
                password
            })
            user.save( err => {
                if(err) {
                    // console.log(err)
                    res.send(err)
                }else{
                    // console.log("Guardado")
                    res.send({message:"User registered, please login", type:1})
                }
            })
        }
    })
})

app.listen(9000,()=>{
    console.log("Port 9000")
})