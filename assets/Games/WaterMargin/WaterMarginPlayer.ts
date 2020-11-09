import Player from "../../Framework/Data/Player"

export default class WaterMarginPlayer extends Player{
  public vidoCardCnt:number = 0;//视频卡数量

  /**
   * 消耗视频卡
   * @param money 不传参数默认减去1
   */
  public consumeVidoCard(vidoCardCnt?){
    return  vidoCardCnt? (this.vidoCardCnt-vidoCardCnt) : --this.vidoCardCnt;
  }

  public isHaveVidoCard():boolean{
    return this.vidoCardCnt>0
  }
}