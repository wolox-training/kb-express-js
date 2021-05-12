const { AES: aes, enc } = require('crypto-js');
const config = require('../../config').common.crypt;

exports.encrypt = text => aes.encrypt(text, config.cryptSecret).toString();

exports.decrypt = text => aes.decrypt(text, config.cryptSecret).toString(enc.Utf8);

exports.encryptObject = object => exports.encrypt(JSON.stringify(object));

exports.decryptObject = text => JSON.parse(exports.decrypt(text));
