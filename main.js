var noseX = 0;
var noseY = 0;
var appleX = 0;
var appleY = 0;
var score = 0;
var glassX = 0;
var glassY = 0;
var glassTrue = "";

function preload() {
img = loadImage("apple.png");
nose = loadImage("basket.png");
glasses = loadImage("glases.png");
}
function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    cam = createCapture(VIDEO);
    cam.hide();
    cam.size(500, 500);
    poseNet = ml5.poseNet(cam, modelLoaded);
    poseNet.on("pose", gotPoses);
    loop();
}
function modelLoaded() {
    console.log("model loaded");
}
function draw() {
    image(cam, 0, 0, 500, 500);
    let d = int(dist(appleX, appleY, noseX, noseY));
    image(nose, noseX -55, noseY -30, 100, 70);
    fill("red");
    image(img, appleX -10, appleY -10, 30, 30)
    if(glassTrue == "true")
    {
       image(glasses, glassX -35, glassY -15, 120, 50); 
    }
    
    fill("brown");
    if (d < 30) {
        console.log("hit");
        spawner();
        check();
    }
    rect(0, 499, 500, 50);
    if(appleY  > 499)
    {
        spawner();
        console.log("hit");
        lose();
    }
    

}
function saveImage() {
    save("Image.png");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        glassX = results[0].pose.rightEye.x;
        glassY = results[0].pose.rightEye.y;
    }

}
(function loop() {
    setTimeout(function () {
        // execute script
        gravity()
        loop()
        check2()
    }, 30); //9000 = 9000ms = 9s
}());

function spawner() {
    appleX = Math.random() * 300;
    appleY = Math.random() * 300;
    
}

function gravity()
{
    appleY = appleY + 0.5;
}
function check()
{
    score = score + 1;
    document.getElementById("score").innerHTML = score; 
}
function check2()
{
if(score == 20)
{
    document.getElementById("score").innerHTML = "You Got 20 Apples"; 
    glassTrue = "true";
}
}
function lose()
{
    score = score - 1;
    document.getElementById("score").innerHTML = score; 
}