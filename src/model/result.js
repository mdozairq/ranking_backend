import mongoose from "mongoose";

const GPA = ({
    sgpa1: Number,
    sgpa2: Number,
    sgpa3: Number,
    sgpa4: Number,
    sgpa5: Number,
    sgpa6: Number,
})

const resultSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    father_name: {
        type: String,
        required: true
    },
    mother_name: {
        type: String,
        required: true
    },
    reg_no: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    branch_code:{
        type: Number,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    college_code:{
        type: Number,
        required: true
    },
    gpa: {
        type: GPA,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
})

const resultModel = mongoose.model('results', resultSchema);
export default resultModel;