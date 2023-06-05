
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
let DESCRIPTION = "Javascript on html canvas";
let WEBSITE = "https://digitalitility.com";
let YEAR = "2023";
let PRICE = "ꜩ 4";
let EDITIONS = "100 editions";

let OVERSHOOT = "start";
var drawing = "";

setTagsHTML();

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
]

// NOT WORKING WITH HARDCODED SVG

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
    backgroundObj.setAttribute("fill", "#ffffff");


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
    turbo.setAttribute("baseFrequency", "0.86");
    turbo.setAttribute("numOctaves", "1");
    turbo.setAttribute("stitchTiles", "stitch");
    turbo.setAttribute("result", "NOISE");

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

    // backgroundObj.setAttribute("filter", "url(#f1)");
    svgNode.appendChild(backgroundObj);

    timeChecker();

    // svgNode.setAttribute("filter", "url(#f1)");

    // ELEMENTS
    new dynamicPalette(this.drawing, "#b7c6d4", 3, -10, 6).show();
    new dynamicPalette(this.drawing, "#7f9189", 3, -10, 6).show();
});



SVG.on(document, 'DOMContentLoaded', function () {

    // drawing = SVG().viewbox(0, 0, rescaling_width, rescaling_height).addTo('#badAssCanvas');
    // drawing = SVG().viewbox(0, 0, rescaling_width, rescaling_height).addTo('#nono');
    // timeChecker();



    // let noiseDebug = new noiseArea(120, 4);
    // noiseDebug.drawNoise(drawing);

    // noiseDebug.getStartingPoint(drawing);
    // noiseDebug.getIsland(drawing);
    // noiseDebug.drawIsland(drawing);

    // noiseAggy = new noiseAggregator(135, 50, 110, 10, 4, 5);
    // noiseAggy.drawNoise1(drawing);
    // noiseAggy.drawNoise2(drawing);
    // noiseAggy.drawNoise3(drawing);

    // noiseAggy.drawAgg(drawing);


    // dig = new dig({
    //     x: 500,
    //     y: 500,
    //     noiseValue: 0,
    //     vertexLength: 160,
    //     strokeWeighty: 4,
    //     // angleMin: 2 * Math.PI / 12 * 5.75,
    //     // angleMax: 2 * Math.PI / 12 * 6.25,
    //     angleMin: 2 * Math.PI / 12 * 0.5,
    //     angleMax: 2 * Math.PI / 12 * 1.25,
    //     revert: true,
    //     cutOutValue: -1,
    //     loopCount: 160,
    //     colorList: ["#222222"],
    //     noiseAngle: false,
    //     group: "",
    //     drawing: drawing,
    // });
    // dig.draw();


    // Add event listener on keydown -  https://www.section.io/engineering-education/keyboard-events-in-javascript/ 
    document.addEventListener('keydown', (event) => {

        var filename = TITLE + "_" + fxhash + "_" + getTimestamp() + ".svg";

        if (event.code == "KeyE") {
            // alert("oida is going down");
            // downloadString(drawing.svg(), "image/svg+xml", filename);

            saveSvg(svgNode, filename);

        }

        // Alert the key name and key code on keydown
        // var name = event.key;
        // var code = event.code;
        // alert(`Key pressed ${name} \r\n Key code value: ${code}`);

    }, false);

})


function fireTrigger(drawing) {
    console.log("trigger initiated");

    // drawing.clear();

    // background
    // drawing.rect(rescaling_width, rescaling_height).fill("#ffffff");

    let grid = new Grid({
        drawing: drawing,
        // marginBoxCount: 5,
        marginBoxCount: 15,
        // shortBoxCount: 80,
        shortBoxCount: 160,
        overshoot: OVERSHOOT,
        DEBUG: false,
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