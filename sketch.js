let font;
function preload(){
    font = loadFont('Handlee-Regular.ttf')
}
var input;
let particles = []
function setup() {
    let canv = createCanvas(800,400);
    canv.position(100,50)
    background(255);
    input = createInput();
    input.position(425,25);
    input.changed(newText);
    let points = font.textToPoints('OWO', width/4-100, height/2+100,100);
    
    for(let i=0;i<points.length;i++){
        let pt = points[i];
        let particle = new Particle(pt.x, pt.y)
        particles.push(particle);        
    }
}
function newText(){
    change(input.value());
    // console.log();
}

let arr;
function change(text){
    arr = []
    let points = font.textToPoints(text, width/4-100, height/2+100,150);

    for(let i=0;i<points.length;i++){
        let pX;
        if(i<particles.length){
            pX = particles[i];
        }else{
            pX = new Particle(particles[0].pos.x, particles[0].pos.y);
        }
        let ch = points[i];
        pX.target = createVector(ch.x, ch.y);
        arr.push(pX) 
    }
    particles = arr;
}



function draw() {
    background(240);
    for(let i=0;i<particles.length;i++){
        let p = particles[i];
        p.behaviour(); 
        p.update();
        p.show();  
            
    }
}

function mousePressed(){
    // change("Yeah");
}

function mouseDragged(){

}


