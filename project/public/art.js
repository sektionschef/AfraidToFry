// let svg = SVG("#badAssCanvas");
// let svg = SVG().addTo('#badAssCanvas')

// console.log(svg);

// draw pink square
// svg.rect(100, 100).move(100, 50).fill('#f06')
// svg.rect(100, 100).fill('#f06')

// Do your thing! 🚀

SVG.on(document, 'DOMContentLoaded', function () {
    // for (var i = 0; i < 30000; i++) {
    var draw = SVG().addTo('#badAssCanvas')
    draw.rect(100, 100).move(100, 50).fill('#f06')

    var polyline = draw.polyline('0,0 100,50 50,100').fill('none').stroke({ width: 1, color: '#818181' })
    // }
})



noise.seed(Math.random());

for (var x = 0; x < 80; x++) {
    for (var y = 0; y < 80; y++) {
        // All noise functions return values in the range of -1 to 1.

        // noise.simplex2 and noise.perlin2 for 2d noise
        var value = noise.simplex2(x / 100, y / 100);
        // console.log(value);


    }
}