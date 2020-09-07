class Particle{
    constructor(x,y){
        this.pos = createVector(random(width),random(height));
        this.target = createVector(x,y);
        // this.vel = createVector();
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 8;
        this.maxspeed = 10;
        this.maxforce = 1;
        this.col = {
            r: random(150,255),
            g: 52,
            b: random(150,255),
            a: 100
        }
    }

    behaviour(){
        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.applyForce(flee);
        this.applyForce(arrive);
    }
    applyForce(f){
        this.acc.add(f);
        

    }

    arrive(target){
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        let speed = this.maxspeed;
        if(d < 200){
            speed = map(d, 0,100,0, this.maxspeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    }
    
    
    flee(target){
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        if(d<50){
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        }else{
            return createVector(0,0);
        }
    }

    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show(){
        // stroke(240,0,0,100);
        stroke(this.col.r,this.col.g,this.col.b, 100);
        strokeWeight(5);
        fill(this.col.r,this.col.g,this.col.b, 100);
        // circle(this.pos.x, this.pos.y, 8);
        point(this.pos.x, this.pos.y);
    }

  
  }
  