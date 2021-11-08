let goalDisplayHeight = 5;
let statsLable = document.getElementById("stats");
let replayspeed = 1;
let animatedScore = [0,0];
let r;
function replay(){
    let n = 1
    r = setInterval(() => {
        dispctx.fillStyle="white";
        dispctx.fillRect(0,0,2000,2000);
        if(trace[n][0]!==-1){
            animatedScore[0]+=trace[n][trace[n].length-1][0];
            animatedScore[1]+=trace[n][trace[n].length-1][1];
            if(isNaN(animatedScore[0]) || isNaN(animatedScore[1])){
                console.log(n);
            }
        }
        drawField(n);
        dispctx.fillStyle="green";
        dispctx.fillRect(trace[n][0]-5,trace[n][1]-5,5,5);
        n++;
        if(trace.length==n+1){
            clearInterval(r);
        }
    }, (1000/30)/8);
  };

function drawField(n){
    dispctx.fillStyle = "darkgreen";
    statsLable.innerText = `top speed: ${trace[n][4]} | current speed: ${trace[n][3]}`;
    dispctx.fillStyle = "gray";
    dispctx.beginPath();
    dispctx.moveTo(field.corners.tl.x,field.corners.tl.y);
    dispctx.lineTo(field.corners.bl.x,field.corners.bl.y);
    dispctx.lineTo(field.corners.br.x,field.corners.br.y);
    dispctx.lineTo(field.corners.tr.x,field.corners.tr.y);
    dispctx.lineTo(field.corners.tl.x,field.corners.tl.y);
    dispctx.closePath();
    dispctx.stroke();
    dispctx.fillRect(field.goal.bl.x, field.goal.bl.y+goalDisplayHeight, field.goal.br.x-field.goal.bl.x, field.goal.br.y-field.goal.bl.y-goalDisplayHeight);
    dispctx.fillRect(field.goal.tl.x, field.goal.tl.y+goalDisplayHeight, field.goal.tr.x-field.goal.tl.x, field.goal.tr.y-field.goal.tl.y-goalDisplayHeight);
    dispctx.font = "20px sans-serif";
    dispctx.fillText(`Score-> Top: ${animatedScore[0]} // Bottom: ${animatedScore[1]}`, 10, 50);
};