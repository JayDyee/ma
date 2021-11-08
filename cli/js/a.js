let colorThreshold = 20;
let posSize = 30; // placeholder value
let refreshRate = 100;//in ms/cycle
let display, dispctx, videoIn;
display = document.getElementById("display");
dispctx = display.getContext("2d");
function init(){
    videoIn = document.getElementById("rawIn");
    dispctx.fillStyle = "red";
    initialize();
}

let settings = { resolution: 20 };

let minRed=150;maxRed=255;
let minGreen=0;maxGreen=100;
let minBlue=0;maxBlue=100;
let counter=0;
let trace = [];
let subtrace = [];
let field = {width:undefined,height:undefined, corners:{tl:undefined, tr:undefined, bl:undefined,br:undefined}, goal:{tr:undefined, tl:undefined, bl:undefined, br:undefined}};


let resolution = settings.resolution;
let coords = {};


let iniActive = false;
let tracking = false;
let calibrate = { clicks: 0, enaled: false };

function t(e){
    console.log(e.files);
    const [file] = e.files;
  if (file) {
    rawIn.src = URL.createObjectURL(file);
  }
  setTimeout(() => {
    init();
    processor.doLoad();
  }, 1000);
  
}

let processor = {
    doLoad: function() {
      this.video = document.getElementById("rawIn");
      document.getElementById("rawIn").playbackRate=1;
      var self = this;
  
      this.video.addEventListener("play", function() {
        self.width = display.width||100;
        self.height = display.height||100;
      }, false);
      dispctx.drawImage(videoIn, 0, 0, videoIn.width, videoIn.height);
    },
  
    computeFrame: function() {
      if (this.video.ended) {
        tracking=false;
              console.log(counter);
              counter=0;
              cll("end");
              analyze(trace);
            return
          }
        counter++;
        scan();
    return
  }
}  


async function initialize() {
    cll(`starting up...`);
    if (calibrate.enaled) {
        calibrate.clicks = 0;
        cll(`please click on the ball.`);
    } else {
        calibrate.clicks = 10;
        //read saved calibration file and start scan
        let cal = getCalibrationData().data;
        minRed = cal.red.minRed; maxRed = cal.red.maxRed;
        minGreen = cal.red.minGreen; maxGreen = cal.red.maxGreen;
        minBlue = cal.red.minBlue; maxBlue = cal.red.maxBlue;

        field.corners.tl = cal.landmarks.ctl;
        field.corners.tr = cal.landmarks.ctr;
        field.corners.bl = cal.landmarks.cbl;
        field.corners.br = cal.landmarks.cbr;

        field.goal.tl = cal.landmarks.gtl;
        field.goal.tr = cal.landmarks.gtr;
        field.goal.bl = cal.landmarks.gbl;
        field.goal.br = cal.landmarks.gbr;

        cll(JSON.stringify(field));
        cll(`ready`);
    }
    iniActive = true;
}


function renderFrame() {
      if(tracking){
          processor.computeFrame();
    }
    requestAnimationFrame(renderFrame);
}
requestAnimationFrame(renderFrame);


function start() {
    cll(`starting tracking...`);
    try {
        videoIn.play();
      } catch (error) {
        cll(error);
      }
    tracking=true;
    scan();
}

draw();