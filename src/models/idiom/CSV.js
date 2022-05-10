// const CHENGYU = require('./ORM');
//
// const fs = require('fs');
// const path = require('path');
// const configFile = path.resolve(__dirname, './idiom.json');
// const Json2csvParser = require('json2csv').Parser;
//
// async function createDB() {
//
//   const data = fs.readFileSync(configFile, 'UTF-8').toString();
//   let config = JSON.parse(data);
//
//   const fields = ['derivation', 'example', 'explanation', 'pinyin','word','abbreviation'];
//   const json2csvParser = new Json2csvParser({ fields });
//   const csv = json2csvParser.parse(config);
//
//   fs.writeFile('./成语.csv', csv, function(err) {
//     if(err) {
//       // return console.log(err);
//     }
//
//     console.log('The file was saved!');
//   });
//
//
//
//
//   // return await CHENGYU.bulkCreate(config).catch(err=>{
//   //   console.log(err);
//   // });
// }
//
// module.exports = createDB;
