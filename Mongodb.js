const MongoClient=require('mongodb').MongoClient

const state={
    db:null
}
module.exports.connect=function(done){
    const url="mongodb://0.0.0.0:27017/"
    const dbname='React'

    MongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        console.log("database connected");
        done()
    })
}
module.exports.get=function(){
    return state.db
}