let cl = document.getElementById("cl");//gui-console
let clDiv = document.getElementById("clD");
let clLen = 0;
//cll: gui-console.log()


function cll(t) {
    
    if (clLen >= 200) {
        cl.removeChild(cl.childNodes[0]);
        clLen--;
    }
    cl.append(`>${t}\n\r`);
    clDiv.scrollTo(0, 10000);
    clLen++;
}
