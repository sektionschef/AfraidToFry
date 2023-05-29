
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

canvasFormatChosen = getRandomFromList(canvasFormats);
console.log("Canvas Format: " + canvasFormatChosen.name);

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


SVG.on(document, 'DOMContentLoaded', function () {

    drawing = SVG().viewbox(0, 0, rescaling_width, rescaling_height).addTo('#badAssCanvas');

    timeChecker();

    // ELEMENTS

    // let palette = new dynamicPalette(drawing, "#6363b1", 0, 2, 1);
    // let palette = new dynamicPalette(drawing, "#6363b1", 3, 1, 1);
    // palette.show();

    // let noiseDebug = new noiseArea(120, 4);
    // noiseDebug.drawNoise(drawing);

    // noiseDebug.getStartingPoint(drawing);
    // noiseDebug.getIsland(drawing);
    // noiseDebug.drawIsland(drawing);

    noiseAggy = new noiseAggregator();
    // noiseAggy.drawNoise1(drawing);
    // noiseAggy.drawNoise2(drawing);
    // noiseAggy.drawNoise3(drawing);
    // noiseAggy.drawNoise4(drawing);

    noiseAggy.combineNoises();
    noiseAggy.drawAgg(drawing);


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
            downloadString(drawing.svg(), "image/svg+xml", filename);
        }

        // Alert the key name and key code on keydown
        // var name = event.key;
        // var code = event.code;
        // alert(`Key pressed ${name} \r\n Key code value: ${code}`);

    }, false);

})


function fireTrigger(drawing) {
    console.log("trigger initiated");

    drawing.clear();

    // background
    drawing.rect(rescaling_width, rescaling_height).fill("#ffffff");

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