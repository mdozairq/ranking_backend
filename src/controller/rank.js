import mongoose from "mongoose";
import resultModel from "../model/result.js";


export const getRank = async (req, res) => {
    try {
        const allResult = await resultModel.find();
        res.status(200).json(allResult);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
        console.log(err)
    }

}

export const getRankById = async (req, res) => {
    let student, rank;
    const { reg_no } = req.params;
    const { college, branch } = req.query
    if (reg_no.length !== 11) {
        return res.status(400).json({ message: "Please Send valid Registration No." })
    }
    try {
        student = await resultModel.findOne({ reg_no: reg_no });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
    console.log(student);
    if (!student) {
        return res.status(400).send({ message: "Student not found for given registration no." })
    }


    if (student && college !== undefined && branch === undefined) {
        console.log("here1");
        if (student && student.college_code !== parseInt(college)) {
            return res.status(400).json({ message: "Student in not of given college or branch" })
        }

        let allStudent = await resultModel.find({ college_code: college, _id: { $ne: student._id } });


        const sortedResults = allStudent.sort((a, b) => b.cgpa - a.cgpa);

        // Find the rank of the target student
        let rank = 1;
        let currentCgpa = sortedResults[0].cgpa;
        for (const astudent of sortedResults) {
            if (astudent.cgpa < currentCgpa) {
                rank++;
                currentCgpa = astudent.cgpa;
            }
            if (astudent.cgpa <= student.cgpa) {
                break;
            }
        }
        
        console.log(`The rank of the student with ID ${student.name} is ${rank}.`);
        let response = {
            name: student.name,
            reg_no: student.reg_no,
            college: student.college,
            branch: student.branch,
            cgpa: student.cgpa,
            college_rank: rank
        }
        return res.status(200).json(response)
    }

    if (student && college !== undefined && branch !== undefined) {
        if (student && (student.college_code === parseInt(college) && student.branch_code !== parseInt(branch)) ||
            (student.college_code !== parseInt(college) && student.branch_code === parseInt(branch)) ||
            (student.college_code !== parseInt(college) && student.branch_code !== parseInt(branch))
        ) {
            console.log("err");
            return res.status(400).json({ message: "Student in not of given college or branch" })
        }

        let allStudent = await resultModel.find({ college_code: college, branch_code: branch, _id: { $ne: student._id } });


        const sortedResults = allStudent.sort((a, b) => b.cgpa - a.cgpa);

        // Find the rank of the target student
        let rank = 1;
        let currentCgpa = sortedResults[0].cgpa;
        for (const astudent of sortedResults) {
            if (astudent.cgpa < currentCgpa) {
                rank++;
                currentCgpa = astudent.cgpa;
            }
            if (astudent.cgpa <= student.cgpa) {
                break;
            }
        }


        console.log(`The rank of the student with ID ${student.name} is ${rank}.`);
        let response = {
            name: student.name,
            reg_no: student.reg_no,
            college: student.college,
            branch: student.branch,
            cgpa: student.cgpa,
            branch_rank: rank
        }
        return res.status(200).json(response);
    }

}

