import Phaser from "phaser";
export default class MathFighterScene extends Phaser.Scene {
  constructor() {
    super("math-fighter-scene");
  }
  init() {
    this.gameHalfWidth = this.scale.width * 0.5; //koordinat tengah sumbu x
    this.gameHalfHeight = this.scale.height * 0.5; //koordinat tengah sumbu y
    this.player = undefined;
    this.enemy = undefined;
    this.slash = undefined;
    this.startGame = false; // untuk kondisi apakah game sudah mulai atau belum
    this.questionText = undefined;
    this.resultText = undefined;
    this.button1 = undefined;
    this.button2 = undefined;
    this.button3 = undefined;
    this.button4 = undefined;
    this.button5 = undefined;
    this.button6 = undefined;
    this.button7 = undefined;
    this.button8 = undefined;
    this.button9 = undefined;
    this.button0 = undefined;
    this.buttonDel = undefined;
    this.buttonOk = undefined;
  }

  preload() {
    this.load.image("background", "images/assets/bg_layer1.png");
    this.load.image("fight-bg", "images/assets/fight-bg.png");
    this.load.image("tile", "images/assets/tile.png");
    this.load.spritesheet("player", "images/assets/warrior1.png", {
      frameHeight: 80,
      frameWidth: 80,
    });
    this.load.spritesheet("enemy", "images/assets/warrior2.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("numbers", "images/assets/numbers.png", {
      frameWidth: 71.25,
      frameHeight: 131,
    });
    this.load.spritesheet("slash", "images/assets/slash.png", {
      frameWidth: 88,
      frameHeight: 42,
    });
    this.load.image("start-btn", "images/assets/start_button.png");
  }
  create() {
    this.add.image(240, 320, "background");
    const fight_bg = this.add.image(240, 160, "fight-bg");
    const tile = this.physics.add.staticImage(
      240,
      fight_bg.height - 40,
      "tile"
    );
    this.player = this.physics.add
      .sprite(this.gameHalfWidth - 150, this.gameHalfHeight - 200, "player")
      .setOffset(20, -10)
      .setBounce(0.2);
    this.enemy = this.physics.add
      .sprite(this.gameHalfWidth + 150, this.gameHalfHeight - 200, "enemy")
      .setOffset(20, -10)
      .setBounce(0.2)
      .setFlipX(true);

    this.physics.add.collider(this.enemy, tile);
    this.physics.add.collider(this.player, tile);
    this.slash = this.physics.add
      .sprite(240, 60, "slash")
      .setActive(false)
      .setVisible(true)
      .setGravityY(-500)
      .setOffset(0, -10)
      .setDepth(1)
      .setCollideWorldBounds(true);
    this.createAnimation;
    let start_button = this.add
      .image(this.gameHalfWidth, this.gameHalfHeight + 181, "start-btn")
      .setInteractive();
    start_button.on(
      "pointerdown",
      () => {
        this.gameStart(); // Jalankan method gameStart dan button menghilang.
        start_button.destroy();
      },
      this
    );
    this.createButtons;
  }
  update() {}
  createAnimation() {
    //player animations
    this.anims.create({
      key: "player-standby",
      frames: this.anims.generateFrameNumbers("player", { start: 15, end: 19 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "player-attack",
      frames: this.anims.generateFrameNumbers("player", { start: 10, end: 14 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-hit",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 9 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-die",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 4 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-standby",
      frames: this.anims.generateFrameNumbers("enemy", { start: 15, end: 19 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "enemy-attack",
      frames: this.anims.generateFrameNumbers("enemy", { start: 10, end: 14 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-hit",
      frames: this.anims.generateFrameNumbers("enemy", { start: 5, end: 9 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-die",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 4 }),
      frameRate: 10,
    });
  }
  gameStart() {
    this.startGame = true;
    this.player.anims.play("player-standby", true);
    this.enemy.anims.play("enemy-standby", true);
    this.resultText = this.add.text(this.gameHalfWidth, 200, "0", {
      fontSize: "32px",
      fill: "#000",
    });
    this.questionText = this.add.text(this.gameHalfWidth, 100, "0", {
      fontSize: "32px",
      fill: "#000",
    });
  }
  createButtons() {
    const startPosY = this.scale.height - 246;
    const widthDiff = 131;
    const heightDiff = 71.25;

    // center buttons
    this.button2 = this.add
      .image(this.gameHalfWidth, startPosY, "numbers", 1)
      .setInteractive()
      .setData("value", 2);

    this.button5 = this.add
      .image(this.gameHalfWidth, this.button2.y + heightDiff, "numbers", 4)
      .setInteractive()
      .setData("value", 5);

    this.button8 = this.add
      .image(this.gameHalfWidth, this.button5.y + heightDiff, "numbers", 7)
      .setInteractive()
      .setData("value", 8);

    this.button0 = this.add
      .image(this.gameHalfWidth, this.button8.y + heightDiff, "numbers", 10)
      .setInteractive()
      .setData("value", 0);
    this.button1 = this.add
      .image(this.button2.x - widthDiff, startPosY, "numbers", 0)
      .setInteractive()
      .setData("value", 1);

    this.button4 = this.add
      .image(
        this.button5.x - widthDiff,
        this.button1.y + heightDiff,
        "numbers",
        3
      )
      .setInteractive()
      .setData("value", 4);

    this.button7 = this.add
      .image(
        this.button8.x - widthDiff,
        this.button4.y + heightDiff,
        "numbers",
        6
      )
      .setInteractive()
      .setData("value", 7);

    this.buttonDel = this.add
      .image(
        this.button0.x - widthDiff,
        this.button7.y + heightDiff,
        "numbers",
        9
      )
      .setInteractive()
      .setData("value", "del");
  }
}
