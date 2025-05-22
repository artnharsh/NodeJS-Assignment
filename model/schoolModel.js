const db = require("../config/db");

async function insertSchool(name, address, latitude, longtitude){
    return db.execute(
        "INSERT INTO schools(name, address, latitude, longtitude) VALUES (?, ?, ?, ?)",
        [name, address, latitude, longtitude]
    );
};

async function getAllSchools(){
    return db.execute(
        "select* from schools",
    );
};

module.exports = {
    insertSchool,
    getAllSchools
};