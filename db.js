const mongoose=require('mongoose');
const mongURI="mongodb://localhost:27017/inotebook"

const connectToMongo=async ()=> {
    try {
        await mongoose.connect(mongURI);
        console.log("Connection successfull");
    }
    catch(err) {
        console.error ("The error encounterd is : ",err.message);
    }
}
module.exports= connectToMongo;