let player, flee;
let fleeSpeed = 4;
let flees = [];
let rc = 10;
let spacer = 100;
let startX = 200;
let startY = 200;
let original = [];
let paddingX, paddingY;
let dotsX, dotsY;

let findX, findY;

let playerSize = 50;
let playerSaturation = 100;


let enemy;
let enemySize = 50; //for ellipse, 20
let enemySpeed = 2;
let enemyHitThreshold = 10;

let gameOverGif;
let titleScreen;
let instruction;
let gameO;
let dead = 4;
//0 - instruction
//1 - ingame
//2 - dead
//4 - title

let retry;
let quit;

let score = 0;
let highScore = 0;

let song1;
let song2;
let sfx;
let scarySoundVolume = 0;
let testAudio;
let audioSpeed = 1;
let hit;

function preload(){
  gameO = loadImage("game_over_OTL.png");
  
  gameOverGif = createImg("GameOver.gif");
  instruction = createImg("Instruct.gif", "instruction");
  titleScreen = createImg("Title.gif", "title");
  enemySprite = createImg("enemy sprite.gif", "enemySprite");
  
  // song1 = loadSound("Cute song.mp3");
  // song2 = loadSound("Amazing AUDIO illusion.mp3");
  hit = loadSound("hit.mp3");
  sfx =   loadSound("pop.mp3");
  testAudio = createAudio("Cute song.mp3");
  
  
  enemySprite.hide();
  instruction.hide();
  titleScreen.hide();
  gameOverGif.hide();
}

function setup() {
  createCanvas(1100, 900);
  colorMode(HSB);
  background(334, 3, 93);
  noCursor();
  
  // song2.setVolume(scarySoundVolume);
  // song2.play();
  
  // song1.setVolume(0.3);
  // song1.play();
  
  textSize(40);
  textFont('Gaegu');
  
  testAudio.volume(0.4);
  testAudio.speed(audioSpeed);
  testAudio.loop();
  testAudio.play();
  
  gameO.resize(1050,0);
  // instruction.resize(1050, 0);
  
  //x1, y1, x2, y2
//   retry = [602, 650, 775, 727];
  
//   quit = [260, 648, 425, 717];
  
  retry = [613, 761, 799, 697];
  
  quit = [212, 756, 399, 695];
  
  // retry = createButton('retry');
  // retry.position(471, 428);
  // retry.size(130, 60);
  // retry.mousePressed(retryGame);
  // retry.hide();
  
  // quit = createButton('quit');
  // quit.position(198, 429);
  // quit.size(130, 60);
  // quit.mousePressed(quitGame);
  // quit.hide();
  
  paddingX = width/3 * 1.5;
  paddingY = height/4 * 1.5;
  
  startX = width/2 - paddingX;
  startY = height/2 - paddingY;
  
  rc = 10;
  
  dotsX = rc * 3;
  dotsY = height / rc * 3;
  
  player = createVector(0,0);
  enemy = createVector(width, height);
  
  for(let i = 0; i < 80; i++){
    flees[i] = createVector(startX + rc*spacer, startY);
    original[i] = createVector(startX + rc*spacer, startY);
    
    rc -= 1
    
    if(rc == 0){
      rc = 10; 
      startY += spacer;
      startX = width/2 - width/3 * 1.5;
    }
  }
  
  let f = original[floor(random(0, original.length -1))];
  findX = f.x;
  findY = f.y;
}

function draw() {
  background(300, 4, 22); //55, 53, 55
  
  //play song
//   if(song2.currentTime() >= song2.duration() - 0.1){
//      song2.play();
//   }
//   // print(song2.currentTime());
  
//   if(song1.currentTime() >= song1.duration() - 0.1){
//      song1.play();
//   }
  
  // draw score overhead
  text("score: " + score, 50, 50);
  
  
  // STATE MACHINE ----------------------------------------------------------------------------------------
  if(dead == 4){ //SHOW TITLE SCREEN
     cursor();
    background(334, 3, 93); //237, 230, 233
    
    titleScreen.size(1000, AUTO);
    titleScreen.position(0, 100);
    
    titleScreen.show();
  }
  else if(dead == 0){ //SHOW INTRODUCTION
    cursor();
    background(334, 3, 93); //237, 230, 233
    
    instruction.size(1000, AUTO);
    instruction.position(30, 100);
    
    instruction.show();
  }
  else if(dead == 2){ //SHOW GAME OVER
    cursor();
    
    // image(gameO, 0, 100);
    
    gameOverGif.size(950, AUTO);
    gameOverGif.position(75, 75);
    
    gameOverGif.show();
    
    // fill(300, 4, 22); //0, 150, 255    205, 100, 100
    
    //draw score + high score
    text("score: " + score, 50, 50);
    
    if(score > highScore){
       highScore = score;
    }
    
    textSize(30);
    text("high score: " + highScore, width - 220, 50);
    
  }
  else{ // SHOW GAME
    // if(scarySoundVolume <= 0.1){
    //    scarySoundVolume += 0.00005
    // }
    // song2.setVolume(scarySoundVolume);
    // print(scarySoundVolume);
    
    if(audioSpeed <= 10){
       audioSpeed += 0.0002
    }
    testAudio.speed(audioSpeed);
    
    // spawn enemy
    enemySprite.show();
    noCursor();
    
    // object to find
  fill(336, 100, 100); //255, 0, 100
  noStroke();
  ellipse(findX, findY, 30, 30);
  
  // player
  if(mouseX <= width){
     player.x = mouseX;
  }
  if(mouseY <= height){
     player.y = mouseY;
  }
  if(playerSize <= 40 && playerSize > 30){
     playerSaturation = 50;
  }
  else if(playerSize <= 30 && playerSize > 20){
      playerSaturation = 25;    
  }
  else if(playerSize <= 20 && playerSize > 10){
      playerSaturation = 10;    
  }
  else{
    playerSaturation = 100;
  }
  // print(playerSaturation);
  // print(playerSize);
  
  fill(336, playerSaturation, 100); //255, 0, 100
  noStroke();
  ellipse(player.x, player.y, playerSize, playerSize);
  
  // enemy
  fill(0, 4, 98); //250, 240, 240
  let dir = p5.Vector.sub(player, enemy);
  dir.normalize();
  dir.mult(enemySpeed);
  enemy.add(dir);
  // ellipse(enemy.x, enemy.y, enemySize, enemySize);
  enemySprite.size(enemySize, AUTO);
  enemySprite.position(enemy.x - 20, enemy.y - 20);
  
  // check if enemy hit player
  let enemyDist = player.dist(enemy) - playerSize/2;
  if (enemyDist < enemyHitThreshold){
      enemy.x = random(0, width);
      enemy.y = random(0, height);
      enemySize += 5;
      playerSize -= 10;
    
    hit.play();
    
    // check if player dies from this hit
    if(playerSize <= 10){
       gameOver();
    }
  }
  
  // fleeting balls
  for(let i = 0; i < flees.length; i++){
    flee = flees[i];
    og = original[i];
    let distBetween = player.dist(flee); //dist in pixels between them
    if (distBetween < 100){
      let dir = p5.Vector.sub(player, flee);
      dir.normalize();
      dir.mult(fleeSpeed);
      flee.sub(dir);
     }
    else if(flee.dist(og) > 5){
      let dirF = p5.Vector.sub(og, flee);
      dirF.normalize();
      dirF.mult(fleeSpeed);
      flee.add(dirF);
    }
    else if(flee.dist(og) <= 5){
       flee.x = og.x;
      flee.y = og.y;
    }
    if(flee.x > width){
       flee.x = width
    }
    if(flee.y > height){
       flee.y = height
    }
     if(flee.x < 0){
       flee.x = 10
    }
     if(flee.y < 0){
       flee.y = 10
    }
    
     // draws fleeing balls
    fill(205, 100, 100); //0, 150, 255
    noStroke();
    ellipse(flee.x, flee.y, 30, 30);
  }
  }
  
}

function mouseClicked(){
  if(dist(mouseX, mouseY, findX, findY) < 30){ // player finds pieces
    sfx.play();
     getNewLoc();
    playerSize += 5;
    score += 1;
    enemySpeed += 0.25;
    // print("changed");
  }
  if(mouseX < quit[2] && mouseX > quit[0] && mouseY < quit[1] && mouseY > quit[3] && dead == 2){ //quit game button
     quitGame();
  }
  if(mouseX < retry[2] && mouseX > retry[0] && mouseY < retry[1] && mouseY > retry[3] && dead == 2){ //retry game button
     retryGame();
  }
  console.log(mouseX, mouseY);
  
  // retry = [613, 761, 799, 697];
  
  // x1, y1, x2, y2
}

function keyPressed(){
  if (key === 'x') {
    quitGame();
  }
  if (key === 'z') { // show instructions
    dead = 0;
    enemySprite.hide();
  }
  else if(keyCode === ENTER && dead == 2){ // resets game
      retryGame();
  }
  else if(keyCode === ENTER && dead == 0){ // toggles/continues instructions screen
      dead = 1;
      instruction.hide();
  }
  else if(keyCode === ENTER && dead == 4){ // continues home screen
      dead = 0;
      titleScreen.hide();
  }
}

// function touchStarted(){
//   return false;
// }

function getNewLoc(){
  let f = original[floor(random(0, original.length -1))];
  // let f = original[1];
  findX = f.x;
  findY = f.y;
}

function gameOver(){
  dead = 2;
  enemySprite.hide();
  // quit.show();
  // retry.show();
}

function retryGame(){
  dead = 1;
  playerSize = 50;
  enemySize = 50; //20 for ellipse
  score = 0;
  enemySpeed = 4;
  audioSpeed = 1;
  enemyHitThreshold = 10;
  gameOverGif.hide();
  
  // quit.hide();
  // retry.hide();
}

function quitGame(){
  dead = 4;
}