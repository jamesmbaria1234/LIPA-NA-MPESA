import express from "express";
import {config} from 'dotenv';
import cors from "cors";
import acessToken from './Routes/Token.route.js'
import callback from './Routes/CallBack.js'
config();

const app = express()


app.get("/", (request, response) => {
  response.send('server is running nicely')
});


app.use(cors({ origin: ["http://localhost:5173","https://lipa-na-mpesa.vercel.app/" ],credentials:true,}));

app.use (express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", acessToken)
app.use("/api",callback)
app.listen(process.env.PORT,()=>{
    console.log(`app running on port ${process.env.PORT}`);
    

    
})