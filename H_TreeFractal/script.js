const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let curve;//random curve for branches every time

function drawTree(startX,startY,len,angle,branchWidth,color1,color2){
    //x and y are coordinates of the first point aka point from which tree will be growing,
    // length of first line(length of 1 tree segment), angle between two lines(90 deg for perfect Hs)
    //how thick the tree is, color of branches, color of leaves

    ctx.beginPath();
    ctx.save();//saves state and pushes onto stack
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'rgba(255,255,255,.5)';
    ctx.lineWidth = branchWidth;
    ctx.translate(startX,startY);//moves canvas based on the x and y values
    ctx.rotate(angle * Math.PI/180);//rotates angle based on the value we pass. Accepts values in radians
    ctx.moveTo(0,0);//begins a new subtask at the point specified. 0,0 works coz we already moved canvas to the point using translate

    //ctx.lineTo(0,-len);
    //instead of drawing a straight line for branch, can also use curves
    if(angle > 0){
        ctx.bezierCurveTo(10, -len/2, 10, -len/2, 0, -len );
    }else{
        ctx.bezierCurveTo(10, -len/2, -10, -len/2, 0, -len );
    }//curves to the right curve rightward and left curve leftward sp +10 and -10
       

    ctx.stroke();

    if(len < 5){
                        /*leaves*/
        ctx.beginPath();
        ctx.arc(0,-len,10,0,Math.PI/2);//begin drawing leaves from where the branches end
        //x,y,radius of circle aka sizeof leaves, start angle, end angle
        ctx.fill();

        //recursive function keeps rendering but computer cannot keep doing that
        //so stop at 10 pixels
        ctx.restore();//restores drawing state to most recently saved state on stack
        return;//stops the recursion
    }
    curve = (Math.random()*30 )+ 10;//randomise between 10 and 40
    drawTree(0, -len , len*0.75 , angle+curve, branchWidth*0.6);//len*0.75 since slightly shorter this time
    drawTree(0, -len , len*0.75 , angle-curve, branchWidth*0.6);//+5 and -5 creates a fork in Y shape
    //branch width will be half the thickness each time
    ctx.restore();//put to original state after all the translate and rotate calls
}

function generateRandomTree(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
//  startX,startY,len,angle,branchWidth,color1,color2
//  startX and startY are hardcoded values since tree always begins from the same place
    var len = Math.floor((Math.random() * 20) + 100);//length of segment is anywhere between 100 to 120
//  angle is randomised already so pass 0 here
    let branchWidth = (Math.random() * 50) + 1;
// colors will be randomised from 0 to 255; eg. 'rgb(123,123,123)'
    let color1 = 'rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')' ;

    let color2 = 'rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')' ;
    drawTree(canvas.width/2,canvas.height-80 , len , 0 , branchWidth, color1, color2) ;

}

generateButton.addEventListener('click', generateRandomTree);
