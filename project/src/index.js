// demonstrate seed reset
// for (let i = 0; i < 10; i++) {
//   console.log(i, $fx.rand(), $fx.randminter())
//   $fx.rand.reset();
//   $fx.randminter.reset();
// }
console.log('');
console.info(`fxhash: %c${fxhash}`, 'font-weight: bold');
console.log('');

const sp = new URLSearchParams(window.location.search)
console.log(sp);

// this is how to define parameters
$fx.params([
  {
    id: "country_id",
    name: "Country",
    type: "select",
    default: "Austria",
    options: {
      options: ["Austria"],
    }
  },
  {
    id: "palette_id",
    name: "Palette",
    type: "select",
    default: "Boris",
    options: {
      options: ["Boris", "Doris"],
      // options: ["Boris", "Doris", "Morris", "Harris", "Paris"],
    }
  },
  // {
  //   id: "number_id",
  //   name: "A number/float64",
  //   type: "number",
  //   //default: Math.PI,
  //   options: {
  //     min: 1,
  //     max: 10,
  //     step: 0.0001,
  //   },
  // },

  // {
  //   id: "bigint_id",
  //   name: "A bigint",
  //   type: "bigint",
  //   update: "code-driven",
  //   //default: BigInt(Number.MAX_SAFE_INTEGER * 2),
  //   options: {
  //     min: Number.MIN_SAFE_INTEGER * 4,
  //     max: Number.MAX_SAFE_INTEGER * 4,
  //     step: 1,
  //   },
  // },
  // {
  //   id: "string_id_long",
  //   name: "A string long",
  //   type: "string",
  //   update: "code-driven",
  //   //default: "hello",
  //   options: {
  //     minLength: 1,
  //     maxLength: 512,
  //   },
  // },
  // {
  //   id: "select_id",
  //   name: "A selection",
  //   type: "select",
  //   update: "code-driven",
  //   //default: "pear",
  //   options: {
  //     options: ["apple", "orange", "pear"],
  //   },
  // },
  // {
  //   id: "color_id",
  //   name: "A color",
  //   type: "color",
  //   update: "code-driven",
  //   //default: "ff0000",
  // },
  // {
  //   id: "boolean_id",
  //   name: "A boolean",
  //   type: "boolean",
  //   update: "code-driven",
  //   //default: true,
  // },
  // {
  //   id: "string_id",
  //   name: "A string",
  //   type: "string",
  //   update: "code-driven",
  //   //default: "hello",
  //   options: {
  //     minLength: 1,
  //     maxLength: 512,
  //   },
  // },
])


// #####################

// https://docs.google.com/spreadsheets/d/1vFmPb0Q7fCb5MWL4NTcCh001ABJR2qvu2umFBYY2tfU/edit#gid=0
var OVERSHOOTSTATS = {
  "Austria": {
    overshootDay: "6. April",
    overshootTime: "6:19",
    timeSwitchHour: 6,
    timeSwitchMinute: 19,
  }
}

// let ABOVETONE = "#201E1F";
// let BELOWTONE = "#FF4000";

var PALETTE = {
  "Doris": {
    "aboveTone": "#86b1d4",
    "belowTone": "#91816b"
  },
  "Boris": {
    "aboveTone": "#201E1F",
    "belowTone": "#FF4000"
  }
}

var HORIZONRATIO = 4 / 7;

var TITLE = "afraid to fry";
var ARTIST = "Stefan Schwaha, @sektionschef";
var DESCRIPTION = "javascript on html canvas";
var WEBSITE = "https://digitalitility.com";
var YEAR = "2023";
var PRICE = "ꜩ 4";
var EDITIONS = "100 editions";

let OVERSHOOT = "start";
var drawing = "";

// let RESOLUTIONBOXCOUNT = 160;
let RESOLUTIONBOXCOUNT = 80;
// let RESOLUTIONBOXCOUNT = 60;
// let RESOLUTIONBOXCOUNT = 40;


// let ABOVETONE = "#8c9cb3";
// let BELOWTONE = "#756247";

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

// let ABOVETONE = "#F87060";
// let BELOWTONE = "#102542";

// let ABOVETONE = "#FCF7F8";
// let BELOWTONE = "#CED3DC";

// let ABOVETONE = "#171219";
// let BELOWTONE = "#225560";

// let ABOVETONE = "#86b1d4";
// let BELOWTONE = "#91816b";

// let ABOVETONE = "#3F4045";
// let BELOWTONE = "#02111B";

// let ABOVETONE = "#6F1D1B";
// let BELOWTONE = "#BB9457";

// let ABOVETONE = "#EF767A";
// let BELOWTONE = "#456990";

// console.log($fx.getParam("palette_id"));
// let ABOVETONE = PALETTE[$fx.getParam("palette_id")].aboveTone;
// let BELOWTONE = PALETTE[$fx.getParam("palette_id")].belowTone;

// console.log($fx.getParam("palette_id"));
let ABOVETONE = PALETTE[$fx.getParam("palette_id")].aboveTone;
let BELOWTONE = PALETTE[$fx.getParam("palette_id")].belowTone;


let BACKGROUNDTONE = "#ffffff";


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


// #####

// this is how features can be defined
$fx.features({
  // "A random feature": Math.floor($fx.rand() * 10),
  // "A random boolean": $fx.rand() > 0.5,
  // "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand() * 4)),
  // "Feature from params, its a number": $fx.getParam("number_id"),
  // "Overshoot Time": OVERSHOOTSTATS[$fx.getParam("country_id")].overshootTime,
})

console.log($fx.getFeatures());
console.log($fx.getParams())

function main() {
  // // log the parameters, for debugging purposes, artists won't have to do that
  // console.log("Current param values:");
  // // Raw deserialize param values
  // console.log($fx.getRawParams());
  // // Added addtional transformation to the parameter for easier usage
  // // e.g. color.hex.rgba, color.obj.rgba.r, color.arr.rgb[0]
  // console.log($fx.getParams());

  // // how to read a single raw parameter
  // console.log("Single raw value:");
  // console.log($fx.getRawParam("color_id"));
  // // how to read a single transformed parameter
  // console.log("Single transformed value:");
  // console.log($fx.getParam("color_id"));

  // const getContrastTextColor = (backgroundColor) =>
  //   ((parseInt(backgroundColor, 16) >> 16) & 0xff) > 0xaa
  //     ? "#000000"
  //     : "#ffffff"

  // const bgcolor = $fx.getParam("color_id").hex.rgba
  // const textcolor = getContrastTextColor(bgcolor.replace("#", ""))

  // update the document based on the parameters
  // document.body.style.background = bgcolor
  // document.body.innerHTML = `
  // <div style="color: ${textcolor};">
  //   <p>
  //   hash: ${$fx.hash}
  //   </p>
  //   <p>
  //   minter: ${$fx.minter}
  //   </p>
  //   <p>
  //   iteration: ${$fx.iteration}
  //   </p>
  //   <p>
  //   inputBytes: ${$fx.inputBytes}
  //   </p>
  //   <p>
  //   context: ${$fx.context}
  //   </p>
  //   <p>
  //   params:
  //   </p>
  //   <pre>
  //   ${$fx.stringifyParams($fx.getRawParams())}
  //   </pre>
  // <div>
  // `

  // const btn = document.createElement("button")
  // btn.textContent = "emit random params"
  // btn.addEventListener("click", () => {
  //   $fx.emit("params:update", {
  //     number_id: $fx.getRandomParam("number_id"),
  //     bigint_id: $fx.getRandomParam("bigint_id"),
  //     string_id_long: $fx.getRandomParam("string_id_long"),
  //     select_id: $fx.getRandomParam("select_id"),
  //     color_id: $fx.getRandomParam("color_id"),
  //     boolean_id: $fx.getRandomParam("boolean_id"),
  //     string_id: $fx.getRandomParam("string_id"),
  //   })
  //   main()
  // })
  // document.body.appendChild(btn)


  const targetDiv = document.getElementById('badAssCanvas');
  const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgNode.setAttributeNS(null, 'viewBox', '0 0 ' + canvasFormatChosen.canvasWidth + " " + canvasFormatChosen.canvasHeight);
  svgNode.setAttributeNS(null, 'id', 'svgNode');
  targetDiv.appendChild(svgNode);

  var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.setAttributeNS(null, 'id', 'defs');
  svgNode.appendChild(defs);


  setTagsHTML({
    "title": TITLE,
    "artist": ARTIST,
    "description": DESCRIPTION,
    "website": WEBSITE,
    "year": YEAR,
    "price": PRICE,
    "editions": EDITIONS,
  });

  createBackground();
  createDrawingGroup();

  timeChecker();

  createNoiseLayer();
  createFilterBlack();
  createMaskBlack();
}

main()

$fx.on(
  "params:update",
  (newRawValues) => {
    // opt-out default behaviour
    if (newRawValues.number_id === 5) return false
    // opt-in default behaviour
    return true
  },
  (optInDefault, newValues) => main()
)




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
    horizonRatio: HORIZONRATIO,
    // shortBoxCount: 40,
    // shortBoxCount: 80,
    shortBoxCount: RESOLUTIONBOXCOUNT,
    // shortBoxCount: 100,
    // shortBoxCount: 160,
    overshoot: OVERSHOOT,
    aboveTone: ABOVETONE,
    belowTone: BELOWTONE,
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

  let aboveToneRgb = tinycolor(ABOVETONE).toRgb()
  let belowToneRgb = tinycolor(BELOWTONE).toRgb()

  const svgNode = document.getElementById('svgNode');
  const defs = document.getElementById('defs');

  // filter object with transparent background
  var filterObjA = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  filterObjA.setAttribute("id", "filterObjA");
  filterObjA.setAttribute("width", "100%");
  filterObjA.setAttribute("height", "100%");
  filterObjA.setAttribute("opacity", "1");

  var filterObjB = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  filterObjB.setAttribute("id", "filterObjB");
  filterObjB.setAttribute("width", "100%");
  filterObjB.setAttribute("height", "100%");
  filterObjB.setAttribute("opacity", "1");

  // filter know how: https://stackoverflow.com/questions/10867282/how-can-i-add-a-filter-to-a-svg-object-in-javascript 

  var filterA = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filterA.setAttribute("id", "filterA");
  filterA.setAttribute("x", "0");
  filterA.setAttribute("y", "0");
  // added
  filterA.setAttribute("filterUnits", "objectBoundingBox");
  filterA.setAttribute("primitiveUnits", "userSpaceOnUse");
  filterA.setAttribute("color-interpolation-filters", "linearRGB");

  var filterB = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filterB.setAttribute("id", "filterB");
  filterB.setAttribute("x", "0");
  filterB.setAttribute("y", "0");
  // added
  filterB.setAttribute("filterUnits", "objectBoundingBox");
  filterB.setAttribute("primitiveUnits", "userSpaceOnUse");
  filterB.setAttribute("color-interpolation-filters", "linearRGB");

  // var gaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
  // gaussianFilter.setAttribute("in", "SourceGraphic");
  // gaussianFilter.setAttribute("stdDeviation", "1");

  // https://fffuel.co/nnnoise/

  var turbulenceA = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
  turbulenceA.setAttribute("id", "turbulenceA");
  turbulenceA.setAttribute("in", "filterObjA");
  turbulenceA.setAttribute("type", "fractalNoise");
  // turbulenceA.setAttribute("baseFrequency", "0.3");  // 0.102
  turbulenceA.setAttribute("baseFrequency", "0.1");  // 0.102, 0.061
  turbulenceA.setAttribute("numOctaves", "6");
  // turbulenceA.setAttribute("seed", "15");
  turbulenceA.setAttribute("stitchTiles", "stitch");
  turbulenceA.setAttribute("x", "0%");
  turbulenceA.setAttribute("y", "0%");
  turbulenceA.setAttribute("width", "100%");
  turbulenceA.setAttribute("height", "100%");
  turbulenceA.setAttribute("result", "turbulenceA");

  var turbulenceB = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
  turbulenceB.setAttribute("id", "turbulenceB");
  turbulenceB.setAttribute("in", "filterObjB");
  turbulenceB.setAttribute("type", "fractalNoise");
  // turbulenceB.setAttribute("baseFrequency", "0.3");  // 0.102
  turbulenceB.setAttribute("baseFrequency", "0.1");  // 0.102, 0.061
  turbulenceB.setAttribute("numOctaves", "6");
  // turbulenceB.setAttribute("seed", "15");
  turbulenceB.setAttribute("stitchTiles", "stitch");
  turbulenceB.setAttribute("x", "0%");
  turbulenceB.setAttribute("y", "0%");
  turbulenceB.setAttribute("width", "100%");
  turbulenceB.setAttribute("height", "100%");
  turbulenceB.setAttribute("result", "turbulenceB");

  var specularLightA = document.createElementNS("http://www.w3.org/2000/svg", "feSpecularLighting");
  specularLightA.setAttribute("id", "specularLightA");
  specularLightA.setAttribute("surfaceScale", "10"); // 1- 40, 17
  specularLightA.setAttribute("specularConstant", "0.75");
  specularLightA.setAttribute("specularExponent", "20");
  specularLightA.setAttribute("lighting-color", "#1900ff");
  // specularLightA.setAttribute("lighting-color", ABOVETONE);
  specularLightA.setAttribute("x", "0%");
  specularLightA.setAttribute("y", "0%");
  specularLightA.setAttribute("width", "100%");
  // specularLightA.setAttribute("height", "50%");
  specularLightA.setAttribute("height", `${HORIZONRATIO * 100}%`);
  specularLightA.setAttribute("in", "turbulenceA");
  specularLightA.setAttribute("result", "specularLightA");

  var specularLightB = document.createElementNS("http://www.w3.org/2000/svg", "feSpecularLighting");
  specularLightB.setAttribute("id", "specularLightB");
  specularLightB.setAttribute("surfaceScale", "10"); // 1- 40, 17
  specularLightB.setAttribute("specularConstant", "0.75");
  specularLightB.setAttribute("specularExponent", "20");
  specularLightB.setAttribute("lighting-color", "#1900ff");
  // specularLightB.setAttribute("lighting-color", BELOWTONE);
  specularLightB.setAttribute("x", "0%");
  // specularLightB.setAttribute("y", "50%");
  specularLightB.setAttribute("y", `${HORIZONRATIO * 100}%`);
  specularLightB.setAttribute("width", "100%");
  specularLightB.setAttribute("height", "100%");
  specularLightB.setAttribute("in", "turbulenceB");
  specularLightB.setAttribute("result", "specularLightB");

  var distantLightA = document.createElementNS("http://www.w3.org/2000/svg", "feDistantLight");
  distantLightA.setAttribute("id", "distantLightA");
  distantLightA.setAttribute("azimuth", "3");
  distantLightA.setAttribute("elevation", "100");
  specularLightA.appendChild(distantLightA);

  var distantLightB = document.createElementNS("http://www.w3.org/2000/svg", "feDistantLight");
  distantLightB.setAttribute("id", "distantLightB");
  distantLightB.setAttribute("azimuth", "3");
  distantLightB.setAttribute("elevation", "100");
  specularLightB.appendChild(distantLightB);
  // specularLightB.appendChild(distantLight);


  // desaturate
  var colorMatrixA = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
  colorMatrixA.setAttribute("type", "matrix");
  colorMatrixA.setAttribute("values", "\
     200 0 0 0 0 \
     200 0 0 0 0 \
     200 0 0 0 0 \
     0 0 0 1 0");
  colorMatrixA.setAttribute("x", "0%");
  colorMatrixA.setAttribute("y", "0%");
  colorMatrixA.setAttribute("width", "100%");
  colorMatrixA.setAttribute("height", "100%");
  // colorMatrixA.setAttribute("in", "specularLightB");
  colorMatrixA.setAttribute("in", "sourceGraphic");
  colorMatrixA.setAttribute("result", "colorMatrixA");

  // recolor
  var colorMatrixHueA = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
  colorMatrixHueA.setAttribute("in", "colorMatrixA");
  colorMatrixHueA.setAttribute("type", "matrix");
  colorMatrixHueA.setAttribute("values", `\
     ${aboveToneRgb.r / 255} 0 0 0 0 \
     0 ${aboveToneRgb.g / 255} 0 0 0 \
     0 0 ${aboveToneRgb.b / 255} 0 0 \
     0 0 0 1 0`); // red / 255 = 0.06
  colorMatrixHueA.setAttribute("result", "colorMatrixHueA");


  // desaturate
  var colorMatrixB = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
  colorMatrixB.setAttribute("type", "matrix");
  colorMatrixB.setAttribute("values", "\
  200 0 0 0 0 \
  200 0 0 0 0 \
  200 0 0 0 0 \
  0 0 0 1 0");
  colorMatrixB.setAttribute("x", "0%");
  colorMatrixB.setAttribute("y", "0%");
  colorMatrixB.setAttribute("width", "100%");
  colorMatrixB.setAttribute("height", "100%");
  // colorMatrixB.setAttribute("in", "specularLightB");
  colorMatrixB.setAttribute("in", "sourceGraphic");
  colorMatrixB.setAttribute("result", "colormatrixB");

  // recolor
  var colorMatrixHueB = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
  colorMatrixHueB.setAttribute("in", "colormatrixB");
  colorMatrixHueB.setAttribute("type", "matrix");
  colorMatrixHueB.setAttribute("values", `\
  ${belowToneRgb.r / 255} 0 0 0 0 \
  0 ${belowToneRgb.g / 255} 0 0 0 \
  0 0 ${belowToneRgb.b / 255} 0 0 \
  0 0 0 1 0`); // red / 255 = 0.06
  colorMatrixHueB.setAttribute("result", "colorMatrixHueB");



  // var blender = document.createElementNS("http://www.w3.org/2000/svg", "feBlend");
  // blender.setAttribute("in", "SourceGraphic");
  // blender.setAttribute("in2", "turbulence");
  // blender.setAttribute("mode", "overlay");
  // blender.setAttribute("result", "BLEND");



  // filter.appendChild(gaussianFilter);
  // filter.appendChild(blender);

  filterA.appendChild(turbulenceA);
  filterA.appendChild(specularLightA);
  filterA.appendChild(colorMatrixA);  // desaturate
  filterA.appendChild(colorMatrixHueA);

  filterB.appendChild(turbulenceB);
  filterB.appendChild(specularLightB);
  filterB.appendChild(colorMatrixB);  // desaturate
  filterB.appendChild(colorMatrixHueB);

  defs.appendChild(filterA);
  defs.appendChild(filterB);

  // var feMergeNode0 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
  // feMergeNode0.setAttribute("in", "SourceGraphic");
  // var feMergeNode1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
  // feMergeNode1.setAttribute("in", "turbulenceA");
  var feMergeNode2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
  feMergeNode2.setAttribute("in", "specularLightA");
  var feMergeNode3 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
  feMergeNode3.setAttribute("in", "specularLightB");

  // var feMerge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
  // feMerge.appendChild(feMergeNode0);
  // feMerge.appendChild(feMergeNode1);
  // feMerge.appendChild(feMergeNode2);
  // feMerge.appendChild(feMergeNode3);
  // filterA.appendChild(feMerge);

  filterObjA.setAttribute("filter", "url(#filterA)");
  filterObjA.setAttribute("mask", "url(#maskNoise)");
  filterObjB.setAttribute("filter", "url(#filterB)");
  filterObjB.setAttribute("mask", "url(#maskNoise)");

  // const drawing = document.getElementById('drawing');
  // svgNode.appendChild(drawing);

  // Test - add drawing to show
  var showDrawing = document.createElementNS("http://www.w3.org/2000/svg", "use");
  showDrawing.setAttribute("id", "showDrawing");
  showDrawing.setAttribute("href", "#drawing");
  svgNode.appendChild(showDrawing);

  svgNode.appendChild(filterObjA);
  svgNode.appendChild(filterObjB);
}

