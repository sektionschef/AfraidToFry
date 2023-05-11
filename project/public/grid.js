
class Grid {
    constructor(data) {
        this.horizonRatio = 4 / 7;

        this.OK = true;  // time limit reached
        this.finished = false;  // flag for completely drawn

        this.DEBUG = data.DEBUG;
        this.marginBoxCount = data.marginBoxCount;
        this.shortBoxCount = data.shortBoxCount; // boxes on the shorter side
        this.drawing = data.drawing;

        this.horizonRow = Math.round(this.shortBoxCount * this.horizonRatio);
        this.boxSize = SHORTSIDE / this.shortBoxCount;
        this.longBoxCount = Math.floor(LONGSIDE / this.boxSize);

        // there should be no margin
        this.shortMargin = SHORTSIDE % this.boxSize;
        // this.shortMargin = 1
        if (this.shortMargin != 0) {
            throw new Error('wtf, there is a margin!');
        }
        this.longMargin = (LONGSIDE % this.boxSize) / 2;
        // console.log("longMargin: " + this.longMargin);

        if (LANDSCAPE == false) {
            this.widthBoxCount = this.shortBoxCount;
            this.heightBoxCount = this.longBoxCount;
            this.widthMargin = this.shortMargin;
            this.heightMargin = this.longMargin;
        } else {
            this.widthBoxCount = this.longBoxCount;
            this.heightBoxCount = this.shortBoxCount;
            this.widthMargin = this.longMargin;
            this.heightMargin = this.shortMargin;
        }

        // this.columns = new Set();
        // this.rows = new Set();
        this.boxes = [];
        // this.stripes = [];
        // this.stripeLines = [];

        // this.buffer = createGraphics(width, height, SVG);
        // this.bufferNoise = createGraphics(width, height, SVG);

        // this.bufferFullGround = createGraphics(width, height, SVG);
        // this.bufferCutOutClouds = createGraphics(width, height, SVG);
        // this.bufferEverywhereSome1 = createGraphics(width, height, SVG);
        // this.bufferSection = createGraphics(width, height, SVG);
        // this.bufferCutOutClouds2 = createGraphics(width, height, SVG);
        // this.bufferCutOutClouds3 = createGraphics(width, height, SVG);
        // this.bufferCutOutCloudsV = createGraphics(width, height, SVG);
        // this.buffer8 = createGraphics(width, height, SVG);
        // this.buffer9 = createGraphics(width, height, SVG);
        // this.buffer10 = createGraphics(width, height, SVG);
        // this.buffer11 = createGraphics(width, height, SVG);
        // this.buffer12 = createGraphics(width, height, SVG);

        // this.bufferZigZag = createGraphics(width, height, SVG);

        this.createBoxes();

        if (this.DEBUG) {
            this.showDebug();
        }

        this.loopsy();
    }

    createBoxes() {

        var index = 0;

        // console.log(this.heightBoxCount);
        // console.log(this.widthBoxCount);

        // h = long, w = short

        for (var h = 0; h < (this.heightBoxCount); h++) {

            for (var w = 0; w < (this.widthBoxCount); w++) {

                var center = { x: this.widthMargin + w * this.boxSize + this.boxSize / 2, y: this.heightMargin + h * this.boxSize + this.boxSize / 2 };

                // corners of the box
                var A = { x: this.widthMargin + w * this.boxSize, y: this.heightMargin + h * this.boxSize };
                var B = vectorAdd(A, { x: this.boxSize, y: 0 });
                var C = vectorAdd(A, { x: this.boxSize, y: this.boxSize });
                var D = vectorAdd(A, { x: 0, y: this.boxSize });

                // var polygonA = insidePolygon([center.x, center.y], polyPoints);
                // var polygonLeft = insidePolygon([center.x, center.y], polyPointsLeft);

                var horizon = h == this.horizonRow;
                var aboveHorizon = h <= this.horizonRow;

                this.boxes.push({
                    "center": center,
                    "offset": { x: getRandomFromInterval(-10, 10), y: getRandomFromInterval(-10, 10) },
                    "A": A,
                    "B": B,
                    "C": C,
                    "D": D,
                    "height": h,
                    "width": w,
                    "index": index,
                    "mask": false,
                    "noiseValue1": noise.simplex2(w / 10, h / 50),
                    // "noiseValue1": noiseValue1,
                    // "noiseValue2": noiseValue2,
                    // "noiseValue3": noiseValue3,
                    // "noiseValue4": noiseValue4,
                    // "noiseValue5": noiseValue5,
                    // "noiseValue6": noiseValue6,
                    // "noiseValue7": noiseValue7,
                    // "noiseValue8": noiseValue8,
                    // "noiseValue9": noiseValue9,
                    // "noiseValue10": noiseValue10,
                    // "noiseValue11": noiseValue11,
                    // "noiseValue12": noiseValue12,
                    // "polygonA": polygonA,
                    // "polygonLeft": polygonLeft,
                    "horizon": horizon,
                    "aboveHorizon": aboveHorizon,
                })
                index += 1;
            }
        }

    }

    showDebug() {
        for (var i = 0; i < this.boxes.length; i++) {

            // only stroke
            this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).stroke({ color: '#f06', opacity: 1, width: 0.5 }).fill("none");
            //  draw noise
            this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).stroke({ color: '#f06', opacity: 1, width: 0.5 }).fill({ color: hslToHex(120, map(this.boxes[i].noiseValue1, -1, 1, 0, 100), 50) })
            // draw differnt colors
            // this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).fill(getRandomFromList(['#f06', "#37ad37ff", "#528bd6ff"]))
        }

    }


    drawSkipMargin(box) {
        if (rescaling_width < rescaling_height) {
            return box.height < (this.marginBoxCount) ||
                box.width < (this.marginBoxCount) ||
                box.width >= (this.shortBoxCount - this.marginBoxCount) ||
                box.height >= (this.longBoxCount - this.marginBoxCount);
        } else {
            return box.height < (this.marginBoxCount) ||
                box.width < (this.marginBoxCount) ||
                box.width >= (this.longBoxCount - this.marginBoxCount) ||
                box.height >= (this.shortBoxCount - this.marginBoxCount);
        }
    }


    digndag(data) {


        let center = { x: data.centerX, y: data.centerY };
        let vertexLength = data.vertexLength;
        let strokeWeighty = data.strokeWeighty;
        let angleMin = data.angleMin;
        let angleMax = data.angleMax;
        let loopCount = data.loopCount;
        let normIt = data.normIt;
        let group = data.group;

        let noiseValue = 0;
        let noiseValueEff = 0;
        let angle = 0;
        let colorList = [];
        // let noiseVars = {};

        // noiseVars = this.getNoiseVars(data.noiseNumber);
        noiseValue = data.noiseValue;
        colorList = data.colorList;

        if (normIt) {
            noiseValueEff = map(noiseValue, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, 1);
        } else {
            noiseValueEff = noiseValue;
        }

        if (noiseValueEff > data.cutOutValue) {

            // let colorSelect = constrain(Math.round(map(noiseValue, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            let colorSelect = 1;
            // console.log(noiseVars.noiseValueMin);
            // console.log(noiseVars.noiseValueMax);
            // console.log(colorList.length - 1);
            // console.log(colorSelect);

            // point and add new point
            var oldPoint = center;
            var newPoint = oldPoint;
            // console.log(angleBetweenPoints(pointA, pointB));
            var polyLineString = createCoordString(oldPoint);

            for (var i = 0; i < loopCount; i++) {

                if (data.noiseAngle) {
                    angle = map(noiseValueEff, -1, 1, 0, 2 * Math.PI) + getRandomFromInterval(-0.5, 0.5);
                } else {
                    angle = getRandomFromInterval(angleMin, angleMax);
                }

                // make spots not lines
                if (data.revert) {
                    if (i % 2 != 0) {
                        angle = angle - Math.PI;
                    }
                }

                var newPoint = vectorAdd(newPoint, vectorFromAngle(angle, vertexLength * getRandomFromInterval(0.9, 1.1)));

                polyLineString = polyLineString.concat(" ", createCoordString(newPoint));

            }

            // which stroke cap?
            this.drawing.polyline(polyLineString).fill('none').stroke({ width: strokeWeighty, color: colorList[colorSelect] });
        }






    }


    loopsy() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,  // nicht center?
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y, // nicht center?
                        noiseNumber: 11,
                        noiseNumberB: 12,
                        noiseValue: 0.5, // this.boxes[i].noiseValue12,
                        vertexLength: 20, // map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: 20,
                        colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                );
            } else {

            }
        }

    }

}