const db=require('../services/db');
const config=require('../services/config');
const helper=require('../services/helper');

exports.addNew=async (req,res)=>{
    const queryStr=`insert into app (app_link,app_name,legacyZhash,updatedZhash) values ('${req.body.app_link}','${req.body.app_name}','${req.body.zhash}','${req.body.zhash}')`;
    console.log(queryStr);
    try{
        const resp=await db.query(queryStr);
        res.status(200).json({test:queryStr,resp:resp,updated:((resp.affectedRows>0&&resp.changedRows>0)?(true):(false))});
    }
    catch(err){
        console.log("Error add app: "+err);
        res.json({"error":err})
    }
}
exports.listAll=async (req,res)=>{
    const offset = helper.getOffset(1, config.listPerPage);
    let queryStr=`SELECT * from app`;
    if(req.query!=null){
        queryStr+=" where ";
        for(let key in req.query){
            queryStr+=`${key}="${req.query[key]}"`;
        }
    }
    try{
        const rows = await db.query(queryStr);
        console.log("in app add path");
        const response=helper.emptyOrRows(rows);
        console.log(response);
        res.json(response);
    }catch(err){
        console.log("Error in list app: "+err);
        res.json({"error":err})
    }
}
exports.updateApp=async (req,res)=>{
    try{
        const rows = await db.query("select * from app where app_link='"+req.body.app_link+"'");
        console.log("in app update path");
        const response=helper.emptyOrRows(rows);
        const resp=await db.query(`update app set legacyZhash='${response[0].updatedZhash}',updatedZhash='${req.body.zhash}'`);
        res.json(response);
    }catch(err){
        console.log("Error in list app: "+err);
        res.json({"error":err})
    }
}