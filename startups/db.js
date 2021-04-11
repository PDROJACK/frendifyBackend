const mongoose = require('mongoose');

const uri = "mongodb+srv://pdrojack:maybe123@cluster0.gp1zn.mongodb.net/frendify"

module.exports = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }).then(()=>{
        console.log('connected successfully...')
    }).catch(err=>{
        console.log(err);
    })
}
