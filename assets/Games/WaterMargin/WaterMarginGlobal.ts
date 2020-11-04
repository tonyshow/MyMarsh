import GlobalManager from "../../Framework/Manager/GlobalManager";
import WaterMarginPlayer from "./WaterMarginPlayer";

export class WaterMarginGlobal extends GlobalManager {
  constructor() {
    super();
    this.dataManager.createPlayer(WaterMarginPlayer);
  }
}

var g_waterMargin = new WaterMarginGlobal();
export default g_waterMargin;
