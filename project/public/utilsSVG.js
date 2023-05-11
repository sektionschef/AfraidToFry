function getRandomFromInterval(min, max) {
    return fxrand() * (max - min) + min;
}


function getRandomFromList(items) {
    return items[Math.floor(fxrand() * items.length)];
}





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

// VECTOR
// angle between two points - https://gist.github.com/conorbuck/2606166 
function angleBetweenPoints(p1, p2) {
    // angle in radians
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    // angle in degrees
    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

    return angleDeg;
}

// comes from https://plantpot.works/8660
function vectorFromAngle(angleRadians, vectorMagnitude) {
    point = { x: Math.round(vectorMagnitude * Math.cos(angleRadians)), y: Math.round(vectorMagnitude * Math.sin(angleRadians)) };
    return point;
}


function vectorAdd(p1, p2) {
    return { x: p1.x + p2.x, y: p1.y + p2.y }
}

function createCoordString(p) {
    return p.x + "," + p.y;
}

function getRandomIndex(lengthy) {
    let randomIndex = Array.from({ length: lengthy }, (x, i) => i);
    randomIndex.sort(() => fxrand() - 0.5);
    return randomIndex
}

