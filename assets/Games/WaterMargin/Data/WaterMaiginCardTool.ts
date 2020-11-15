
import _ from "underscore";
export default class WaterMaiginCardTool {
  cardDic = {
   "1":{id:1,name:"卡1", maxLevel:7,weight:5},"2":{id:2,name:"卡2", maxLevel:7,weight:5},"3":{id:3,name:"卡3", maxLevel:7,weight:5},"4":{id:4,name:"卡4", maxLevel:7,weight:5},"5":{id:5,name:"卡5", maxLevel:7,weight:5},"6":{id:6,name:"卡6", maxLevel:7,weight:5},"7":{id:7,name:"卡7", maxLevel:7,weight:5},"8":{id:8,name:"卡8", maxLevel:7,weight:5},"9":{id:9,name:"卡9", maxLevel:7,weight:5},"10":{id:10,name:"卡10", maxLevel:7,weight:5},"11":{id:11,name:"卡11", maxLevel:7,weight:5},"12":{id:12,name:"卡12", maxLevel:7,weight:5},"13":{id:13,name:"卡13", maxLevel:7,weight:5},"14":{id:14,name:"卡14", maxLevel:7,weight:5},"15":{id:15,name:"卡15", maxLevel:7,weight:5},"16":{id:16,name:"卡16", maxLevel:7,weight:2},"17":{id:17,name:"卡17", maxLevel:7,weight:2},"18":{id:18,name:"卡18", maxLevel:7,weight:2},"19":{id:19,name:"卡19", maxLevel:7,weight:2},"20":{id:20,name:"卡20", maxLevel:7,weight:2},"21":{id:21,name:"卡21", maxLevel:7,weight:2},"22":{id:22,name:"卡22", maxLevel:7,weight:2},"23":{id:23,name:"卡23", maxLevel:7,weight:2},"24":{id:24,name:"卡24", maxLevel:7,weight:2},"25":{id:25,name:"卡25", maxLevel:7,weight:2},"26":{id:26,name:"卡26", maxLevel:7,weight:2},"27":{id:27,name:"卡27", maxLevel:7,weight:2},"28":{id:28,name:"卡28", maxLevel:7,weight:2},"29":{id:29,name:"卡29", maxLevel:7,weight:2},"30":{id:30,name:"卡30", maxLevel:7,weight:2},"31":{id:31,name:"卡31", maxLevel:7,weight:2},"32":{id:32,name:"卡32", maxLevel:7,weight:2},"33":{id:33,name:"卡33", maxLevel:7,weight:2},"34":{id:34,name:"卡34", maxLevel:7,weight:2},"35":{id:35,name:"卡35", maxLevel:7,weight:2},"36":{id:36,name:"卡36", maxLevel:7,weight:2},"37":{id:37,name:"卡37", maxLevel:7,weight:100},"38":{id:38,name:"卡38", maxLevel:7,weight:100},"39":{id:39,name:"卡39", maxLevel:7,weight:100},"40":{id:40,name:"卡40", maxLevel:7,weight:100},"41":{id:41,name:"卡41", maxLevel:7,weight:100},"42":{id:42,name:"卡42", maxLevel:7,weight:100},"43":{id:43,name:"卡43", maxLevel:7,weight:100},"44":{id:44,name:"卡44", maxLevel:7,weight:100},"45":{id:45,name:"卡45", maxLevel:7,weight:100},"46":{id:46,name:"卡46", maxLevel:7,weight:100},"47":{id:47,name:"卡47", maxLevel:7,weight:100},"48":{id:48,name:"卡48", maxLevel:7,weight:100},"49":{id:49,name:"卡49", maxLevel:7,weight:100},"50":{id:50,name:"卡50", maxLevel:7,weight:100},"51":{id:51,name:"卡51", maxLevel:7,weight:100},"52":{id:52,name:"卡52", maxLevel:7,weight:100},"53":{id:53,name:"卡53", maxLevel:7,weight:100},"54":{id:54,name:"卡54", maxLevel:7,weight:100},"55":{id:55,name:"卡55", maxLevel:7,weight:100},"56":{id:56,name:"卡56", maxLevel:7,weight:100},"57":{id:57,name:"卡57", maxLevel:7,weight:100},"58":{id:58,name:"卡58", maxLevel:7,weight:100},"59":{id:59,name:"卡59", maxLevel:7,weight:100},"60":{id:60,name:"卡60", maxLevel:7,weight:100},"61":{id:61,name:"卡61", maxLevel:7,weight:100},"62":{id:62,name:"卡62", maxLevel:7,weight:100},"63":{id:63,name:"卡63", maxLevel:7,weight:100},"64":{id:64,name:"卡64", maxLevel:7,weight:100},"65":{id:65,name:"卡65", maxLevel:7,weight:100},"66":{id:66,name:"卡66", maxLevel:7,weight:100},"67":{id:67,name:"卡67", maxLevel:7,weight:100},"68":{id:68,name:"卡68", maxLevel:7,weight:100},"69":{id:69,name:"卡69", maxLevel:7,weight:100},"70":{id:70,name:"卡70", maxLevel:7,weight:100},"71":{id:71,name:"卡71", maxLevel:7,weight:100},"72":{id:72,name:"卡72", maxLevel:7,weight:100},"73":{id:73,name:"卡73", maxLevel:7,weight:100},"74":{id:74,name:"卡74", maxLevel:7,weight:100},"75":{id:75,name:"卡75", maxLevel:7,weight:100},"76":{id:76,name:"卡76", maxLevel:7,weight:100},"77":{id:77,name:"卡77", maxLevel:7,weight:100},"78":{id:78,name:"卡78", maxLevel:7,weight:100},"79":{id:79,name:"卡79", maxLevel:7,weight:100},"80":{id:80,name:"卡80", maxLevel:7,weight:100},"81":{id:81,name:"卡81", maxLevel:7,weight:100},"82":{id:82,name:"卡82", maxLevel:7,weight:100},"83":{id:83,name:"卡83", maxLevel:7,weight:100},"84":{id:84,name:"卡84", maxLevel:7,weight:100},"85":{id:85,name:"卡85", maxLevel:7,weight:100},"86":{id:86,name:"卡86", maxLevel:7,weight:100},"87":{id:87,name:"卡87", maxLevel:7,weight:100},"88":{id:88,name:"卡88", maxLevel:7,weight:100},"89":{id:89,name:"卡89", maxLevel:7,weight:100},"90":{id:90,name:"卡90", maxLevel:7,weight:100},"91":{id:91,name:"卡91", maxLevel:7,weight:100},"92":{id:92,name:"卡92", maxLevel:7,weight:100},"93":{id:93,name:"卡93", maxLevel:7,weight:100},"94":{id:94,name:"卡94", maxLevel:7,weight:100},"95":{id:95,name:"卡95", maxLevel:7,weight:100},"96":{id:96,name:"卡96", maxLevel:7,weight:100},"97":{id:97,name:"卡97", maxLevel:7,weight:100},"98":{id:98,name:"卡98", maxLevel:7,weight:100},"99":{id:99,name:"卡99", maxLevel:7,weight:100},"100":{id:100,name:"卡100", maxLevel:7,weight:100},"101":{id:101,name:"卡101", maxLevel:7,weight:100},"102":{id:102,name:"卡102", maxLevel:7,weight:100},"103":{id:103,name:"卡103", maxLevel:7,weight:100},"104":{id:104,name:"卡104", maxLevel:7,weight:100},"105":{id:105,name:"卡105", maxLevel:7,weight:100},"106":{id:106,name:"卡106", maxLevel:7,weight:100},"107":{id:107,name:"卡107", maxLevel:7,weight:100},"108":{id:108,name:"卡108", maxLevel:7,weight:100},"109":{id:109,name:"卡109", maxLevel:7,weight:100},
  };
  weightTotal: number = 7417;
  randCardId() {
    let randNum = _.random(0, this.weightTotal);
    if(randNum < 5) {
      return 1;
    } else if(randNum < 10) {
      return 2;
    } else if(randNum < 15) {
      return 3;
    } else if(randNum < 20) {
      return 4;
    } else if(randNum < 25) {
      return 5;
    } else if(randNum < 30) {
      return 6;
    } else if(randNum < 35) {
      return 7;
    } else if(randNum < 40) {
      return 8;
    } else if(randNum < 45) {
      return 9;
    } else if(randNum < 50) {
      return 10;
    } else if(randNum < 55) {
      return 11;
    } else if(randNum < 60) {
      return 12;
    } else if(randNum < 65) {
      return 13;
    } else if(randNum < 70) {
      return 14;
    } else if(randNum < 75) {
      return 15;
    } else if(randNum < 77) {
      return 16;
    } else if(randNum < 79) {
      return 17;
    } else if(randNum < 81) {
      return 18;
    } else if(randNum < 83) {
      return 19;
    } else if(randNum < 85) {
      return 20;
    } else if(randNum < 87) {
      return 21;
    } else if(randNum < 89) {
      return 22;
    } else if(randNum < 91) {
      return 23;
    } else if(randNum < 93) {
      return 24;
    } else if(randNum < 95) {
      return 25;
    } else if(randNum < 97) {
      return 26;
    } else if(randNum < 99) {
      return 27;
    } else if(randNum < 101) {
      return 28;
    } else if(randNum < 103) {
      return 29;
    } else if(randNum < 105) {
      return 30;
    } else if(randNum < 107) {
      return 31;
    } else if(randNum < 109) {
      return 32;
    } else if(randNum < 111) {
      return 33;
    } else if(randNum < 113) {
      return 34;
    } else if(randNum < 115) {
      return 35;
    } else if(randNum < 117) {
      return 36;
    } else if(randNum < 217) {
      return 37;
    } else if(randNum < 317) {
      return 38;
    } else if(randNum < 417) {
      return 39;
    } else if(randNum < 517) {
      return 40;
    } else if(randNum < 617) {
      return 41;
    } else if(randNum < 717) {
      return 42;
    } else if(randNum < 817) {
      return 43;
    } else if(randNum < 917) {
      return 44;
    } else if(randNum < 1017) {
      return 45;
    } else if(randNum < 1117) {
      return 46;
    } else if(randNum < 1217) {
      return 47;
    } else if(randNum < 1317) {
      return 48;
    } else if(randNum < 1417) {
      return 49;
    } else if(randNum < 1517) {
      return 50;
    } else if(randNum < 1617) {
      return 51;
    } else if(randNum < 1717) {
      return 52;
    } else if(randNum < 1817) {
      return 53;
    } else if(randNum < 1917) {
      return 54;
    } else if(randNum < 2017) {
      return 55;
    } else if(randNum < 2117) {
      return 56;
    } else if(randNum < 2217) {
      return 57;
    } else if(randNum < 2317) {
      return 58;
    } else if(randNum < 2417) {
      return 59;
    } else if(randNum < 2517) {
      return 60;
    } else if(randNum < 2617) {
      return 61;
    } else if(randNum < 2717) {
      return 62;
    } else if(randNum < 2817) {
      return 63;
    } else if(randNum < 2917) {
      return 64;
    } else if(randNum < 3017) {
      return 65;
    } else if(randNum < 3117) {
      return 66;
    } else if(randNum < 3217) {
      return 67;
    } else if(randNum < 3317) {
      return 68;
    } else if(randNum < 3417) {
      return 69;
    } else if(randNum < 3517) {
      return 70;
    } else if(randNum < 3617) {
      return 71;
    } else if(randNum < 3717) {
      return 72;
    } else if(randNum < 3817) {
      return 73;
    } else if(randNum < 3917) {
      return 74;
    } else if(randNum < 4017) {
      return 75;
    } else if(randNum < 4117) {
      return 76;
    } else if(randNum < 4217) {
      return 77;
    } else if(randNum < 4317) {
      return 78;
    } else if(randNum < 4417) {
      return 79;
    } else if(randNum < 4517) {
      return 80;
    } else if(randNum < 4617) {
      return 81;
    } else if(randNum < 4717) {
      return 82;
    } else if(randNum < 4817) {
      return 83;
    } else if(randNum < 4917) {
      return 84;
    } else if(randNum < 5017) {
      return 85;
    } else if(randNum < 5117) {
      return 86;
    } else if(randNum < 5217) {
      return 87;
    } else if(randNum < 5317) {
      return 88;
    } else if(randNum < 5417) {
      return 89;
    } else if(randNum < 5517) {
      return 90;
    } else if(randNum < 5617) {
      return 91;
    } else if(randNum < 5717) {
      return 92;
    } else if(randNum < 5817) {
      return 93;
    } else if(randNum < 5917) {
      return 94;
    } else if(randNum < 6017) {
      return 95;
    } else if(randNum < 6117) {
      return 96;
    } else if(randNum < 6217) {
      return 97;
    } else if(randNum < 6317) {
      return 98;
    } else if(randNum < 6417) {
      return 99;
    } else if(randNum < 6517) {
      return 100;
    } else if(randNum < 6617) {
      return 101;
    } else if(randNum < 6717) {
      return 102;
    } else if(randNum < 6817) {
      return 103;
    } else if(randNum < 6917) {
      return 104;
    } else if(randNum < 7017) {
      return 105;
    } else if(randNum < 7117) {
      return 106;
    } else if(randNum < 7217) {
      return 107;
    } else if(randNum < 7317) {
      return 108;
    } else if(randNum < 7417) {
      return 109;} else{
        return 109;
      }
  }
  getCardData(id: number) {
    if (!!this.cardDic[id]) {
      return this.cardDic[id];
    }
    cc.error("不存在id=", id);
    return 0;
  }
}
