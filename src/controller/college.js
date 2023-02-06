import collegeModel from "../model/college.js";


export const getAllCollege = async (req, res) => {
    try {
        const allResult = await collegeModel.find();
        res.status(200).json(allResult);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }

}