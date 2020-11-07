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

  onLoad(){
    this.addCards();
  }

  async addCards() {
    let cnt = 4;
    for (let i = 0; i < cnt; ++i) {
      let nodeCard = await ResUtil.getNodeByEnumPrefab(this.enumPrefabCard);
      if(i == 0 ){
        this.compGrid.setSelfSize(this.node.getContentSize())
      }
      nodeCard.setContentSize(this.compGrid.getItemSize());
      this.node.addChild(nodeCard);
      nodeCard.setPosition(this.compGrid.getPosition());
    }
  }
}
