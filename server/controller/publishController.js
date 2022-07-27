const db=require('../services/db');
const config=require('../services/config');
const helper=require('../services/helper');
const { emptyOrRows,escapeString } = require('../services/helper');
exports.listAll=async (req,res)=>{
    try{
    const offset = helper.getOffset(100, config.listPerPage);
    const rows = await db.query(
    `SELECT pc.id,a.app_name,pc.app_link,pc.comment,pc.zfa,p.name as publishedBy,pc.incom,pc.inother,pc.enabled,pc.publishedOn from publish as pc left join app as a on pc.app_link=a.app_link left join publisher as p on pc.publisher=p.id`
    );
  console.log("in api path");
  const response=helper.emptyOrRows(rows);
  const finalOutput={};
  response.forEach(item=>{
    finalOutput[item.id]=item;
    finalOutput[item.id]["incom"]=((finalOutput[item.id]["incom"]===1)?true:false);
    finalOutput[item.id]["inother"]=((finalOutput[item.id]["inother"]===1)?true:false);
  });
  res.json(finalOutput);
    }
    catch(e){
        console.log(e);
    }
}
exports.addNew=async (req,res)=>{
    try{
        const queryStr=`insert into publish (app_link,comment,zfa,publisher) values ('${req.body.app_link}','${escapeString(req.body.comment)}','${req.body.zfa}','${req.body.publisherId}')`;
        
        const resp=await db.query(queryStr);
        const resp2=await db.query(`select * from publish where comment='${escapeString(req.body.comment)}' order by id desc`);
        const op=emptyOrRows(resp2);
        res.status(200).json({data:op[0],test:queryStr,resp:resp,updated:((resp.affectedRows>0&&resp.changedRows>0)?(true):(false))});
    }catch(e){
        console.log(e);
    }
}
exports.updatePublish=async (req,res)=>{
    try{
        const queryStr=`update publish set incom=${(req.body.incom===true)?(1):(0)},inother=${(req.body.inother===true?(1):(0))},enabled=${(req.body.enabled===true?(1):(0))} where id=${req.body.id}`;
        const resp=await db.query(queryStr);
        res.json({test:queryStr,resp:resp,updated:((resp.affectedRows>0&&resp.changedRows>0)?(true):(false))});
    }catch(e){
        console.log(e);
    }
}
exports.nextAutoIncrement=async (req,res)=>{
    try{
        const queryStr=`select * from publish order by id desc limit 1`;
        const resp=await db.query(queryStr);
        res.json({
            nextId:(resp.length>0||resp===undefined)?(resp[0].id+1):(1)
        })
    }catch(e){
        console.log(e);
    }
}