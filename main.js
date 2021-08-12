function setup(){
    canvas=createCanvas(500,400)
    // canvas.position(490,290);
    canvas.center();   
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video,0,0,500,400)
    if(status!=""){
        objectDetector.detect(video,gotResult);
        input=document.getElementById("input").value;
        for(i=0; i<objects.length; i++){
            if(objects[i].label == input){
            document.getElementById("status").innerHTML="Status : Objects Detected"
            // document.getElementById("number").innerHTML = "Number of Objects : "+objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x+15,objects[i].y+15)
            noFill();
            stroke("#FF0000")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            }
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects"
}
function modelLoaded() {
    console.log("Model loaded")
    status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        objects = results;
    }
}
status="";
objects=[];
input="";
