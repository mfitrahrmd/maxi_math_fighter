import Phaser from "phaser";
import MathFighterScene from "./src/scene/MathFighterScene";

export default new Phaser.Game({
  mode: "debug",
  type: Phaser.AUTO,
  parent: "app",
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      gravity: {
        y: 200,
      },
    },
  },
  width: 480,
  height: 640,
  scene: [MathFighterScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  debug:true
});
