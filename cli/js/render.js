function draw() {
    dispctx.fillStyle = "white";
    dispctx.fillRect(0, 0, display.width, display.heigth);
    dispctx.fillStyle = "black";
    dispctx.fillRect(0, 0, posSize * resolution, posSize * resolution);
    dispctx.fillStyle = "hotpink";
    for (let i = 0; i <= resolution; i++) {
        dispctx.fillRect(posSize * i, 0, 1, posSize * resolution);
    }
    for (let i = 0; i <= resolution; i++) {
        dispctx.fillRect(0, posSize * i, posSize * resolution, 1);
    }
    if (tracking === false) {
        dispctx.fillStyle = "hotpink";
        dispctx.font = "42px sans-serif";
        dispctx.fillText("No Signal :(", 150, 250);
    }
}


