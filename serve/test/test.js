// const mathjs = require('mathjs');
// const {chain} = require('mathjs');

const Decimal = require('decimal.js');
//
const a = 0.1;
const b = 0.2;
// const cc = chain(aa).add(bb).done();
// console.log(cc);

let c = new Decimal(a).add(new Decimal(b));
console.log(c);