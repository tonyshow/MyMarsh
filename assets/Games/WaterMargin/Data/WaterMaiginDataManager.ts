import _ from "underscore";
import DataManager from "../../../Framework/Manager/DataManager/DataManager";
import g_global from "../../../Script/GameGlobal";
export default class WaterMaiginDataManager extends DataManager {
  staticAllCard = {}; //本地所有卡
  myAllCard = {}; //我拥有的所有卡
  mySimplyFaceCnt: number = 0; //我得干脆面数量
  simplyFaceMaxCnt: number = 8; //脆面数量上限

  cardMaxCnt = 109; //卡牌总数
  nextSimplyFaceTime: number = 0; //下一个干脆面获得时间
  simplyFaceTimeSpace: number = 30 * 60 * 1000; //一个小时获得一个干脆面

  shareImgNativeUrl:string="";//分享给还有的图片
  constructor(args) {
    super(args);
  }
  /**
   * 获得分享信息
   */
  public getShareInfo(){
    var ret = {
      title: "Q水浒",
      imageUrl: this.shareImgNativeUrl,
    };
    return ret;
  }
  public initShareImage(){
    return new Promise<string>( (resolve ,reject)=>{
      cc.resources.load("WaterMaiginShareIcon", (err, data) => {
        if (!!err) {
          reject(err)
        } else {
          resolve(data.nativeUrl)
        }
      });
    } )
  }
  //初始化下一次获取热干面的时间
  public initNextSimplyFaceTime() {
    let nowTime = Date.now();
    this.nextSimplyFaceTime = g_global.platform.localStorageGetItem(
      "nextSimplyFaceTime"
    ) as number;
    if (null == this.nextSimplyFaceTime) {
      this.nextSimplyFaceTime = nowTime + this.simplyFaceTimeSpace;
      g_global.platform.localStorageSetItem(
        "nextSimplyFaceTime",
        this.nextSimplyFaceTime
      );
    } else {
      this.nextSimplyFaceTime = Number(this.nextSimplyFaceTime);
      //如果超出了重新计算一个时间
      if (this.nextSimplyFaceTime < nowTime) {
        //超出的时间
        let outTime = nowTime - this.nextSimplyFaceTime;
        let addSimplyFaceCnt = Math.floor(outTime / this.simplyFaceTimeSpace);
        this.addSimplyFace(addSimplyFaceCnt);
        this.nextSimplyFaceTime = (addSimplyFaceCnt) * this.simplyFaceTimeSpace +  this.nextSimplyFaceTime;
        g_global.platform.localStorageSetItem("nextSimplyFaceTime",this.nextSimplyFaceTime);
      }
    }
  }
  //初始化我得卡牌
  public initMyAllCard() {
    let myAllCard = g_global.platform.localStorageGetItem("myCards");
    if (null == myAllCard) {
      this.myAllCard = {};
      g_global.platform.localStorageSetItem(
        "myCards",
        JSON.stringify(this.myAllCard)
      );
    } else {
      try {
        this.myAllCard = JSON.parse(myAllCard);
      } catch (error) {
        console.log("我得卡牌数据装换失败");
      }
    }
  }
  //倒计时完成时
  public timeoutFinsh() {
    let nowTime = Date.now();
    this.nextSimplyFaceTime = nowTime + this.simplyFaceTimeSpace;
    this.addSimplyFace(1);
  }
  public addSimplyFace(addCnt) {
    this.mySimplyFaceCnt += addCnt;
    if (this.mySimplyFaceCnt <= this.simplyFaceMaxCnt) {
      g_global.platform.localStorageSetItem(
        "mySimplyFaceCnt",
        this.mySimplyFaceCnt
      );
      g_global.eveLister.emit("refeshSimplyFace", this.mySimplyFaceCnt);
    } else {
      this.mySimplyFaceCnt = this.simplyFaceMaxCnt;
      g_global.platform.localStorageSetItem(
        "mySimplyFaceCnt",
        this.mySimplyFaceCnt
      );
      g_global.eveLister.emit("refeshSimplyFace", this.mySimplyFaceCnt);
    }
  }
  public reduceSimplyFace(reduceCnt?) {
    if (null == reduceCnt) {
      --this.mySimplyFaceCnt;
    } else {
      this.mySimplyFaceCnt -= reduceCnt;
    }
    g_global.platform.localStorageSetItem(
      "mySimplyFaceCnt",
      this.mySimplyFaceCnt
    );
    g_global.eveLister.emit("refeshSimplyFace", this.mySimplyFaceCnt);
  }
  //初始化我得干脆面数量
  public initSimplyFaceCnt() {
    this.mySimplyFaceCnt = g_global.platform.localStorageGetItem(
      "mySimplyFaceCnt"
    );
    if (null == this.mySimplyFaceCnt) {
      this.mySimplyFaceCnt = 0;
      g_global.platform.localStorageSetItem("mySimplyFaceCnt", 0);
    } else {
      this.mySimplyFaceCnt = Number(this.mySimplyFaceCnt);
    }
  }
  public async init() {
    this.initSimplyFaceCnt();
    this.initNextSimplyFaceTime();
    this.initMyAllCard();
    //---------------------------------------------------------
    this.shareImgNativeUrl = await this.initShareImage()
  }
  public getStaticAllCard() {
    return this.staticAllCard;
  }
  public getMyAllCard() {
    return this.myAllCard;
  }
  public getIsHaveCard(id) {
    if (null == this.myAllCard) {
      return false;
    }
    if (null == this.myAllCard[id]) {
      return false;
    }
    return true;
  }

  //是否可以升级品质
  public getIsCanUpLevel(id) {
    if (null == this.myAllCard) {
      return false;
    }
    if (null == this.myAllCard[id]) {
      return false;
    }
    if(this.myAllCard[id].level>=7){
      return false;
    }
    return this.myAllCard[id].cnt>this.myAllCard[id].level;
  }

  public needCardCanUp(id){
    if (null == this.myAllCard) {
      return 0;
    }
    if (null == this.myAllCard[id]) {
      return 0;
    }
    return (this.myAllCard[id].level+1)-this.myAllCard[id].cnt;
  }
  public doUpLevelCard(id){
    if (null == this.myAllCard) {
      return false;
    }
    if (null == this.myAllCard[id]) {
      return false;
    }

    this.myAllCard[id].cnt = this.myAllCard[id].cnt-this.myAllCard[id].level
    this.myAllCard[id].level+=1

    g_global.eveLister.emit("addCard", id);

    g_global.platform.localStorageSetItem(
      "myCards",
      JSON.stringify(this.myAllCard)
    );
    return this.myAllCard[id].level
  }
  public addCard(id, cnt?) {
    cnt = null == cnt ? 1 : cnt;
    if (null == this.myAllCard[id]) {
      this.myAllCard[id] = { cnt: cnt, level: 7 };
    } else {
      this.myAllCard[id].cnt += cnt;
    }
    g_global.platform.localStorageSetItem(
      "myCards",
      JSON.stringify(this.myAllCard)
    );
    g_global.eveLister.emit("addCard", id);
  }
  public getCardCnt(id): number {
    if (!this.myAllCard[id]) {
      return 0;
    }
    return this.myAllCard[id].cnt || 0;
  }
  public getCardLevel(id): number {
    if (!this.myAllCard[id]) {
      return 0;
    }
    return this.myAllCard[id].level || 0;
  }
  public isMaxCardLevel(id): boolean {
    if (!this.myAllCard[id]) {
      return false;
    }
    return  7 == this.myAllCard[id].level;
  }

  public getMySimplyFaceCnt(): number {
    return this.mySimplyFaceCnt;
  }
  public getSimplyFaceMaxCnt(): number {
    return this.simplyFaceMaxCnt;
  }
  public getNextSimplyFaceTime(): number {
    return this.nextSimplyFaceTime;
  }
}
