import resultModel from "../model/result.js";


export const getTopperList = async (req, res) => {
    let topperList, studentList=[];
    const { college, branch } = req.query
    if (college !== undefined && branch === undefined) {
        try {
            topperList = await resultModel.find({ college_code: college }).sort({ cgpa: -1 }).limit(10).exec();
        } catch (error) {
            console.log(err)
            return res.status(500).json({ message: "Internal Server Error" })
        }

        for (var i=0; i<topperList.length; i++) {
            let responseStructure = {
                rank: i+1,
                name: topperList[i].name,
                reg_no: topperList[i].reg_no,
                college: topperList[i].college,
                branch: topperList[i].branch,
                cgpa: topperList[i].cgpa,
            }
            studentList.push(responseStructure);
        }
    }
    else if (college !== undefined && branch !== undefined) {
        try {
            topperList = await resultModel.find({ college_code: college, branch_code: branch }).sort({ cgpa: -1 }).limit(10).exec();
        } catch (error) {
            console.log(err)
            return res.status(500).json({ message: "Internal Server Error" })
        }

        for (var i=0; i<topperList.length; i++) {
            let responseStructure = {
                rank: i+1,
                name: topperList[i].name,
                reg_no: topperList[i].reg_no,
                college: topperList[i].college,
                branch: topperList[i].branch,
                cgpa: topperList[i].cgpa,
            }
            studentList.push(responseStructure);
        }
    }
    else{
        return res.status(400).json({ message: "Bad Request" })
    }
    return res.status(200).json(studentList);

}

