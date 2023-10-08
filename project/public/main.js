
// weniger farbhelligkeit bei non overshoot

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

// let ABOVETONE = "#8c9cb3";
// let BELOWTONE = "#8a7558";
// let ABOVETONE = "#a5812f";  // andrea garden book
// let BELOWTONE = "#ff617b";  // andrea garden book
// let ABOVETONE = "#98a0a7";  // good - twitter
// let BELOWTONE = "#515a57";  // good - twitter

// let ABOVETONE = "#aeb9c2";
// let BELOWTONE = "#1e2b26";  // dark

// let ABOVETONE = "#0b2b5c";
// let BELOWTONE = "#d3b11a";

// triste
// let ABOVETONE = "#81878f";
// let BELOWTONE = "#555555";


let ABOVETONE = "#F87060";
let BELOWTONE = "#102542";

let ONTOPTONE = "#102542";


// let BASETONE = "#667b96";
let BASETONE = tinycolor(ABOVETONE).spin(-1).desaturate(1).darken(14).toHexString();
// let BASETONEBELOW = "#948269"
let BASETONEBELOW = tinycolor(BELOWTONE).spin(-1).desaturate(1).darken(14).toHexString();

// let RECTBASEABOVE = "#849bbd1a";
let RECTBASEABOVE = tinycolor(BELOWTONE).clone().spin(1).saturate(10).darken(0).setAlpha(0.102);
// let RECTBASEBELOW = "#bea8891a";
let RECTBASEBELOW = tinycolor(ABOVETONE).clone().spin(1).saturate(10).darken(0).setAlpha(0.102);


// let ABOVETONE = "#92a8b4" // blue
// let BELOWTONE = "#8b967d"; // green


// let ABOVETONE = "#4b6786";  // overshoot - cool color: d5560c
// let BELOWTONE = "#7e614f";  // overshoot 
// let ABOVETONE = "#8dacc9";  // full blue



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

    createBackground();
    createDrawingGroup();

    timeChecker();

    createNoiseLayer();
    createFilterBlack();
    createMaskBlack();

    // ELEMENT
    // new dynamicPalette("#617061", 5, 10, 10).show();
    // new dynamicPalette("hsl(153, 8%, 53%)", 5, 25, 10).show();
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


// turn very color in white and transparency in black
function createFilterBlack() {
    var filterBlack = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filterBlack.setAttribute("id", "filterBlack");
    filterBlack.setAttribute("x", "0");
    filterBlack.setAttribute("y", "0");
    // added
    // filterBlack.setAttribute("filterUnits", "objectBoundingBox");
    // filterBlack.setAttribute("primitiveUnits", "userSpaceOnUse");
    // filterBlack.setAttribute("color-interpolation-filters", "linearRGB");

    var colorMatrixBlack = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
    colorMatrixBlack.setAttribute("type", "matrix");
    colorMatrixBlack.setAttribute("in", "SourceGraphic");
    // colorMatrixBlack.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
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
    defs.appendChild(filterBlack);
}

function createMaskBlack() {
    // make a group with black background and white shape of drawing for the mask
    var groupBlackMask = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupBlackMask.setAttribute("id", "groupBlackMask");

    var fillBlack = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    fillBlack.setAttribute("x", "0%");
    fillBlack.setAttribute("y", "0%");
    fillBlack.setAttribute("width", "100%");
    fillBlack.setAttribute("height", "100%");
    fillBlack.setAttribute("fill", "black");

    var filteredDrawing = document.createElementNS("http://www.w3.org/2000/svg", "use");
    filteredDrawing.setAttribute("id", "filteredDrawing");
    filteredDrawing.setAttribute("href", "#drawing");
    filteredDrawing.setAttribute("filter", "url(#filterBlack)");

    groupBlackMask.appendChild(fillBlack);
    groupBlackMask.appendChild(filteredDrawing);
    // svgNode.appendChild(groupBlackMask);
    defs.appendChild(groupBlackMask);

    // show the mask in black and white for the noise
    // svgNode.appendChild(groupBlackMask)

    // var groupBlackMask = document.getElementById('groupBlackMask');

    // mask for noise
    var maskNoise = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    maskNoise.setAttribute("id", "maskNoise");
    // maskNoise.setAttribute("maskUnits", "userSpaceOnUse");
    maskNoise.setAttribute("x", "0");
    maskNoise.setAttribute("y", "0");
    maskNoise.setAttribute("width", "100%");
    maskNoise.setAttribute("height", "100%");
    // maskNoise.appendChild(maskRect);
    maskNoise.appendChild(groupBlackMask);
    defs.appendChild(maskNoise);
}

function createBackground() {
    // create background
    var backgroundRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    backgroundRect.setAttribute("id", "backgroundRect");
    backgroundRect.setAttribute("x", "0");
    backgroundRect.setAttribute("y", "0");
    backgroundRect.setAttribute("width", "100%");
    backgroundRect.setAttribute("height", "100%");
    backgroundRect.setAttribute("fill", BACKGROUNDTONE);
    svgNode.appendChild(backgroundRect);
}

function createDrawingGroup() {
    var groupDrawing = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupDrawing.setAttribute("id", "drawing");
    defs.appendChild(groupDrawing);
}

function createNoiseLayer() {

    const svgNode = document.getElementById('svgNode');
    const defs = document.getElementById('defs');

    // filter object with transparent background
    var filterObj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    filterObj.setAttribute("id", "filterObj");
    filterObj.setAttribute("width", "100%");
    filterObj.setAttribute("height", "100%");

    // filter know how: https://stackoverflow.com/questions/10867282/how-can-i-add-a-filter-to-a-svg-object-in-javascript 

    var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "f1");
    filter.setAttribute("x", "0");
    filter.setAttribute("y", "0");
    // added
    filter.setAttribute("filterUnits", "objectBoundingBox");
    filter.setAttribute("primitiveUnits", "userSpaceOnUse");
    filter.setAttribute("color-interpolation-filters", "linearRGB");

    // var gaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    // gaussianFilter.setAttribute("in", "SourceGraphic");
    // gaussianFilter.setAttribute("stdDeviation", "1");

    // https://fffuel.co/nnnoise/

    var turbulence = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
    turbulence.setAttribute("type", "fractalNoise");
    // turbulence.setAttribute("baseFrequency", "0.3");  // 0.102
    turbulence.setAttribute("baseFrequency", "0.061");  // 0.102
    turbulence.setAttribute("numOctaves", "4");
    // turbulence.setAttribute("seed", "15");
    turbulence.setAttribute("stitchTiles", "stitch");
    turbulence.setAttribute("x", "0%");
    turbulence.setAttribute("y", "0%");
    turbulence.setAttribute("width", "100%");
    turbulence.setAttribute("height", "100%");
    turbulence.setAttribute("result", "turbulence");

    var specularLight = document.createElementNS("http://www.w3.org/2000/svg", "feSpecularLighting");
    specularLight.setAttribute("surfaceScale", "10"); // 1- 40, 17
    specularLight.setAttribute("specularConstant", "0.75");
    specularLight.setAttribute("specularExponent", "20");
    specularLight.setAttribute("lighting-color", "#392bb8");
    specularLight.setAttribute("x", "0%");
    specularLight.setAttribute("y", "0%");
    specularLight.setAttribute("width", "100%");
    specularLight.setAttribute("height", "100%");
    specularLight.setAttribute("in", "turbulence");
    specularLight.setAttribute("result", "specularLighting");

    var distantLight = document.createElementNS("http://www.w3.org/2000/svg", "feDistantLight");
    distantLight.setAttribute("azimuth", "3");
    distantLight.setAttribute("elevation", "100");
    specularLight.appendChild(distantLight);

    // desaturate
    var colorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
    colorMatrix.setAttribute("type", "saturate");
    colorMatrix.setAttribute("values", "0");
    colorMatrix.setAttribute("x", "0%");
    colorMatrix.setAttribute("y", "0%");
    colorMatrix.setAttribute("width", "100%");
    colorMatrix.setAttribute("height", "100%");
    colorMatrix.setAttribute("in", "specularLighting");
    colorMatrix.setAttribute("result", "colormatrix");


    // var blender = document.createElementNS("http://www.w3.org/2000/svg", "feBlend");
    // blender.setAttribute("in", "SourceGraphic");
    // blender.setAttribute("in2", "turbulence");
    // blender.setAttribute("mode", "overlay");
    // blender.setAttribute("result", "BLEND");


    // filter.appendChild(gaussianFilter);
    // filter.appendChild(blender);
    filter.appendChild(turbulence);
    filter.appendChild(specularLight);
    filter.appendChild(colorMatrix);
    defs.appendChild(filter);

    filterObj.setAttribute("filter", "url(#f1)");
    filterObj.setAttribute("mask", "url(#maskNoise)");

    const drawing = document.getElementById('drawing');
    svgNode.appendChild(drawing);

    // Test - add drawing to show
    var showDrawing = document.createElementNS("http://www.w3.org/2000/svg", "use");
    showDrawing.setAttribute("id", "showDrawing");
    showDrawing.setAttribute("href", "#drawing");
    // svgNode.appendChild(showDrawing);

    svgNode.appendChild(filterObj);
}