let n = 0;

function scan(){
    dispctx.drawImage(videoIn, 0, 0, videoIn.width, videoIn.height);
    ///////////////////////
    //TEST RANDOM JUMPING
    // dispctx.fillStyle = "white";
    // dispctx.fillRect(0,0,500,500);
    // dispctx.fillStyle = "#C86428";
    // dispctx.fillRect(200+100*Math.random(),200+100*Math.random(),3,3);
    ///////////////////////

    // dispctx.fillStyle = "white";
    // dispctx.fillRect(0,0,500,500);
    // dispctx.fillStyle = "#C86428";
    // dispctx.fillRect(n,n,3,3);
    // n+=1;
    // if(n>=450)n=0;
    /////////////////////////////////////
        let frame = dispctx.getImageData(0, 0, videoIn.width, videoIn.height);
        let l = frame.data.length / 4;
    
        for (let i = 0; i < l; i++) {
          if(frame.data[i*4]>minRed &&
            frame.data[i*4]<maxRed &&
            frame.data[i*4 + 1]>minGreen &&
            frame.data[i*4 + 1]<maxGreen &&
            frame.data[i*4 + 2]>minBlue &&
            frame.data[i*4 + 2]<maxBlue){

              frame.data[i*4] = 255;
              frame.data[i*4 + 1] = 0;
              frame.data[i*4 + 2] = 0;
              m = (i)%videoIn.width;
              subtrace.push([m,Math.floor((i)/videoIn.width)]);
            }else{
              frame.data[i*4] *= 0.3;
              frame.data[i*4 + 1] *= 0.3;
              frame.data[i*4 + 2] *= 0.3;
            }
          }
          n1=0;
          n2=0;
          dispctx.putImageData(frame, 0, 0);
          subtrace.forEach(e => {
            n1+=e[0];
            n2+=e[1];
      });
      if(subtrace.length==0){
        cll(`no mathicng pixle, continue`);

      }else{
        if(n1 != 0 && n2 != 0){
          probableX = Math.floor(n1/subtrace.length);
          probableY = Math.floor(n2/subtrace.length);
          validX = null;
          validY = null;
          if(probableX>=field.corners.bl.x && probableX<=field.corners.br.x){
            validX = probableX;
          }
          if(probableY>=field.corners.tr.y && probableY<=field.corners.br.y){
            validY = probableY;
          }
          if(validX && validY){
            // if(trace[n-1][0]!=validX || trace[n-1][1]!=validY){
              trace.push([validX,validY, Date.now()]);
              n++;
            // }
          }else{
            cll(`out of bounds`);
            trace.push([-1,-1,Date.now()]);
            n++;
          }
          subtrace = [];
        }else{
          cll(`no change`);
        }
      }
  }