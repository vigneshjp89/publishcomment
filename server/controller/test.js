const CryptoJS=require('crypto-js');
function encryptDesCbcPkcs7Padding(message, key) {
    var keyWords = CryptoJS.enc.Utf8.parse(key);
    var ivWords = CryptoJS.lib.WordArray.create([0, 0]);
    var base64Coded = btoa(message);
    var encrypted = CryptoJS.DES.encrypt(base64Coded, keyWords, { iv: ivWords});
    var finalEncrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    return finalEncrypted;//.toString(CryptoJS.enc.Utf8);
}

var plainText = "test1"+new Date().getTime();
console.log("Plain text: ", plainText);


var encrypted = encryptDesCbcPkcs7Padding(plainText, "t");
console.log("Encrypted: ", encrypted);

//alert("Final encrypted: " + finalEncrypted);

function decryptDesCbcPkcs7Padding(message, key) {
    var keyWords = CryptoJS.enc.Utf8.parse(key);
    var ivWords = CryptoJS.lib.WordArray.create([0, 0]);
    var base64Decoded = CryptoJS.enc.Base64.parse(message);
    var decrypted = CryptoJS.DES.decrypt({ciphertext: base64Decoded}, keyWords, { iv: ivWords });

    var intermediateDec= decrypted.toString(CryptoJS.enc.Utf8);
    var finalDecrypted = CryptoJS.enc.Base64.parse(intermediateDec.toString(CryptoJS.enc.Utf8)).toString(CryptoJS.enc.Utf8);
    return finalDecrypted;
}




var decrypted = decryptDesCbcPkcs7Padding(encrypted, "t");
console.log("Decrypted: ", decrypted);

//c("Final decrypted: " + finalDecrypted);