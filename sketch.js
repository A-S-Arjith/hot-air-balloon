var balloon,bg,ballonImg;
var database, position;

function preload() {
    bg=loadImage("pics/1.png");
    balloonImg=loadAnimation("pics/2.png","pics/3.png","pics/4.png");
    }

function setup() {
    createCanvas(1000, 1000);
    database = firebase.database();

    balloon = createSprite(250, 800, 10, 10);
    balloon.addAnimation("balloon",balloonImg)

    var balloonPositionRef = database.ref('Balloon/position');
    balloonPositionRef.on("value", readPosition, showError);
}

function draw() {
    background(bg);
    console.log(position);
    if(position !== undefined){
        if (keyDown(UP_ARROW)&&balloon.scale>0) {
            writePosition(0, -1);
            balloon.scale=balloon.scale-0.01;
        }
        else if (keyDown(DOWN_ARROW)) {
            writePosition(0, 1);
            balloon.scale=balloon.scale+0.01;
        }
        drawSprites();
    }
    
}

function writePosition(x, y) {
    database.ref('Balloon/position').set({
        'x': position.x + x,
        'y': position.y + y
    });
}

function readPosition(data) {
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError() {
    console.log('Error in readin DB(database)');
}