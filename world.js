class Point{
    constructor(p=createVector(0,0),n=65){

        this.x=p.x //world coords
        this.y=p.y
        
        this.name=n
        this.selected=false
        this.showen=true
        this.col='blue'
        
    }
    set p(e){
        p=e
    }

    get p(){
        return createVector(this.x,this.y)
    }
    get X(){
        //screen coords
        return world.fromWorldToScreen(this.x,this.y).x
    }   
    get Y(){
        return world.fromWorldToScreen(this.x,this.y).y
    }
    highLight(){
                
        stroke(203,200,255)

        strokeWeight(13)

        point(this.X,this.Y)
    }
    show(){
        
        stroke(0)
        strokeWeight(0)
        text(String.fromCharCode(this.name),this.X+5,this.Y-5)
   
        stroke(this.col)
        strokeWeight(8)

        point(this.X,this.Y)
    }
}
class World{
    constructor(){
        this.SHOWGRID=true
        this.SHOWAXIS=true
        this.Origine=createVector(w/2,w/2)
        this.i=createVector(20,0)
        this.j=createVector(0,-20)
        this.I=createVector(1,0)
        this.J=createVector(0,1)

        this.points=[]
        this.pNames=65 //fromCharCode
        this.Zoom=1

        this.AX=new Axe(this.Origine,1)
        this.AY=new Axe(this.Origine,0)
        this.pointIsSelected=false
        

    }
    zoom(e){

        this.i.mult(exp(e))  
        this.j.mult(exp(e))   
    }
    showGrid(){

        if (this.SHOWGRID) {
            stroke(110)
            strokeWeight(0.3)
            let k,offsit
            for (let i = 0; i < w/this.i.x; i++) {
                offsit=this.Origine.x%this.i.x

                k=i*this.i.x+offsit

                line(k,0,k,w)
                
                
            }

            for (let i = 0; i> w/this.j.y; i--) {
                offsit=this.Origine.y%abs(this.j.y)

                k=i*this.j.y+offsit

                line(0,k,w,k)
                
                
            }


        }
    }
    showAxis(){

        if (this.SHOWAXIS) {
            stroke(21)
            strokeWeight(3)

            this.AX.show()
            this.AY.show()
        }

    }

    show(){
        this.showGrid()
        this.showAxis()
        this.points.forEach(p => {
            p.show()
            
        });
    }

    addPoint(x,y){
        
        this.points.push(new Point(this.fromScreenToWorld(x,y),this.pNames))
        this.pNames++

    }
    Xtox(X){
        return (X-this.Origine.x)/this.i.x
    }

    xtoX(x){
        return (x*this.i.x+this.Origine.x)
    }

    Ytoy(Y){
        return (Y-this.Origine.y)/this.j.y
    }

    ytoY(y){
        return (y*this.i.y+this.Origine.y)
    }
    fromScreenToWorld(X,Y){
        // a fun that takes two screen coords X,Y
        // to transfer it to world coords  x,y
        let v=createVector(X,Y).sub(this.Origine)

        return createVector(v.x/this.i.x,v.y/this.j.y)

    }
    fromWorldToScreen(x,y){
        // a fun that takes two  world coords x,y
        // to transfer it to screen coords X,Y 

        let X= x*this.i.x, Y=y*this.j.y

       return createVector(X,Y).add(this.Origine)

         

    }
}

class Axe{
    constructor(o,x=1){
        this.O=o
        this.dir=0
        this.isX=x
    }

    show(){
       if(this.isX){
        line(0,this.O.y,w,this.O.y)
       } 
       else{
        line(this.O.x,0,this.O.x,w)
       }
        
    }
}