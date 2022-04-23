var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Estados do jogo
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
    pathImg = loadImage("Road.png");
    boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
    cashImg = loadImage("cash.png");
    diamondsImg = loadImage("diamonds.png");
    jwelleryImg = loadImage("jwell.png");
    swordImg = loadImage("sword.png");
    endImg = loadAnimation("gameOver.png");
}

function setup() {
    gameState = PLAY;

    createCanvas(windowWidth, windowHeight);
    // Movendo plano de fundo
    path = createSprite(windowWidth / 2, windowHeight);
    path.addImage(pathImg);
    path.velocityY = 4;

    //criar menino correndo
    boy = createSprite(70, windowHeight - 50, 20, 20);
    boy.addAnimation("SahilRunning", boyImg);
    boy.setCollider("circle", 20, 20);
    boy.scale = 0.08;

    cashG = new Group();
    diamondsG = new Group();
    jwelleryG = new Group();
    swordGroup = new Group();
}

function draw() {
    background(0);

    if (gameState === PLAY) {
        boy.x = World.mouseX;

        if (path.y > windowHeight) {
            path.y = height / 2;
        }

        edges = createEdgeSprites();
        boy.collide(edges);

        createCash();
        createDiamonds();
        createJwellery();
        createSword();

        if (cashG.isTouching(boy)) {
            cashG.destroyEach();
            treasureCollection = treasureCollection + 50;
        } else if (diamondsG.isTouching(boy)) {
            diamondsG.destroyEach();
            treasureCollection = treasureCollection + 100;
        } else if (jwelleryG.isTouching(boy)) {
            jwelleryG.destroyEach();
            treasureCollection = treasureCollection + 150;
        } else {
            if (swordGroup.isTouching(boy)) {
                gameState = END;

                boy.addAnimation("SahilRunning", endImg);
                boy.x = windowWidth / 2;
                boy.y = windowHeight / 2;
                boy.scale = (0.6 * windowWidth) / 412;

                cashG.destroyEach();
                diamondsG.destroyEach();
                jwelleryG.destroyEach();
                swordGroup.destroyEach();

                cashG.setVelocityYEach(0);
                diamondsG.setVelocityYEach(0);
                jwelleryG.setVelocityYEach(0);
                swordGroup.setVelocityYEach(0);
            }
        }
    } else if (gameState == END) {
        path.velocityY = 0;
    }

    drawSprites();
    textSize((10 * windowWidth) / 800);
    fill(255);
    text("Tesouro: " + treasureCollection, 10 , 30);
}

function createCash() {
    if (World.frameCount % 200 == 20) {
        var cash = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
        cash.addImage(cashImg);
        cash.scale = 0.12;
        cash.velocityY = 5;
        cash.lifetime = windowHeight / cash.velocityY;
        cashG.add(cash);
    }
}

function createDiamonds() {
    if (World.frameCount % 320 == 30) {
        var diamonds = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
        diamonds.addImage(diamondsImg);
        diamonds.scale = 0.03;
        diamonds.velocityY = 5;
        diamonds.lifetime = windowHeight / diamonds.velocityY;
        diamondsG.add(diamonds);
    }
}

function createJwellery() {
    if (World.frameCount % 410 == 40) {
        var jwellery = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
        jwellery.addImage(jwelleryImg);
        jwellery.scale = 0.13;
        jwellery.velocityY = 5;
        jwellery.lifetime = windowHeight / jwellery.velocityY;
        jwelleryG.add(jwellery);
    }
}

function createSword() {
    if (World.frameCount % 530 == 10) {
        var sword = createSprite(Math.round(random(50, windowWidth - 50), 40, 10, 10));
        sword.addImage(swordImg);
        sword.scale = 0.1;
        sword.velocityY = 5;
        sword.lifetime = windowHeight / sword.velocityY;
        swordGroup.add(sword);
    }
}
