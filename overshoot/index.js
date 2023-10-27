
// ########################################
var BULK = false; // bulk export images - and use direct not lense
// ########################################


// demonstrate seed reset
// for (let i = 0; i < 10; i++) {
//   console.log(i, $fx.rand(), $fx.randminter())
//   $fx.rand.reset();
//   $fx.randminter.reset();
// }

console.info(`fxhash: %c${$fx.hash}`, 'font-weight: bold');

const sp = new URLSearchParams(window.location.search)
//  console.log(sp);

var SHORTSIDE;
var LONGSIDE;
var LANDSCAPE;

var TITLE = "Overshoot";
var ARTIST = "Stefan Schwaha, @sektionschef";
var DESCRIPTION = "javascript on html canvas";
var WEBSITE = "https://digitalitility.com";
var YEAR = "2023";
// var PRICE = "ꜩ 4";
// var EDITIONS = "100 editions";

let OVERSHOOT = "start";
var drawing = "";

// let RESOLUTIONBOXCOUNT = 160;
let RESOLUTIONBOXCOUNT = 80;
// let RESOLUTIONBOXCOUNT = 60;
// let RESOLUTIONBOXCOUNT = 40;

var noiseColorDetail;
var noiseValueColorDetail;

var countries = ["Austria - 06:19", "Iraq - 21:34", "France - 08:09", "Australia - 05:20", "Thailand - 16:07", "Argentina - 11:26", "Japan - 8:13", "Global - 14:00", "USA - 04:40", "Mexico - 15:55", "China - 10:00"];
var palettes = ["Boris", "Doris", "Harris", "Iris", "Faris", "Paris", "Horris"];
var horizons = ["superUp", "up", "middle", "down", "superDown"];
var formats = ["1:1", "16:9", "9:16", "DIN A0, 84,1 cm x 118,9 cm",];


// this is how to define parameters
$fx.params([
  {
    id: "country_id",
    name: "Country",
    type: "select",
    // default: getRandomFromList(countries),
    // default: getRandomFromList(["OVERSHOOTLAND", "UNDERSHOOTLAND"]),
    // default: "OVERSHOOTLAND",
    // default: "UNDERSHOOTLAND",
    default: "Austria - 06:19",
    options: {
      // options: ["OVERSHOOTLAND", "UNDERSHOOTLAND"],
      options: countries,
    }
  },
  {
    id: "palette_id",
    name: "Palette",
    type: "select",
    // default: getRandomFromList(palettes),
    default: "Horris",
    options: {
      options: palettes,
    }
  },
  {
    id: "horizon_id",
    name: "Horizon",
    type: "select",
    // default: getRandomFromList(horizons),
    default: "down",
    options: {
      options: horizons,
    }
  },
  {
    id: "format_id",
    name: "Format",
    type: "select",
    // default: getRandomFromList(formats),
    // default: "16:9",
    default: "1:1",
    options: {
      options: formats,
    }
  },
  {
    id: "noiseYParam_id",
    name: "Noise Y Param",
    type: "number",
    // default: getRandomFromList([3, 6, 9, 12, 15, 18, 21, 24]),
    default: 6,
    options: {
      min: 3,
      max: 24,
      step: 3,
    },
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
  "Austria - 06:19": {
    overshootDay: "Apr 6",
    overshootTime: "06:19",
    // timeSwitchHour: 20,
    // timeSwitchMinute: 54,
    timeSwitchHour: 6,
    timeSwitchMinute: 19,
  },
  "Iraq - 21:34": {
    overshootDay: "Nov 25",
    overshootTime: "21:34",
    timeSwitchHour: 21,
    timeSwitchMinute: 34,
  },
  "France - 08:09": {
    overshootDay: "May 5",
    overshootTime: "08:09",
    timeSwitchHour: 8,
    timeSwitchMinute: 9,
  },
  "Australia - 05:20": {
    overshootDay: "March 23",
    overshootTime: "05:20",
    timeSwitchHour: 5,
    timeSwitchMinute: 20,
  },
  "Thailand - 16:07": {
    overshootDay: "September 3",
    overshootTime: "16:07",
    timeSwitchHour: 16,
    timeSwitchMinute: 7,
  },
  "Argentina - 11:26": {
    overshootDay: "June 24",
    overshootTime: "11:26",
    timeSwitchHour: 11,
    timeSwitchMinute: 26,
  },
  "Japan - 8:13": {
    overshootDay: "May 6",
    overshootTime: "8:13",
    timeSwitchHour: 8,
    timeSwitchMinute: 13,
  },
  "Global - 14:00": {
    overshootDay: "Aug 2",
    overshootTime: "14:00",
    timeSwitchHour: 14,
    timeSwitchMinute: 0,
  },
  "USA - 04:40": {
    overshootDay: "Mar 13",
    overshootTime: "04:40",
    timeSwitchHour: 4,
    timeSwitchMinute: 40,
  },
  "Mexico - 15:55": {
    overshootDay: "Aug 31",
    overshootTime: "15:55",
    timeSwitchHour: 15,
    timeSwitchMinute: 55,
  },
  "China - 10:00": {
    overshootDay: "Jun 2",
    overshootTime: "10:00",
    timeSwitchHour: 10,
    timeSwitchMinute: 0,
  },
  "OVERSHOOTLAND": {
    overshootDay: "xx",
    overshootTime: "xx",
    timeSwitchHour: 0,
    timeSwitchMinute: 1,
  },
  "UNDERSHOOTLAND": {
    overshootDay: "yy",
    overshootTime: "yy",
    timeSwitchHour: 23,
    timeSwitchMinute: 59,
  }
}

var PALETTE = {
  "Doris": {
    "aboveTone": "#86b1d4",
    "belowTone": "#91816b",
    "aboveToneOVERSHOOT": "#74a1c5",
    "belowToneOVERSHOOT": "#70624e",
  },
  "Boris": {
    "aboveTone": "#244577",
    "belowTone": "#d1be67",
    "aboveToneOVERSHOOT": "#0b2b5c",
    "belowToneOVERSHOOT": "#d3b11a",
  },
  "Iris": {
    "aboveTone": "#F87060",
    "belowTone": "#102542",
    "aboveToneOVERSHOOT": "#FF4000",
    "belowToneOVERSHOOT": "#201E1F",
  },
  "Harris": {
    "aboveTone": "#b2bec9",
    "belowTone": "#484b4a",
    "aboveToneOVERSHOOT": "#a3b5c5",
    "belowToneOVERSHOOT": "#434947",
  },
  "Faris": {
    "aboveTone": "#5e4334",
    "belowTone": "#02111B",
    "aboveToneOVERSHOOT": "#5e4334",
    "belowToneOVERSHOOT": "#02111B",
  },
  // "Morris": {
  //   "aboveTone": "#8c9cb3",
  //   "belowTone": "#756247"
  // },
  "Paris": {
    "aboveTone": "#578bc4",
    "belowTone": "#db5b5f",
    "aboveToneOVERSHOOT": "#EF767A",
    "belowToneOVERSHOOT": "#456990",
  },
  "Horris": {
    "aboveTone": "#728eb6",
    "belowTone": "#646464",
    "aboveToneOVERSHOOT": "#81878f",
    "belowToneOVERSHOOT": "#555555",
  },
  // "Laris": {
  //   "aboveTone": "#6F1D1B",
  //   "belowTone": "#BB9457"
  // },
}
// let ABOVETONE = "#a5812f";  // andrea garden book
// let BELOWTONE = "#ff617b";  // andrea garden book




// console.log($fx.getParam("palette_id"));
let ABOVETONE = PALETTE[$fx.getParam("palette_id")].aboveTone;
let BELOWTONE = PALETTE[$fx.getParam("palette_id")].belowTone;
let ABOVETONEOVERSHOOT = PALETTE[$fx.getParam("palette_id")].aboveToneOVERSHOOT;
let BELOWTONEOVERSHOOT = PALETTE[$fx.getParam("palette_id")].belowToneOVERSHOOT;

var HORIZONRATIO = {
  "superUp": 2 / 7,
  "up": 3 / 7,
  "middle": 3.5 / 7,
  "down": 4 / 7,
  "superDown": 5 / 7,
}

var HORIZONRATIO = HORIZONRATIO[$fx.getParam("horizon_id")];

let BACKGROUNDTONE = "#ffffff";


Math.random = $fx.rand;
noise.seed($fx.rand());

CANVASFORMATS = {
  "1:1": {
    "canvasWidth": 900,
    "canvasHeight": 900,
  },
  "16:9": {
    "canvasWidth": 1600,
    "canvasHeight": 900,
  },
  "9:16": {
    "canvasWidth": 900,
    "canvasHeight": 1600,
  },
  "DIN A0, 84,1 cm x 118,9 cm": {
    "canvasWidth": 1272,
    "canvasHeight": 900,
  },
}

// canvasFormatChosen = getRandomFromList(CANVASFORMATS);
var canvasFormatChosen = CANVASFORMATS[$fx.getParam("format_id")];
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
})

// console.log($fx.getFeatures());
// console.log($fx.getParams())

function main() {
  // log the parameters, for debugging purposes, artists won't have to do that
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

  // const getContrastTextColor = backgroundColor =>
  //   ((parseInt(backgroundColor, 16) >> 16) & 0xff) > 0xaa
  //     ? "#000000"
  //     : "#ffffff"

  // const bgcolor = $fx.getParam("color_id").hex.rgba
  // const textcolor = getContrastTextColor(bgcolor.replace("#", ""))

  // // update the document based on the parameters
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
    // "price": PRICE,
    // "editions": EDITIONS,
  });

  createBackground();
  createDrawingGroup();

  createFilterBlack();
  createMaskBlack();

  timeChecker();
  $fx.preview();

  // country_id
  // palette_id
  // horizon_id
  // format_id
  // noiseYParam_id

  if (BULK) {
    var filename = `${$fx.getParam("country_id")}_${$fx.getParam("palette_id")}_${$fx.getParam("horizon_id")}_${$fx.getParam("format_id")}_${$fx.getParam("noiseYParam_id")}_${$fx.hash}.svg`;

    // SAVE SVG
    saveSvg(svgNode, filename);

    setTimeout(reloader, 30000)
  }

}

main()

$fx.on(
  "params:update",
  newRawValues => {
    // opt-out default behaviour
    if (newRawValues.number_id === 5) return false
    // opt-in default behaviour
    return true
  },
  (optInDefault, newValues) => main()
)

// Add event listener on keydown -  https://www.section.io/engineering-education/keyboard-events-in-javascript/ 
document.addEventListener('keydown', (event) => {

  if (event.code == "KeyE") {
    var filename = TITLE + "_" + $fx.hash + "_" + getTimestamp() + ".svg";
    // alert("oida is going down");

    saveSvg(svgNode, filename);
  }

  // Alert the key name and key code on keydown
  // var name = event.key;
  // var code = event.code;
  // alert(`Key pressed ${name} \r\n Key code value: ${code}`);

}, false);


function fireTrigger() {
  // console.log("trigger initiated");

  let grid = new Grid({
    horizonRatio: HORIZONRATIO,
    shortBoxCount: RESOLUTIONBOXCOUNT,
    longSide: LONGSIDE,
    shortSide: SHORTSIDE,
    landscape: LANDSCAPE,
    overshoot: OVERSHOOT,
    aboveTone: ABOVETONE,
    belowTone: BELOWTONE,
    aboveToneOVERSHOOT: ABOVETONEOVERSHOOT,
    belowToneOVERSHOOT: BELOWTONEOVERSHOOT,
    noiseYParam: $fx.getParam("noiseYParam_id"),
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

  if (currentHour > switchHour || (currentHour == switchHour && currentMinute >= switchMinute)) {
    if (OVERSHOOT == false || OVERSHOOT == "start") {
      // console.log("Overshoot!")
      OVERSHOOT = true;
      fireTrigger();
    }
    else {
      // console.log("nothing to do");
    }
  } else {
    if (OVERSHOOT == true || OVERSHOOT == "start") {
      // console.log("No overshoot!")
      OVERSHOOT = false;
      fireTrigger();
    }
    else {
      // console.log("nothing to do");
    }
  }
  // console.log("Overshoot Mode: " + OVERSHOOT);
}


setInterval(timeChecker, 1000 * 60 * 1); // every minute check
// setInterval(timeChecker, 1000); // every second


// turn every color in white and transparency in black
function createFilterBlack() {
  var filterBlack = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filterBlack.setAttribute("id", "filterBlack");
  filterBlack.setAttribute("x", "0");
  filterBlack.setAttribute("y", "0");
  // added
  filterBlack.setAttribute("filterUnits", "objectBoundingBox");
  filterBlack.setAttribute("primitiveUnits", "userSpaceOnUse");
  filterBlack.setAttribute("color-interpolation-filters", "linearRGB");

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



