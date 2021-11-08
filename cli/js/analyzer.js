let currentBallSpeed = 0;
let topBallSpeed = 0;
let score = {top:0,bottom:0};
function analyze(){
    let i = 1;
    let loop = setInterval(() => {
        checkGoal(i);
        ballSpeed(i);
        isTopSpeed(i);
        i++
        if(i>=trace.length-1){
            clearInterval(loop);
            cll('analysis done');
            setTimeout(() => {
                replay();
            }, 1000);
        }
    }, 1);//gotta go fast!
}

function checkGoal(i){
    //ball is close to top
    if(trace[i][0]===-1){
        if(trace[i-1][0]!==-1 && trace[i-1][1]<field.corners.tr.y+(Math.abs(field.corners.tl.y-field.corners.tr.y))+10){
            if(trace[i-1][0]>field.goal.tl.x && trace[i-1][0]<field.goal.tr.x){
                    cll(`goal top`);
                    trace[i-1].push([1,0]);
                    score.top+=1;            
            }else{
                trace[i-1].push([0,0]);
            }
        }else if(trace[i-1][0]!==-1 && trace[i-1][1]>field.corners.br.y-(Math.abs(field.corners.bl.y-field.corners.br.y))-10){//ball is close to bottom
            if(trace[i-1][0]>field.goal.bl.x && trace[i-1][0]<field.goal.br.x){
                cll(`goal bottom`);
                score.bottom+=1;
                trace[i-1].push([0,1]);
            }else{
                trace[i-1].push([0,0]);
            }
        }else{
            trace[i-1].push([0,0]);
        }
    }else{
        trace[i-1].push([0,0]);
    }
}

function ballSpeed(i){
    if(trace[i-1][0]!==-1 && trace[i][0]!==-1){
        currentBallSpeed = 8*Math.sqrt(((
            (trace[i-1][0]-trace[i][0])/(trace[i][2]-trace[i-1][2]))*1000*(.73/(field.corners.tr.x-field.corners.tl.x)))**2 +
            ((trace[i-1][1]-trace[i][1])/(trace[i][2]-trace[i-1][2])*1000*(1.4/(field.corners.bl.y-field.corners.tl.y)))**2);
        cll(`current speed ${i}: ${currentBallSpeed} m/s`);
        trace[i].push(currentBallSpeed);
    }  
}
function isTopSpeed(i){
    topBallSpeed = Math.max(currentBallSpeed, topBallSpeed);
    trace[i].push(topBallSpeed);
}

function avgSpeedInIndexInterval(a,b){
    let sum = 0;
    for(let i = a; i<b; i++){
        sum+=trace[i][3];
    }
    return sum/(b-a)
}
