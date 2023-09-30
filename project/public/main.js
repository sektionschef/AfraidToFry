
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
let BELOWTONE = "#8ca7b9";  // overshoot 

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

    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.setAttributeNS(null, 'id', 'defs');
    svgNode.appendChild(defs);

    // draw RECT as background !!
    var backgroundObj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    backgroundObj.setAttribute("id", "backgroundObj");
    backgroundObj.setAttribute("width", canvasFormatChosen.canvasWidth);
    backgroundObj.setAttribute("height", canvasFormatChosen.canvasHeight);
    // backgroundObj.setAttribute("fill", "#ffffff");
    backgroundObj.setAttribute("fill", BACKGROUNDTONE);
    svgNode.appendChild(backgroundObj);

    var groupDrawing = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupDrawing.setAttribute("id", "drawing");
    // svgNode.appendChild(groupDrawing);
    defs.appendChild(groupDrawing);


    // var nerdGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    // nerdGroup.setAttribute("id", "nerdGroup");
    // defs.appendChild(nerdGroup);
    // var nerdCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // nerdCircle.setAttribute('id', "nerdCircle");
    // nerdCircle.setAttribute('cx', "400");
    // nerdCircle.setAttribute('cy', "400");
    // nerdCircle.setAttribute('r', "150");
    // nerdGroup.appendChild(nerdCircle);
    // var newnerdGroup = document.createElementNS("http://www.w3.org/2000/svg", "use");
    // newnerdGroup.setAttribute("id", "newnerdGroup");
    // newnerdGroup.setAttribute("href", "#nerdCircle");


    timeChecker();

    // svgNode.setAttribute("filter", "url(#f1)");

    // ELEMENT
    // new dynamicPalette("#617061", 5, 10, 10).show();
    // new dynamicPalette("#7f9189", 5, 25, 10).show();



    // TRY MASK
    // var maskRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    // maskRect.setAttribute('x', "10");
    // maskRect.setAttribute('y', "10");
    // maskRect.setAttribute('height', "400");
    // maskRect.setAttribute('width', "500");
    // maskRect.setAttribute('fill', 'white'); // <!-- Everything under a white pixel will be visible -->

    // var maskCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // maskCircle.setAttribute('cx', "100");
    // maskCircle.setAttribute('cy', "100");
    // maskCircle.setAttribute('r', "50");
    // maskCircle.setAttribute('fill', 'black'); // <!-- Everything under a black pixel will be invisible -->

    // // const defs = document.getElementById('defs');
    // var maskNoise = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    // maskNoise.setAttribute("id", "MaskNoise");
    // // maskNoise.setAttribute("maskUnits", "userSpaceOnUse");
    // maskNoise.setAttribute("x", "0");
    // maskNoise.setAttribute("y", "0");
    // maskNoise.setAttribute("width", "100%");
    // maskNoise.setAttribute("height", "100%");
    // maskNoise.appendChild(maskRect);
    // maskNoise.appendChild(maskCircle);
    // defs.appendChild(maskNoise);

    // var toBeMasked = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    // toBeMasked.setAttribute("x", "0");
    // toBeMasked.setAttribute("y", "0");
    // toBeMasked.setAttribute("width", "100%");
    // toBeMasked.setAttribute("height", "100%");
    // toBeMasked.setAttribute('fill', 'blue');
    // toBeMasked.setAttribute('mask', "url(#MaskNoise)");
    // svgNode.appendChild(toBeMasked);

    // TRY Clipping
    // var newDrawing = document.createElementNS("http://www.w3.org/2000/svg", "use");
    // newDrawing.setAttribute("id", "newDrawing");
    // // newDrawing.setAttribute("href", "#drawing");
    // newDrawing.setAttribute("href", "#showDrawing");

    // var maskCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // maskCircle.setAttribute('cx', "100");
    // maskCircle.setAttribute('cy', "100");
    // maskCircle.setAttribute('r', "50");

    // var clipper = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    // clipper.setAttribute("id", "clipper");
    // // clipper.appendChild("url(#drawing)");
    // clipper.appendChild(maskCircle);
    // clipper.appendChild(newnerdGroup);
    // clipper.appendChild(newDrawing);
    // defs.appendChild(clipper);


    // TRY MASK AND FEMATRIX
    var filterBlack = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filterBlack.setAttribute("id", "filterBlack");
    filterBlack.setAttribute("x", "0");
    filterBlack.setAttribute("y", "0");
    // added
    // filterBlack.setAttribute("filterUnits", "objectBoundingBox");
    // filterBlack.setAttribute("primitiveUnits", "userSpaceOnUse");
    // filterBlack.setAttribute("color-interpolation-filters", "linearRGB");


    // desaturate
    var colorMatrixBlack = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
    colorMatrixBlack.setAttribute("type", "matrix");
    colorMatrixBlack.setAttribute("in", "SourceGraphic");
    // colorMatrixBlack.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
    // colorMatrixBlack.setAttribute("values", "100 0 0 0 0 0 100 0 0 0 0 0 100 0 0 0 0 0 1 0");
    colorMatrixBlack.setAttribute("values", "\
    200 0 0 0 0 \
    200 0 0 0 0 \
    200 0 0 0 0 \
    0 0 0 1 0");
    colorMatrixBlack.setAttribute("x", "0%");
    colorMatrixBlack.setAttribute("y", "0%");
    colorMatrixBlack.setAttribute("width", "100%");
    colorMatrixBlack.setAttribute("height", "100%");
    filterBlack.appendChild(colorMatrixBlack);
    // kl
    //     <svg xmlns="http://www.w3.org/2000/svg">
    //   <filter id="filter">
    //     <feColorMatrix
    //       type="matrix"
    //       values=" 0.000  0.000  0.000  0.000  0.000 
    //                0.000  0.000  0.000  0.000  0.000 
    //                0.000  0.000  0.000  0.000  0.000 
    //                0.000  0.000  0.000  1.000  0.000">
    //     </feColorMatrix>
    //   </filter>
    // </svg>
    defs.appendChild(filterBlack);



    // make a group with black background and white shape of drawing for the mask
    var groupBlackMask = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupBlackMask.setAttribute("id", "groupBlackMask");

    var filteredDrawing = document.createElementNS("http://www.w3.org/2000/svg", "use");
    filteredDrawing.setAttribute("id", "filteredDrawing");
    filteredDrawing.setAttribute("href", "#drawing");
    filteredDrawing.setAttribute("filter", "url(#filterBlack)");

    var fillBlack = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    fillBlack.setAttribute("x", "0%");
    fillBlack.setAttribute("y", "0%");
    fillBlack.setAttribute("width", "100%");
    fillBlack.setAttribute("height", "100%");
    fillBlack.setAttribute("fill", "black");

    groupBlackMask.appendChild(fillBlack);
    groupBlackMask.appendChild(filteredDrawing);
    // svgNode.appendChild(groupBlackMask);

    // TEST THE BLACK FILTER 
    var maskCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    maskCircle.setAttribute('cx', "100");
    maskCircle.setAttribute('cy', "100");
    maskCircle.setAttribute('r', "50");
    maskCircle.setAttribute('fill', '#ffffff'); // <!-- Everything under a black pixel will be invisible -->
    // maskCircle.setAttribute("filter", "url(#filterBlack)");
    // svgNode.appendChild(maskCircle);

    // mask for noise
    var maskNoise = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    maskNoise.setAttribute("id", "maskNoise");
    // maskNoise.setAttribute("maskUnits", "userSpaceOnUse");
    maskNoise.setAttribute("x", "0");
    maskNoise.setAttribute("y", "0");
    maskNoise.setAttribute("width", "100%");
    maskNoise.setAttribute("height", "100%");
    // maskNoise.appendChild(maskRect);
    maskNoise.appendChild(maskCircle);
    maskNoise.appendChild(groupBlackMask);
    defs.appendChild(maskNoise);

    // show the mask in black and white for the noise
    // svgNode.appendChild(groupBlackMask)
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