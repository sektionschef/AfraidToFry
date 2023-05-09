// let svg = SVG("#badAssCanvas");
// let svg = SVG().addTo('#badAssCanvas')

// console.log(svg);

// draw pink square
// svg.rect(100, 100).move(100, 50).fill('#f06')
// svg.rect(100, 100).fill('#f06')

// Do your thing! 🚀


SVG.on(document, 'DOMContentLoaded', function () {
    // for (var i = 0; i < 30000; i++) {
    var drawing = SVG().addTo('#badAssCanvas')

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

    var pointA = { x: 0, y: 0 };
    var pointB = { x: 100, y: 50 };
    var pointC = { x: 50, y: 100 };

    var pointAString = pointA.x + "," + pointA.y;
    var pointBString = pointB.x + "," + pointB.y;
    var pointCString = pointC.x + "," + pointC.y;
    var coords = pointAString.concat(' ', pointBString, " ", pointCString);

    var polyline = drawing.polyline(coords).fill('none').stroke({ width: 1, color: '#c01b1b' });



    // point and add new point
    var oldPoint = { x: 600, y: 400 };
    var newPoint = oldPoint;
    // console.log(angleBetweenPoints(pointA, pointB));

    var polyLineString = createCoordString(oldPoint);

    for (var i = 0; i <= 30; i++) {

        var vectorMagnitude = 20;
        var newPoint = vectorAdd(newPoint, vectorFromAngle(getRandomFromInterval(0, 2 * Math.PI), vectorMagnitude));

        polyLineString = polyLineString.concat(" ", createCoordString(newPoint));
    }

    var polyline = drawing.polyline(polyLineString).fill('none').stroke({ width: 1, color: '#3d7e83' });




})

