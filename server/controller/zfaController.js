const CryptoJS = require("crypto-js");
const db = require('../services/db');
const helper=require('../services/helper');

function Base64toHex(data){
    let res=atob(data);
    let result="";
    for(let i=0;i<res.length;i++){
        let hex=res.charCodeAt(i).toString(16);
        result+=((hex.length===2)?(hex):('0'+hex));
    }
    return result;
}
function HextoBase64(data){

    let result="";
    for(let i=0;i<data.length;i=i+2){
        result+=String.fromCharCode(parseInt(data.substring(i,i+2),16));
    }
    return btoa(result);
}
function encryptDesCbcPkcs7Padding(message, key) {
    var keyWords = CryptoJS.enc.Utf8.parse(key);
    var ivWords = CryptoJS.lib.WordArray.create([0, 0]);
    var base64Coded = btoa(message);
    var encrypted = CryptoJS.DES.encrypt(base64Coded, keyWords, { iv: ivWords});
    var finalEncrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    return Base64toHex(finalEncrypted);//.toString(CryptoJS.enc.Utf8);
}

function decryptDesCbcPkcs7Padding(message, key) {
    var keyWords = CryptoJS.enc.Utf8.parse(key);
    var ivWords = CryptoJS.lib.WordArray.create([0, 0]);
    message=HextoBase64(message);
    var base64Decoded = CryptoJS.enc.Base64.parse(message);
    var decrypted = CryptoJS.DES.decrypt({ciphertext: base64Decoded}, keyWords, { iv: ivWords });

    var intermediateDec= decrypted.toString(CryptoJS.enc.Utf8);
    var finalDecrypted = CryptoJS.enc.Base64.parse(intermediateDec.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Utf8);
    return finalDecrypted;
}
exports.addZFA=async (req,res)=>{
    try{
        let currentTimestamp=new Date().getTime().toString();
        console.log("Key: "+req.body.zfaFile.service.linkName);
        let hash=encryptDesCbcPkcs7Padding(req.body.zfaFile.service.linkName+currentTimestamp,req.body.zfaFile.service.linkName);
        try{
            let tempEnc=encodeURIComponent(JSON.stringify(req.body.zfaFile));
            let decodeEnc=JSON.parse(decodeURIComponent(tempEnc));
            if(decodeEnc===req.body.zfaFile){
                console.log("encoded==decoded");
            }else{
                console.log("encoded==decoded");
            }
        }
        catch(e){
            console.log(e);
        }
        let queryStr=`insert into zfaList (zhash,app_link,zfaFile) values ('${hash}','${req.body.zfaFile.service.linkName}','${btoa(JSON.stringify(req.body.zfaFile))}')`;
        console.log(`insert into zfaList (zhash,app_link,zfaFile) values ('${hash}','${req.body.zfaFile.service.linkName}','zfa'`);
        let resp=await db.query(queryStr);
        if(resp.affectedRows==1){
            res.json({"zhash":hash.toString()});
        }
    }
    catch(e){
        console.log("Error: "+e.toString());
        res.status(400).json({error:e});
    }

}
exports.decryptKey=async (req,res)=>{
    let decrypted=decryptDesCbcPkcs7Padding(req.query.zhash,req.query.app_link);
    res.json({"data":decrypted});
}
exports.getZFA=async (req,res)=>{
    try{
        let queryStr=`select * from zfaList where zhash='${req.query.zhash}'`;
        let data=await db.query(queryStr);
        const rows=helper.emptyOrRows(data);
        console.log(rows[0]);
        rows[0].zfaFile=JSON.parse(atob(rows[0].zfaFile));
        res.json(rows[0]);
    }
    catch(e){
        console.log("Error:"+e);
        res.status(400).json({error:e});
    }

}