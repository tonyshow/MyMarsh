import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import CompGrid from "../../Framework/Components/CompGrid";
import CompPageView from "../../Framework/Components/CompPageView";
import CompTimer from "../../Framework/Components/CompTimer";
import EnumTime from "../../Framework/Enum/EnumTime";
import MsgFullScreen from "../../Framework/Interface/Msg/MsgFullScreen";
import ResUtil from "../../Framework/Manager/ResManager/ResUtil";
import g_global from "../../Script/GameGlobal";
import WaterMaiginDataManager from "./Data/WaterMaiginDataManager";
import WaterMarginSimplyFace from "./WaterMarginSimplyFace";

const { ccclass, property } = cc._decorator;
@ccclass
export default class MsgMyCardWaterMargin extends MsgFullScreen {
  @property({ tooltip: "我的热干面", type: cc.Node })
  MySimplyFace: cc.Node = null;
  @property({ tooltip: "我的卡册", type: cc.Node })
  MyCards: cc.Node = null;

  @property({ tooltip: "我的热干面按钮", type: cc.Node })
  buttonSimplyFace: cc.Node = null;
  @property({ tooltip: "我的卡册按钮", type: cc.Node })
  buttonCards: cc.Node = null;

  @property({ tooltip: "我的热干面区域", type: cc.Node })
  MyCardArea: cc.Node = null;

  @property({ tooltip: "热干面预制体", type: cc.Enum(EnumPrefab) })
  enumPrefab = EnumPrefab.NONE;

  @property({ tooltip: "我的卡册", type: cc.Node })
  pageView: cc.Node = null;


  @property({ tooltip: "我的卡册", type: CompGrid })
  compGrid: CompGrid = null;


  @property({ tooltip: "我的卡册PageView", type: CompPageView })
  myCardPageView: CompPageView = null;


  @property({ tooltip: "倒计时", type: CompTimer })
  compTime: CompTimer = null;

  @property({ tooltip: "头像", type: cc.Sprite })
  headSp: cc.Sprite = null;


  simplyFaceCompList=[];
  async onLoad() {
    this.eveList.push(["refeshSimplyFace",this.refeshSimplyFace.bind(this)])
    this.eveList.push(["onShareAppMessage",this.onShareAppMessage.bind(this)])

    await super.onLoad();
    this.enterMySimplyFace();
    //this.enterMyCards()
    let button = this.buttonSimplyFace.getComponent(cc.Button);
    if (!button) {
      this.buttonSimplyFace.addComponent(cc.Button);
    }
    this.buttonSimplyFace.on("click", this.onClickMySimplyFace, this);


    if (!this.buttonCards.getComponent(cc.Button)) {
      this.buttonCards.addComponent(cc.Button);
    }
    this.buttonCards.on("click", this.onClickMyCards, this);


    if (!this.MyCardArea.getComponent(cc.Button)) {
      this.MyCardArea.addComponent(cc.Button);
    }
    this.MyCardArea.on("click", this.openTurntable, this);

    let selfsize = this.node.getContentSize()
    this.MySimplyFace.setContentSize(new cc.Size(cc.winSize.width,selfsize.height));
    this.MyCards.setContentSize(selfsize);
    this.pageView.setContentSize(selfsize);
    let dataManager:WaterMaiginDataManager = g_global.dataManager as WaterMaiginDataManager
    for(let i = 0 ; i < dataManager.getSimplyFaceMaxCnt();++i){
      if(i == 0 ){
        let tempSize = this.MyCardArea.getContentSize()
        this.compGrid.setSelfSize(tempSize)
        this.compGrid.setItemSize(new cc.Size(selfsize.width/4,tempSize.height/2))
      }
      let simplyFaceComp :WaterMarginSimplyFace= await ResUtil.getCompByEnumPrefab(this.enumPrefab,this.MyCardArea);
      this.simplyFaceCompList.push(simplyFaceComp)
      simplyFaceComp.setHave(i<dataManager.getMySimplyFaceCnt())
      let simplyFaceNode =  simplyFaceComp.node
      simplyFaceNode.setContentSize(this.compGrid.getItemSize())
      simplyFaceNode.setPosition(this.compGrid.getPosition())
    }

    for( let i = 1;i<= 109;++i ){
      if(i%4==0 || i==109){
        let cards = [];
        if( i==109){
          cards.push( i )
        }else{
          for( let id=i-4;id<i;++id ){
            cards.push( id+1 )
          }
        }
        this.myCardPageView.addPage(cards);
      }
    }
    this.compTime.setSpaceTime(dataManager.simplyFaceTimeSpace)
    this.compTime.refreshEndTime(dataManager.getNextSimplyFaceTime(),EnumTime.TIMESTAMP);
    this.compTime.registerEndCallBack( ()=>{
      dataManager.timeoutFinsh()
      this.refeshSimplyFace();
      this.compTime.refreshEndTime(dataManager.getNextSimplyFaceTime(),EnumTime.TIMESTAMP);
    });

    //加载头像
    let userInfo	= dataManager.player.get('userInfo')
    if(!!userInfo && !!userInfo.avatarUrl){

      userInfo.avatarUrl= userInfo.avatarUrl.replace('http://thirdwx.qlogo.cn', 'https://wx.qlogo.cn')
      userInfo.avatarUrl= userInfo.avatarUrl.replace('https://thirdwx.qlogo.cn', 'https://wx.qlogo.cn')

      cc.assetManager.loadRemote<cc.Texture2D>( userInfo.avatarUrl, {ext: '.png'}, (err: Error, texture: cc.Texture2D) =>{
        if(!!err){
          cc.error(err)
          return;
        }
        this.headSp.spriteFrame = new cc.SpriteFrame(texture);
      } );
    }

  }
  refeshSimplyFace(){
    let dataManager:WaterMaiginDataManager = g_global.dataManager as WaterMaiginDataManager
    for(let i = 0 ; i < dataManager.getSimplyFaceMaxCnt();++i){
      this.simplyFaceCompList[i].setHave(i<dataManager.getMySimplyFaceCnt())
    }
  }
  onShareAppMessage(){
    let dataManager:WaterMaiginDataManager = g_global.dataManager as WaterMaiginDataManager
    dataManager.addSimplyFace(1)
  }

  enterMyCards() {
    this.buttonCards.setScale(1.06);
    this.buttonSimplyFace.setScale(1);
    this.MyCards.stopAllActions();
    this.MySimplyFace.stopAllActions();
    this.MyCards.runAction(cc.moveTo(0.4, cc.v2(0, 0)).easing(cc.easeSineOut()));
    this.MySimplyFace.runAction(cc.moveTo(0.4, cc.v2(-cc.winSize.width, 0)).easing(cc.easeSineOut()));
  }
  enterMySimplyFace() {
    this.buttonSimplyFace.setScale(1.06);
    this.buttonCards.setScale(1);
    this.MyCards.stopAllActions();
    this.MySimplyFace.stopAllActions();
    this.MySimplyFace.runAction(cc.moveTo(0.4, cc.v2(0, 0)).easing(cc.easeSineOut()));
    this.MyCards.runAction(cc.moveTo(0.4, cc.v2(cc.winSize.width, 0)).easing(cc.easeSineOut()));
  }

  onClickMyCards() {
    this.enterMyCards();
  }
  onClickMySimplyFace() {
    this.enterMySimplyFace();
  }

  onClickArrowLeft() {
    this.myCardPageView.scrollLeft();
  }
  onClickArrowRight() {
    this.myCardPageView.scrollRight();
  }

  onClickHead(){
    let player =  ( g_global.dataManager as WaterMaiginDataManager).player ;
    g_global.msgManager.show(EnumPrefab.MsgWaterMarginPlayer,player)
  }

  openTurntable(){
    g_global.msgManager.show(EnumPrefab.MsgWaterMarginTurntable);
  }
}
