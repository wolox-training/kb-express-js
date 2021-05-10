const { AES: aes } = require('crypto-js');
const config = require('../../config').common.crypt;

exports.encrypt = text => aes.encrypt(text, config.cryptSecret).toString();
