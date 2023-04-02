const mongoose = require("mongoose");

const url = "mongodb://parasharharshit:K0q2Ry79nNdP6V0L@ac-kby0hwz-shard-00-00.yfadar2.mongodb.net:27017,ac-kby0hwz-shard-00-01.yfadar2.mongodb.net:27017,ac-kby0hwz-shard-00-02.yfadar2.mongodb.net:27017/user?ssl=true&replicaSet=atlas-hgl7tu-shard-0&authSource=admin&retryWrites=true&w=majority"

const mongooDB = async()=>{
    await mongoose.connect(url,{useNewURLParser:true}).then(()=>{
        console.log("database connected")
    }).catch((err=>{
        console.log(err)
    }))

    const dbc = mongoose.connection;

    const getone = async () => {
      const dataMern = await dbc.collection("users").find({}).toArray();
      global_empData = dataMern;
    };
  

    const gettime = async () => {
        const time = await dbc.collection("times").find({}).toArray();
        global_empTime = time;
      };
    getone();
    gettime();
}

module.exports = mongooDB;