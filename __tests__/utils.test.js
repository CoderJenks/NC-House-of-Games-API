const request = require("supertest");
const app = require("../app.js");

const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const { checkExists } = require("../utils/utils.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("checkExists",()=>{
    test("resolves if value exists in specified table and column", async () => {
        tableName = "reviews";
        columnName = "category";
        value = "dexterity";
        await checkExists(tableName,columnName,value);
    })
})