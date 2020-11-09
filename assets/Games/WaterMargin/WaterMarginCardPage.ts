import EnumPrefab from "../../Framework/Auto/EnumPrefab";
import CompGrid from "../../Framework/Components/CompGrid";
import ResUtil from "../../Framework/Manager/ResManager/ResUtil";

const { ccclass, property } = cc._decorator;
@ccclass
export default class WaterMarginCardPage extends cc.Component {
  @property({ tooltip: "预制体", type: cc.Enum(EnumPrefab) })
  enumPrefabCard = EnumPrefab.NONE;

  @property({ tooltip: "格子组件", type: CompGrid })
  compGrid: CompGrid = null;
  data:any=null;
  setData(data){
    this.data=data
    this.addCards();
  }
  onLoad(){

  }

  async addCards() {

    for (let i = 0; i < this.data.length; ++i) {
      let nodeCardComp = await ResUtil.getCompByEnumPrefab(this.enumPrefabCard,this.node);
      nodeCardComp.setCardId(this.data[i]);
      let nodeCard  = nodeCardComp.node
      if(i == 0 ){
        this.compGrid.setSelfSize(this.node.getContentSize())
      }
      nodeCard.setContentSize(this.compGrid.getItemSize());
      nodeCard.setPosition(this.compGrid.getPosition());
    }
  }
}
