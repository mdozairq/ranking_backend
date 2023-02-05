import { getData } from "./api.js";
import express from "express";
// import bodyParser from "body-parser";
import mongoose from 'mongoose';
import resultModel from "./model/result.js";

const app = express();
const CONNECTION_URL = "mongodb://localhost:27017/aku_results"

try {
    mongoose.connect(CONNECTION_URL);
    mongoose.set('strictQuery', true);
} catch (error) {
    console.log(error)
}




export const start = async () => {
    let branches = [101, 102, 105, 110]
    let count = 0;
    let allData = [];
    let results;

    try {
        branches.forEach(async branch => {
            count = 0;
            for (var i = 1; i < 70; i++) {
                console.log("count", count)
                if (count > 3) {
                    break;
                }
                let reg = i<10?`20${branch}11090${i}`:`20${branch}1109${i}`
                // let reg = i < 10 ? `19${branch}11000${i}` : `19${branch}1100${i}`
                // console.log(reg);
                const res = await getData(reg);
                if (res.Item) {
                    console.log(res.Item);
                    count = 0;
                    let responseStructure = {
                        name: res.Item.Name.S,
                        father_name: res.Item['F Name'].S,
                        mother_name: res.Item['M Name'].S,
                        reg_no: res.Item['Reg No'].N,
                        branch: res.Item.Branch.S,
                        college: res.Item.College.S,
                        college_code: 110,
                        branch_code: branch,
                        gpa: {
                            sgpa1: parseFloat(res.Item.SGPA1.S),
                            sgpa2: parseFloat(res.Item.SGPA2.S),
                            sgpa3: parseFloat(res.Item.SGPA3.S),
                            sgpa4: parseFloat(res.Item.SGPA4.S),
                            sgpa5: parseFloat(res.Item.SGPA5.S),
                            sgpa6: parseFloat(res.Item.SGPA6.S),
                        },
                        cgpa: parseFloat(res.Item.CGPA.S),
                        rank: parseFloat(res.Item.Rank.S)
                    }
                    // console.log("res", responseStructure);
                    results = await resultModel.create(responseStructure);
                    allData.push(responseStructure);
                }
                else
                    count++
            }

        })
        // return Promise.all(results);
    } catch (error) {
        console.log(error);
    }

    console.log(allData);
}

start();