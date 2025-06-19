import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    city : {
        type : String,
        require : true,
        trim : true
    },
    
    state : {
        type : String,
        require : true,
    },

    country : {
        type : String,
        require : true
    },

    pinCode : {
        type : String,
        require : true
    },
},{
    timestamps : true,
    collection : "city"
});

export const cityModel = mongoose.model("city",citySchema);