require("shelljs/global");
var _ = require('underscore');
var ccc = require("../Framework/utilTool/ccc");
var fs = require('fs');
var path = require('path');
const xlsx = require('node-xlsx');
var app = module.exports = {}
app.mkdirsSync = function(dirname)
{
    if (fs.existsSync(dirname))
    {
        return true;
    }
    else
    {
        if (this.mkdirsSync(path.dirname(dirname)))
        {
            fs.mkdirSync(dirname);
            return true;
        }
    }
};
app.saveFile = function(filePath, fileInfo) {
  try {
    fs.statSync(filePath);
  } catch (error) {
    fs.writeFileSync(filePath, "");
  }

  fs.open(filePath, "r+", (err, fd) => {
    if (err) {
      return ccc.error(err);
    }
    fs.writeFile(filePath, fileInfo, "utf-8", (err, data) => {
      if (err) {
        ccc.error(err);
        return;
      }
      fs.close(fd, function (err) {
        if (err) {
          ccc.log(err);
          return;
        }
        ccc.log("刷新完成:"+filePath);
      });
    });
  });
}
app.main = function()
{
  let weightTotal =0;
  let ifInfo ="";
  let cardInfo='';
  var list = xlsx.parse("./水浒卡.xlsx");
  if (_.size(list) > 0)
  {
      let allDataList = list[0].data;
      _.each( allDataList , (data,idx)=>{
        if(0!=idx){
          weightTotal+=data[2]
          cardInfo+=`"${data[0]}":{id:${data[0]},name:"${data[1]}", maxLevel:${data[3]},weight:${data[2]}},`
          if(1 == idx){
            ifInfo+=`if(randNum < ${weightTotal}) {
      return ${data[0]};`
          }else {
            ifInfo+=`
    } else if(randNum < ${weightTotal}) {
      return ${data[0]};`
          }

          console.log(idx,data )
        }
      } )
      ifInfo+=`} else{
        return 109;
      }`
  }

  let saveInfo = `
import _ from "underscore";
export default class WaterMaiginCardTool {
  cardDic = {
   ${cardInfo}
  };
  weightTotal: number = ${weightTotal};
  randCardId() {
    let randNum = _.random(0, this.weightTotal);
    ${ifInfo}
  }
  getCardData(id: number) {
    if (!!this.cardDic[id]) {
      return this.cardDic[id];
    }
    cc.error("不存在id=", id);
    return 0;
  }
}
  `;

  let fileFullPath = path.resolve(__dirname, "./../../assets/Games/WaterMargin/Data/WaterMaiginCardTool.ts")
  app.saveFile(fileFullPath, saveInfo);
}
app.main();
