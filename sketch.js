let world,w=600

let gg=document.querySelector("#grid")
let canvas

function setup() {
    canvas=createCanvas(w,w)
    world=new World()
    canvas.position(0,0)

}
function draw() {
    background(253)

        checkselection()
    world.show()


}
function checkselection(){
    world.points.forEach(p => {
        if ( ( mouseX-p.X)**2+ ( mouseY-p.Y)**2<25 ) {
            p.highLight()
            if (mouseIsPressed) {
                p.selected=true
                world.pointIsSelected=true
            }
        }       
    });
}
function toggleGrid() {
    world.SHOWGRID=!world.SHOWGRID
}

function toggleAxis() {
    world.SHOWAXIS=!world.SHOWAXIS
}
function mouseDragged(e) {

    
    if (mouseIsPressed && world.pointIsSelected) {
        
        world.points.forEach(p => {
            if (p.selected ) {
            p.x=world.Xtox(mouseX)
            p.y=world.Ytoy(mouseY)

            }       
        });
        
    }else{
        world.Origine.add(movedX,movedY)
        
    }
}
function mouseWheel(e) {
    world.zoom(-e.delta/1000)
}

function mouseClicked(e) {

    if (keyIsDown(CONTROL) ){
        console.log(e.x,e.y);
        world.addPoint(e.x,e.y)
    }
}
