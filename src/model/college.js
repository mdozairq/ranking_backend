import mongoose from "mongoose";

var branchSchema = mongoose.Schema({
    branch_name: String,
    branch_code: Number
}, { _id: false });

var collegeSchema = mongoose.Schema({
    college_name: {
        type: String,
        required: true
    },
    college_code: {
        type: Number,
        required: true,
        index: true
    },
    branch: [branchSchema]
});


const collegeModel = mongoose.model('college', collegeSchema);
export default collegeModel;