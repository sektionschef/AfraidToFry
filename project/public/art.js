// let svg = SVG("#badAssCanvas");
// let svg = SVG().addTo('#badAssCanvas')

// console.log(svg);

// draw pink square
// svg.rect(100, 100).move(100, 50).fill('#f06')
// svg.rect(100, 100).fill('#f06')

// Do your thing! 🚀

// comes from https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

// comes from https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex 
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}


SVG.on(document, 'DOMContentLoaded', function () {
    // for (var i = 0; i < 30000; i++) {
    var draw = SVG().addTo('#badAssCanvas')

    // noise
    noise.seed(Math.random());

    for (var x = 0; x < 80; x++) {
        for (var y = 0; y < 80; y++) {
            // All noise functions return values in the range of -1 to 1.

            // noise.simplex2 and noise.perlin2 for 2d noise
            var value = noise.simplex2(x / 100, y / 100);
            // console.log(value);

            // draw.rect(5, 5).move(x * 20, y * 10).fill({ color: '#f06', opacity: map(value, -1, 1, 0, 1) })
            draw.rect(5, 5).move(x * 20, y * 10).fill({ color: hslToHex(120, map(value, -1, 1, 0, 100), 50) })


        }
    }


    // draw.rect(100, 100).move(100, 50).fill('#f06')

    // var polyline = draw.polyline('0,0 100,50 50,100').fill('none').stroke({ width: 1, color: '#818181' })
    // }
})

