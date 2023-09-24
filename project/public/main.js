
// https://docs.google.com/spreadsheets/d/1vFmPb0Q7fCb5MWL4NTcCh001ABJR2qvu2umFBYY2tfU/edit#gid=0
var OVERSHOOTSTATS = {
    "Austria": {
        overshootDay: "6. April",
        overshootTime: "6:19",
        timeSwitchHour: 6,
        timeSwitchMinute: 19,
    }
}

let TITLE = "afraid to fry";
let ARTIST = "Stefan Schwaha, @sektionschef";
let DESCRIPTION = "javascript on html canvas";
let WEBSITE = "https://digitalitility.com";
let YEAR = "2023";
let PRICE = "ꜩ 4";
let EDITIONS = "100 editions";

let OVERSHOOT = "start";
var drawing = "";

// let RESOLUTIONBOXCOUNT = 160;
let RESOLUTIONBOXCOUNT = 80;
// let RESOLUTIONBOXCOUNT = 60;
// let RESOLUTIONBOXCOUNT = 40;
let BACKGROUNDTONE = "#ffffff";
let BASETONE = "#b8b8b8";
// let ABOVETONE = "#a5812f";  // andrea garden book
// let BELOWTONE = "#ff617b";  // andrea garden book
// let ABOVETONE = "#92a8b4" // blue
// let BELOWTONE = "#8b967d"; // green

// let ABOVETONE = "#98a0a7";  // good - twitter
// let BELOWTONE = "#515a57";  // good - twitter
// let ABOVETONE = "#4b6786";  // overshoot - cool color: d5560c
// let BELOWTONE = "#7e614f";  // overshoot 
// let ABOVETONE = "#8dacc9";  // full blue
let ABOVETONE = "#b1beca";
let BELOWTONE = "#a7afb4";  // overshoot 

// TRUE BASE TONE
let BASETONEA = BASETONE;
let BASETONEB = BASETONE;
let BASETONEC = BASETONE;
let BASETONED = BASETONE;
let BASETONEE = BASETONE;


// YELLOW
// let DETAILTONEA = "#ffdda1";
// let DETAILTONEB = "#ffd151";
// let DETAILTONEC = "#f8c537";
// let DETAILTONED = "#edb230";
// let DETAILTONEE = "#e77728";

// let ABOVETONEA = tinycolor(DETAILTONEA).darken(15);
// let ABOVETONEB = tinycolor(DETAILTONEB).darken(15);
// let ABOVETONEC = tinycolor(DETAILTONEC).darken(15);
// let ABOVETONED = tinycolor(DETAILTONED).darken(15);
// let ABOVETONEE = tinycolor(DETAILTONEE).darken(15);

// blue
// let DETAILTONEA = "#0f3e50";
// let DETAILTONEB = "#1e4e5f";
// let DETAILTONEC = "#437080";
// let DETAILTONED = "#4f8597";
// let DETAILTONEE = "#78a3b1";

// blue grey
// let DETAILTONEA = "#71a3bd";
// let DETAILTONEB = "#557f94";
// let DETAILTONEC = "#3c4a52";
// let DETAILTONED = "#506b79";
// let DETAILTONEE = "#8da1ac";

// dark blue - A
let DETAILTONEA = ABOVETONE;
let DETAILTONEB = ABOVETONE;
let DETAILTONEC = ABOVETONE;
let DETAILTONED = ABOVETONE;
let DETAILTONEE = ABOVETONE;


// green
// let DETAILTONEBELOWA = "#83781B";
// let DETAILTONEBELOWB = "#95B46A";
// let DETAILTONEBELOWC = "#709255";
// let DETAILTONEBELOWD = "#3E5622";
// let DETAILTONEBELOWE = "#172815";

// green - strong
// let DETAILTONEBELOWA = "#5aa376";
// let DETAILTONEBELOWB = "#79a854";
// let DETAILTONEBELOWC = "#659B5E";
// let DETAILTONEBELOWD = "#556F44";
// let DETAILTONEBELOWE = "#3b6644";

// green - grey
// let DETAILTONEBELOWA = "#7e9e8a";
// let DETAILTONEBELOWB = "#889e76";
// let DETAILTONEBELOWC = "#758a72";
// let DETAILTONEBELOWD = "#58795e";
// let DETAILTONEBELOWE = "#565e51";

// blue grey
// let DETAILTONEBELOWA = "#71a3bd";
// let DETAILTONEBELOWB = "#557f94";
// let DETAILTONEBELOWC = "#3c4a52";
// let DETAILTONEBELOWD = "#506b79";
// let DETAILTONEBELOWE = "#8da1ac";

// // yellow
// let DETAILTONEBELOWA = "#ffdda1";
// let DETAILTONEBELOWB = "#ffd151";
// let DETAILTONEBELOWC = "#f8c537";
// let DETAILTONEBELOWD = "#edb230";
// let DETAILTONEBELOWE = "#e77728";

// dark blue - A
// let DETAILTONEBELOWA = "#63788d";
// let DETAILTONEBELOWB = "#63788d";
// let DETAILTONEBELOWC = "#63788d";
// let DETAILTONEBELOWD = "#63788d";
// let DETAILTONEBELOWE = "#63788d";

// blue - light as a bird
let DETAILTONEBELOWA = BELOWTONE;
let DETAILTONEBELOWB = BELOWTONE;
let DETAILTONEBELOWC = BELOWTONE;
let DETAILTONEBELOWD = BELOWTONE;
let DETAILTONEBELOWE = BELOWTONE;


setTagsHTML();

Math.random = fxrand;
noise.seed(fxrand());

let BULK = false;  // bulk export images

canvasFormats = [
    // {
    //   "name": "1:1",
    //   "canvasWidth": 800,
    //   "canvasHeight": 800,
    // },
    {
        "name": "16:9",
        "canvasWidth": 1600,
        "canvasHeight": 900,
    },
    // {
    //     "name": "16:9",
    //     "canvasWidth": 900,
    //     "canvasHeight": 1600,
    // },
]

canvasFormatChosen = getRandomFromList(canvasFormats);
// console.log("Canvas Format: " + canvasFormatChosen.name);

rescaling_width = canvasFormatChosen.canvasWidth;
rescaling_height = canvasFormatChosen.canvasHeight;

if (rescaling_width <= rescaling_height) {
    SHORTSIDE = rescaling_width;
    LONGSIDE = rescaling_height;
    LANDSCAPE = false;
} else {
    SHORTSIDE = rescaling_height;
    LONGSIDE = rescaling_width;
    LANDSCAPE = true;
}

window.addEventListener("DOMContentLoaded", (event) => {
    // console.log("DOM fully loaded and parsed");

    const targetDiv = document.getElementById('badAssCanvas');
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgNode.setAttributeNS(null, 'viewBox', '0 0 ' + canvasFormatChosen.canvasWidth + " " + canvasFormatChosen.canvasHeight);
    svgNode.setAttributeNS(null, 'id', 'svgNode');
    targetDiv.appendChild(svgNode);

    // draw RECT as background !!
    var backgroundObj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    backgroundObj.setAttribute("width", canvasFormatChosen.canvasWidth);
    backgroundObj.setAttribute("height", canvasFormatChosen.canvasHeight);
    // backgroundObj.setAttribute("fill", "#ffffff");
    backgroundObj.setAttribute("fill", BACKGROUNDTONE);


    // filter know how: https://stackoverflow.com/questions/10867282/how-can-i-add-a-filter-to-a-svg-object-in-javascript 
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "f1");
    filter.setAttribute("x", "0");
    filter.setAttribute("y", "0");

    // var gaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    // gaussianFilter.setAttribute("in", "SourceGraphic");
    // gaussianFilter.setAttribute("stdDeviation", "1");

    var turbo = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
    turbo.setAttribute("type", "fractalNoise");
    turbo.setAttribute("baseFrequency", "0.102");
    turbo.setAttribute("numOctaves", "4");
    // turbo.setAttribute("seed", "15");
    turbo.setAttribute("stitchTiles", "stitch");
    // turbo.setAttribute("result", "NOISE");
    turbo.setAttribute("result", "turbulence");


    // <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700"><defs><filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
    // <feTurbulence type="fractalNoise" baseFrequency="0.102" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
    // <feSpecularLighting surfaceScale="15" specularConstant="0.75" specularExponent="20" lighting-color="#7957A8" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
    // 		<feDistantLight azimuth="3" elevation="100"></feDistantLight>
    // </feSpecularLighting>
    // </filter></defs><rect width="700" height="700" fill="transparent"></rect><rect width="700" height="700" fill="#7957a8" filter="url(#nnnoise-filter)"></rect></svg>


    var blender = document.createElementNS("http://www.w3.org/2000/svg", "feBlend");
    blender.setAttribute("in", "SourceGraphic");
    blender.setAttribute("in2", "NOISE");
    blender.setAttribute("mode", "overlay");
    blender.setAttribute("result", "BLEND");


    // filter.appendChild(gaussianFilter);
    filter.appendChild(turbo);
    filter.appendChild(blender);
    defs.appendChild(filter);
    svgNode.appendChild(defs);

    backgroundObj.setAttribute("filter", "url(#f1)");
    // svgNode.appendChild(backgroundObj);

    timeChecker();

    // svgNode.setAttribute("filter", "url(#f1)");

    // ELEMENT
    // new dynamicPalette("#617061", 5, 10, 10).show();
    // new dynamicPalette("#7f9189", 5, 25, 10).show();
});



// REALLY SVG.on ??
// SVG.on(document, 'DOMContentLoaded', function () {

// Add event listener on keydown -  https://www.section.io/engineering-education/keyboard-events-in-javascript/ 
document.addEventListener('keydown', (event) => {

    if (event.code == "KeyE") {
        var filename = TITLE + "_" + fxhash + "_" + getTimestamp() + ".svg";
        // alert("oida is going down");
        // downloadString(drawing.svg(), "image/svg+xml", filename);

        saveSvg(svgNode, filename);
    }

    // Alert the key name and key code on keydown
    // var name = event.key;
    // var code = event.code;
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);

}, false);
// })


function fireTrigger(drawing) {
    console.log("trigger initiated");

    // drawing.clear();

    // background
    // drawing.rect(rescaling_width, rescaling_height).fill("#ffffff");

    let grid = new Grid({
        drawing: drawing,
        // shortBoxCount: 40,
        // shortBoxCount: 80,
        shortBoxCount: RESOLUTIONBOXCOUNT,
        // shortBoxCount: 100,
        // shortBoxCount: 160,
        overshoot: OVERSHOOT,
    });
}


function timeChecker() {

    let switchHour = OVERSHOOTSTATS[$fx.getParam("country_id")].timeSwitchHour;
    let switchMinute = OVERSHOOTSTATS[$fx.getParam("country_id")].timeSwitchMinute;

    var today = new Date();
    let currentHour = today.getHours();
    let currentMinute = today.getMinutes();
    // console.log(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
    // console.log("listening to: " + switchHour + ":" + switchMinute);

    if (currentHour >= switchHour || (currentHour == switchHour && currentMinute >= switchMinute)) {
        if (OVERSHOOT == false || OVERSHOOT == "start") {
            console.log("overshoot!")
            OVERSHOOT = true;
            fireTrigger(drawing);
        }
        else {
            // console.log("nothing to do");
        }
    } else {
        if (OVERSHOOT == true || OVERSHOOT == "start") {
            console.log("no overshoot!")
            OVERSHOOT = false;
            fireTrigger(drawing);
        }
        else {
            // console.log("nothing to do");
        }
    }
    // console.log("Overshoot: " + OVERSHOOT);
}


// setInterval(timeChecker, 1000 * 60 * 1); // every minute check
// setInterval(timeChecker, 1000); // every second