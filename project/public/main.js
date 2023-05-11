
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
    // for (var i = 0; i < 30000; i++) {

    // var drawing = SVG().addTo('body')
    var drawing = SVG().viewbox(0, 0, rescaling_width, rescaling_height).addTo('#badAssCanvas')


    // noise
    // noise.seed(Math.random());

    // for (var x = 0; x < 80; x++) {
    //     for (var y = 0; y < 80; y++) {
    //         // All noise functions return values in the range of -1 to 1.

    //         // noise.simplex2 and noise.perlin2 for 2d noise
    //         var value = noise.simplex2(x / 100, y / 100);
    //         // console.log(value);

    //         // drawing.rect(5, 5).move(x * 20, y * 10).fill({ color: '#f06', opacity: map(value, -1, 1, 0, 1) })
    //         drawing.rect(5, 5).move(x * 20, y * 10).fill({ color: hslToHex(120, map(value, -1, 1, 0, 100), 50) })


    //     }
    // }


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
        marginBoxCount: 5,
        shortBoxCount: 80,
        DEBUG: false,
    });

})

