let pColor = null;
let mouse = { x: 0, y: 0 };
let landmarks = {cbl:{x:0,y:0},cbr:{x:null,y:null},ctl:{x:null,y:null},ctr:{x:null,y:null},gbl:{x:null,y:null},gtl:{x:null,y:null},gbr:{x:null,y:null},gtr:{x:null,y:null}};
//saving all edges and goel-corners. This could be interpolated from only the goal-corners with the given dimensions of the playfield
//or with just two or three corners.
function enableCalibMode() {
    calibrate.enaled = true;
    initialize();
}


function colorSpace(color) {
    return { min: Math.min(Math.max(parseInt(color - colorThreshold), 0), 255), max: Math.min(Math.max(parseInt(color + colorThreshold), 0), 255) };
}


function calibrate_continue(e) {
    if (!iniActive) {
        cll(`calibration has not been started`);
        return
    }
    mouse = { x: e.x - display.offsetLeft - sim.offsetLeft, y: e.y - sim.offsetTop };
    cll(`${e.x} ${e.y}`);
    switch (calibrate.clicks) {
        case 0://define ball color
            pColor = dispctx.getImageData(mouse.x, mouse.y, 1, 1).data;
            cll(`registered red as ${pColor} at ${mouse.x} ${mouse.y}`);
            red = colorSpace(pColor[0]);
            green = colorSpace(pColor[1]);
            blue = colorSpace(pColor[2]);
            minRed = red.min; maxRed = red.max;
            minGreen = green.min; maxGreen = green.max;
            minBlue = blue.min; maxBlue = blue.max;
            cll(`saving colorspace...`);
            cll(`red:${minRed} to ${maxRed} | green:${minGreen} to ${maxGreen} | blue:${minBlue} to ${maxBlue}`);
            cll(`please click on the bottom left corner of the playingfield`);
            calibrate.clicks++;
            break;
        case 1://define bottom left corner
            landmarks.cbl.x = mouse.x;
            landmarks.cbl.y = mouse.y;
            dispctx.fillStyle = "white"
            dispctx.fillRect(landmarks.cbl.x, landmarks.cbl.y,1,1)
            cll(`please click on the bottom right corner of the playingfield`);
            calibrate.clicks++;
            break;
        case 2://define bottom right corner
            landmarks.cbr.x = mouse.x;
            landmarks.cbr.y = mouse.y;
            dispctx.fillStyle = "white"
            dispctx.fillRect(landmarks.cbr.x, landmarks.cbr.y,1,1)
            cll(`please click on the top left corner of the playingfield`);
            calibrate.clicks++;
            break;
        case 3://define top left corner
            landmarks.ctl.x = mouse.x;    
            landmarks.ctl.y = mouse.y;
            dispctx.fillStyle = "white"
            dispctx.fillRect(landmarks.ctl.x, landmarks.ctl.y,1,1)
            cll(`please click on the top right corner of the playingfield`);
            calibrate.clicks++;
            break;
        case 4://define top right corner
            landmarks.ctr.x = mouse.x;    
            landmarks.ctr.y = mouse.y;
            dispctx.fillStyle = "white"
            dispctx.fillRect(landmarks.ctr.x, landmarks.ctr.y,1,1)
            cll(`please click on the bottom right goal-corner`);
            calibrate.clicks++;
            break;
        case 5://define goal bottom right
            landmarks.gbr.x = mouse.x;    
            landmarks.gbr.y = mouse.y;
            dispctx.fillStyle = "white"
            dispctx.fillRect(landmarks.gbr.x, landmarks.gbr.y,1,1)
            cll(`please click on the bottom left goal-corner`);
            calibrate.clicks++;
            break;
        case 6://define goal bottom left
            landmarks.gbl.x = mouse.x;    
            landmarks.gbl.y = mouse.y;
            dispctx.fillStyle = "white"
            dispctx.fillRect(landmarks.gbl.x, landmarks.gbl.y,1,1)
            cll(`please click on the top right goal-corner`);
            calibrate.clicks++;
            break;
        case 7://define goal top right
            landmarks.gtr.x = mouse.x;    
            landmarks.gtr.y = mouse.y;
            dispctx.fillStyle = "white"
            dispctx.fillRect(landmarks.gtr.x, landmarks.gtr.y,1,1)
            cll(`please click on the top left goal-corner`);
            calibrate.clicks++;
            break;
        case 8://define goal top left
            landmarks.gtl.x = mouse.x;    
            landmarks.gtl.y = mouse.y;
            dispctx.fillStyle = "white"
            dispctx.fillRect(landmarks.gtl.x, landmarks.gtl.y,1,1)
            cll(`calibration complete, reload the page!`);
            calibrate.clicks++;
            saveCalibration();
            break;
        default:
            cll(`error: wut?(${calibrate.clicks})`);
            break;
    }
}


function saveCalibration() {
    let data = { red: { minRed: minRed, maxRed: maxRed, minGreen: minGreen, maxGreen: maxGreen, minBlue: minBlue, maxBlue: maxBlue }, landmarks: landmarks};
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/calibrate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        data: data
    }));
    cll(`calibration complete. Reload the Page`);
}

