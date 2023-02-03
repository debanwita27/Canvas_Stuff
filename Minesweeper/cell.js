
function Cell(i,j,w){
    cursor(HAND);
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;
    this.neighborCount = 0;
    if(random(1) < 0.15){
        this.mine = true;
    }
    else{
        this.mine = false;
    }
    this.revealed = false;
}

Cell.prototype.show = function(){
    stroke(50);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed){
        if(this.mine){
            fill(125);
            ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5);
        }
        else{
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if(this.neighborCount>0){
                textAlign(CENTER);
                fill(0);
                text(this.neighborCount, this.x + this.w*0.5, this.y + this.w*0.5);
            }
        }
    }
} 

Cell.prototype.countMines = function(){
    if(this.mine){
        return -1;
    }
    let total = 0;
    for(let xoff=-1; xoff<=1; xoff++){
        for(let yoff=-1; yoff<= 1; yoff++){
            let i = this.i + xoff;
            let j = this.j + yoff; 
            if(i>-1 && i<cols && j>-1 && j<rows){
                let neighbor = grid[i][j];
                if(neighbor.mine){
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.reveal = function(){
    this.revealed = true;
    if(this.neighborCount == 0){
        //flood fill
        this.floodFill();
    }
}

Cell.prototype.floodFill = function(){
    for(let xoff=-1; xoff<=1; xoff++){
        for(let yoff=-1; yoff<= 1; yoff++){
            let i = this.i + xoff;
            let j = this.j + yoff; 
            if(i>-1 && i<cols && j>-1 && j<rows){
                let neighbor = grid[i][j];
                if(!this.mine &&!neighbor.revealed){
                    neighbor.reveal();
                }
            }
        }
    }
}

