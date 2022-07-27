const db=require('../services/db');
const config=require('../services/config');
const helper=require('../services/helper');
exports.listAll=async (req,res)=>{
    const offset = helper.getOffset(1, config.listPerPage);
    const rows = await db.query(
    `SELECT id,name from publisher LIMIT ${offset},${config.listPerPage}`
    );
  const response=helper.emptyOrRows(rows);
  res.json(response);
}