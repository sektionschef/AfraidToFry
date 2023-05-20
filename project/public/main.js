
let TITLE = "afraid to fry";
let ARTIST = "Stefan Schwaha, @sektionschef";
let DESCRIPTION = "Javascript on html canvas";
let WEBSITE = "https://digitalitility.com";
let YEAR = "2023";
let PRICE = "ꜩ 4";
let EDITIONS = "100 editions";

let OVERSHOOT = true;

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

    var drawing = SVG().viewbox(0, 0, rescaling_width, rescaling_height).addTo('#badAssCanvas');

    // background
    drawing.rect(rescaling_width, rescaling_height).fill("#ffffff");

    // var polyline = draw.polyline('0,0 100,50 50,100').fill('none').stroke({ width: 1, color: '#c01b1b' });
    // drawing.rect(100, 100).move(100, 50).fill('#f06')


    // // point and add new point
    // var oldPoint = { x: 600, y: 400 };
    // var newPoint = oldPoint;
    // // console.log(angleBetweenPoints(pointA, pointB));

    // var polyLineString = createCoordString(oldPoint);

    // for (var i = 0; i <= 30; i++) {

    //     var vectorMagnitude = 20;
    //     var newPoint = vectorAdd(newPoint, vectorFromAngle(getRandomFromInterval(0, 2 * Math.PI), vectorMagnitude));

    //     polyLineString = polyLineString.concat(" ", createCoordString(newPoint));
    // }

    // var polyline = drawing.polyline(polyLineString).fill('none').stroke({ width: 1, color: '#3d7e83' });


    let grid = new Grid({
        drawing: drawing,
        // marginBoxCount: 5,
        marginBoxCount: 15,
        // shortBoxCount: 80,
        shortBoxCount: 160,
        overshoot: OVERSHOOT,
        DEBUG: false,
    });


    // let palette = new dynamicPalette(drawing, "#6363b1", 0, 2, 1);
    // let palette = new dynamicPalette(drawing, "#6363b1", 3, 1, 1);
    // palette.show();

    // let noiseDebug = new noiseArea(120, 4);
    // noiseDebug.drawNoise(drawing, 80);



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


function triggerDings() {
    console.log("trigger initiated");

    // MAYBE CLEAR EVERYTHING ON CANVAS

    grid2 = new Grid2({
        marginBoxCount: 5,  // 5
        shortBoxCount: 80,
        overshoot: OVERSHOOT,
        DEBUG: false,
    });

    // restart loop
    loop();
}


function timeChecker() {

    let switchHour = 21;
    let switchMinute = 18;

    var today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // console.log(time);

    if (today.getHours() >= switchHour && today.getMinutes() >= switchMinute) {
        // return true;
        if (OVERSHOOT == false) {
            OVERSHOOT = true;
            triggerDings();
        }
    } else {
        if (OVERSHOOT == true) {
            OVERSHOOT = false;
            triggerDings();
        }
    }

    console.log(OVERSHOOT);
}


// setInterval(timeChecker, 1000 * 60 * 1); // every minute check