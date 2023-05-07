// let svg = SVG("#badAssCanvas");
// let svg = SVG().addTo('#badAssCanvas')

// console.log(svg);

// draw pink square
// svg.rect(100, 100).move(100, 50).fill('#f06')
// svg.rect(100, 100).fill('#f06')

// Do your thing! 🚀

SVG.on(document, 'DOMContentLoaded', function () {
    var draw = SVG().addTo('#badAssCanvas')
    draw.rect(100, 100).move(100, 50).fill('#f06')
})
