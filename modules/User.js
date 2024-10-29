const mongoose=require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type:String,
        required:true,
        default:"something",
    },
    email: {
        type:String,
        required:true,
        default:"something",
        
    },
    password: {
        type:String,
        required:true,
        default:"something",
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const User=mongoose.model('user',UserSchema);
User.createIndexes();
module.exports= User;
