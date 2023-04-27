// MARGIN IN BEIDE RICHTUNGEN, X UND Y


class Grid2 {
    constructor(data) {

        this.horizonRatio = 1 / 7 * 4;
        this.OK = true;

        this.finished = false;  // flag for completely drawn
        this.STARTFRAME = frameCount;  // starts with 0

        this.DEBUG = data.DEBUG;
        this.marginBoxCount = data.marginBoxCount;
        this.shortBoxCount = data.shortBoxCount; // boxes on the shorter side

        this.horizonRow = Math.round(this.shortBoxCount * this.horizonRatio);


        this.paletteBackgrounda = color("#a2c1ca");
        this.paletteBackgroundb = color("#5b7466");

        // this.shapeColor = color("#617580");

        this.fullGrounda = "#bfdff0";
        this.colorPicker = createColorPicker(this.fullGrounda);
        this.colorPicker.position(0, height + 5);
        // this.paletteFullGrounda = this.colorPicker.color();

        if (this.OK == true) {
            // this.paletteFullGrounda = tenPaletter("#bfdff0", 10, 1, 6, 2);
            this.paletteFullGrounda = tenPaletter(this.colorPicker.value(), 10, 1, 6, 2);
            this.paletteFullGroundb = tenPaletter("#95c9a3", 10, 1, 6, 2);

            this.paletteCutOutCloudsa = tenPaletter("#869bb8", 10, 1, 5, 1);
            this.paletteCutOutCloudsb = tenPaletter("#6cbe9c", 10, 1, 2, 1);

            this.paletteCutOutClouds2a = tenPaletter("#49636d", 10, 5, 5, 5);
            this.paletteCutOutClouds2b = tenPaletter("#dbf1e0", 10, 5, 5, 5);

            this.paletteCutOutClouds3a = tenPaletter("#8393a1", 10, 1, 15, 1);
            this.paletteCutOutClouds3b = tenPaletter("#a1b3a9", 10, 1, 15, 1);

            this.paletteSectiona1 = tenPaletter("#8595aa", 10, 1, 2, 1);
            this.paletteSectiona2 = tenPaletter("#3e6070", 10, 1, 2, 1);
            this.paletteSectiona3 = tenPaletter("#4b4e52", 10, 1, 2, 1);
            this.paletteSectionb1 = tenPaletter("#7aa186", 10, 1, 2, 1);
            this.paletteSectionb2 = tenPaletter("#7ca16b", 10, 1, 2, 1);
            this.paletteSectionb3 = tenPaletter("#313b34", 10, 1, 2, 1);

            this.paletteZigZag = tenPaletter("#4a4c4d", 10, 0, 20, 0);


            this.palettedrawCutOutCloudsVa = tenPaletter("#9fc5d4", 10, 5, 5, 1);
            this.palettedrawCutOutCloudsVb = tenPaletter("#c0d3c5", 10, 5, 5, 1);
        } else {
            this.paletteFullGrounda = tenPaletter("#cea6a1", 10, 1, 6, 2);
            this.paletteFullGroundb = tenPaletter("#e0d995", 10, 1, 6, 2);

            this.paletteCutOutCloudsa = tenPaletter("#869bb8", 10, 1, 5, 1);
            this.paletteCutOutCloudsb = tenPaletter("#6cbe9c", 10, 1, 2, 1);

            this.paletteCutOutClouds2a = tenPaletter("#49636d", 10, 5, 5, 5);
            this.paletteCutOutClouds2b = tenPaletter("#dbf1e0", 10, 5, 5, 5);

            this.paletteCutOutClouds3a = tenPaletter("#8393a1", 10, 1, 15, 1);
            this.paletteCutOutClouds3b = tenPaletter("#a1b3a9", 10, 1, 15, 1);

            this.paletteSectiona1 = tenPaletter("#8595aa", 10, 1, 2, 1);
            this.paletteSectiona2 = tenPaletter("#6b9ba1", 10, 1, 2, 1);
            this.paletteSectiona3 = tenPaletter("#4b4e52", 10, 1, 2, 1);
            this.paletteSectionb1 = tenPaletter("#7aad88", 10, 1, 2, 1);
            this.paletteSectionb2 = tenPaletter("#61926e", 10, 1, 2, 1);
            this.paletteSectionb3 = tenPaletter("#55755e", 10, 1, 2, 1);

            this.paletteZigZag = tenPaletter("#4a4c4d", 10, 0, 20, 0);


            this.palettedrawCutOutCloudsVa = tenPaletter("#9fc5d4", 10, 5, 5, 1);
            this.palettedrawCutOutCloudsVb = tenPaletter("#c0d3c5", 10, 5, 5, 1);

        }

        this.paletteHorizon1 = tenPaletter("#636569", 10, 0, 1, 1); // triadicCreator("#e4eef7", 0, -13, -5, 0, 0, 0, 0, 13, 5);
        this.paletteHorizon2 = tenPaletter("#575a64", 10, 0, 1, 1); // triadicCreator("#bcc7cc", 0, -13, -5, 0, 0, 5, 0, 13, 5);

        this.noise1 = new Noise(0.01, 0.1, 0);
        // this.noise2 = new Noise(0.01, 0.2, 0);
        this.noise2 = new Noise(0.06, 0.03, 0);
        this.noise3 = new Noise(0.6, 0.4, 0);
        this.noise4 = new Noise(0.7, 0.8, 0);
        this.noise5 = new Noise(0.01, 0.03, 0);
        this.noise6 = new Noise(0.03, 0.03, 0);
        this.noise7 = new Noise(0.02, 0.2, 0);
        this.noise8 = new Noise(0.02, 0.2, 0);
        this.noise9 = new Noise(0.02, 0.3, 0);
        this.noise10 = new Noise(0.1, 0.9, 0);
        this.noise11 = new Noise(0.1, 0.01, 0);  // vertical
        this.noise12 = new Noise(0.2, 0.01, 0);  // vertical 

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

        if (width < height) {
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

        this.columns = new Set();
        this.rows = new Set();
        this.boxes = [];
        this.stripes = [];
        this.stripeLines = [];

        this.buffer = createGraphics(width, height, SVG);
        this.bufferNoise = createGraphics(width, height, SVG);

        this.bufferFullGround = createGraphics(width, height, SVG);
        this.bufferCutOutClouds = createGraphics(width, height, SVG);
        this.bufferEverywhereSome1 = createGraphics(width, height, SVG);
        this.bufferSection = createGraphics(width, height, SVG);
        this.bufferCutOutClouds2 = createGraphics(width, height, SVG);
        this.bufferCutOutClouds3 = createGraphics(width, height, SVG);
        this.bufferCutOutCloudsV = createGraphics(width, height, SVG);
        this.buffer8 = createGraphics(width, height, SVG);
        this.buffer9 = createGraphics(width, height, SVG);
        this.buffer10 = createGraphics(width, height, SVG);
        this.buffer11 = createGraphics(width, height, SVG);
        this.buffer12 = createGraphics(width, height, SVG);

        this.bufferZigZag = createGraphics(width, height, SVG);

        this.createBoxes();
        if (this.DEBUG) {
            this.showDebug();
        }

        // DEBUG NOISE
        // this.drawNoise(1);
        // this.drawNoise(2);
        // this.drawNoise(3);
        // this.drawNoise(4);
        // this.drawNoise(5);
        // this.drawNoise(6);
        // this.drawNoise(7);
        // this.drawNoise(8);
        // this.drawNoise(9);
        // this.drawNoise(10);

        // this.drawNoise(11);
        // this.drawNoise(12);

        this.draw();
    }

    createBoxes() {

        var index = 0;

        // console.log(this.heightBoxCount);
        // console.log(this.widthBoxCount);

        // h = long, w = short

        for (var h = 0; h < (this.heightBoxCount); h++) {
            this.noise1.resetSoff();
            this.noise2.resetSoff();
            this.noise3.resetSoff();
            this.noise4.resetSoff();
            this.noise5.resetSoff();
            this.noise6.resetSoff();
            this.noise7.resetSoff();
            this.noise8.resetSoff();
            this.noise9.resetSoff();
            this.noise10.resetSoff();
            this.noise11.resetSoff();
            this.noise12.resetSoff();

            for (var w = 0; w < (this.widthBoxCount); w++) {

                var center = createVector(this.widthMargin + w * this.boxSize + this.boxSize / 2, this.heightMargin + h * this.boxSize + this.boxSize / 2);

                // corners of the box
                var A = createVector(this.widthMargin + w * this.boxSize, this.heightMargin + h * this.boxSize);
                var B = p5.Vector.add(A, createVector(this.boxSize, 0));
                var C = p5.Vector.add(A, createVector(this.boxSize, this.boxSize));
                var D = p5.Vector.add(A, createVector(0, this.boxSize));

                var noiseValue1 = this.noise1.createNoiseValue();
                var noiseValue2 = this.noise2.createNoiseValue();
                var noiseValue3 = this.noise3.createNoiseValue();
                var noiseValue4 = this.noise4.createNoiseValue();
                var noiseValue5 = this.noise5.createNoiseValue();
                var noiseValue6 = this.noise6.createNoiseValue();
                var noiseValue7 = this.noise7.createNoiseValue();
                var noiseValue8 = this.noise8.createNoiseValue();
                var noiseValue9 = this.noise9.createNoiseValue();
                var noiseValue10 = this.noise10.createNoiseValue();
                var noiseValue11 = this.noise11.createNoiseValue();
                var noiseValue12 = this.noise12.createNoiseValue();

                var polygonA = insidePolygon([center.x, center.y], polyPoints);
                var polygonLeft = insidePolygon([center.x, center.y], polyPointsLeft);

                var horizon = h == this.horizonRow;
                var aboveHorizon = h <= this.horizonRow;

                this.boxes.push({
                    "center": center,
                    "offset": createVector(getRandomFromInterval(-10, 10), getRandomFromInterval(-10, 10)),
                    "A": A,
                    "B": B,
                    "C": C,
                    "D": D,
                    "height": h,
                    "width": w,
                    "index": index,
                    "mask": false,
                    "noiseValue1": noiseValue1,
                    "noiseValue2": noiseValue2,
                    "noiseValue3": noiseValue3,
                    "noiseValue4": noiseValue4,
                    "noiseValue5": noiseValue5,
                    "noiseValue6": noiseValue6,
                    "noiseValue7": noiseValue7,
                    "noiseValue8": noiseValue8,
                    "noiseValue9": noiseValue9,
                    "noiseValue10": noiseValue10,
                    "noiseValue11": noiseValue11,
                    "noiseValue12": noiseValue12,
                    "polygonA": polygonA,
                    "polygonLeft": polygonLeft,
                    "horizon": horizon,
                    "aboveHorizon": aboveHorizon,
                })
                index += 1;

                this.noise1.updateSoff();
                this.noise2.updateSoff();
                this.noise3.updateSoff();
                this.noise4.updateSoff();
                this.noise5.updateSoff();
                this.noise6.updateSoff();
                this.noise7.updateSoff();
                this.noise8.updateSoff();
                this.noise9.updateSoff();
                this.noise10.updateSoff();
                this.noise11.updateSoff();
                this.noise12.updateSoff();
            }
            this.noise1.updateLoff();
            this.noise1.updateZoff();
            this.noise2.updateLoff();
            this.noise2.updateZoff();
            this.noise3.updateLoff();
            this.noise3.updateZoff();
            this.noise4.updateLoff();
            this.noise4.updateZoff();
            this.noise5.updateLoff();
            this.noise5.updateZoff();
            this.noise6.updateLoff();
            this.noise6.updateZoff();
            this.noise7.updateLoff();
            this.noise7.updateZoff();
            this.noise8.updateLoff();
            this.noise8.updateZoff();
            this.noise9.updateLoff();
            this.noise9.updateZoff();
            this.noise10.updateLoff();
            this.noise10.updateZoff();
            this.noise11.updateLoff();
            this.noise11.updateZoff();
            this.noise12.updateLoff();
            this.noise12.updateZoff();
        }

    }

    showDebug() {
        this.buffer.push();
        this.buffer.noFill();
        this.buffer.strokeWeight(0.1);
        this.buffer.stroke("black");
        this.buffer.rectMode(CORNERS);

        for (var i = 0; i < this.boxes.length; i++) {
            this.buffer.rect(this.boxes[i].A.x, this.boxes[i].A.y, this.boxes[i].C.x, this.boxes[i].C.y);
            // this.buffer.point(this.boxes[i].center.x, this.boxes[i].center.y);
        }
        this.buffer.pop();
    }

    drawSkipMargin(box) {
        if (width < height) {
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

    // for DEBUGGING Noise
    drawNoise(number) {

        let noiseVars = this.getNoiseVars(number);
        // console.log(noiseVars.noiseValueName);
        // console.log(noiseVars.noiseValueMin);
        // console.log(noiseVars.noiseValueMax);

        this.buffer.push();
        this.buffer.noStroke();
        this.buffer.rectMode(CORNERS);

        for (var i = 0; i < this.boxes.length; i++) {
            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            let noiseValueLoop = this.boxes[i][noiseVars.noiseValueName];
            // let noiseValueNorm = map(noiseValueLoop, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, 1);
            let noiseValueColor = Math.round(map(noiseValueLoop, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, 255));

            // console.log(noiseValueColor);
            this.buffer.fill(noiseValueColor);

            // this.buffer.fill("red");
            this.buffer.rect(this.boxes[i].A.x, this.boxes[i].A.y, this.boxes[i].C.x, this.boxes[i].C.y);
        }
        this.buffer.pop();
    }

    drawBackdrop() {

        // this.horizonRow

        this.buffer.push();
        this.buffer.noStroke();
        this.buffer.fill(this.paletteBackgrounda)
        this.buffer.rect(0, 0, this.buffer.width, this.buffer.height * this.horizonRatio);
        this.buffer.pop();

        this.buffer.push();
        this.buffer.noStroke();
        this.buffer.fill(this.paletteBackgroundb)
        this.buffer.rect(0, this.buffer.height * this.horizonRatio, this.buffer.width, this.buffer.height * this.horizonRatio);
        this.buffer.pop();
    }

    drawZigZag() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            this.zigzag2(
                {
                    centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                    centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                    noiseNumber: 1,
                    noiseValue: this.boxes[i].noiseValue2,
                    vertexLength: map(this.boxes[i].noiseValue2, this.noise2.noiseValueMin, this.noise2.noiseValueMax, 1, 20), // 15,
                    strokeWeighty: map(this.boxes[i].noiseValue2, this.noise2.noiseValueMin, this.noise2.noiseValueMax, 0.05, 0.3), // 1,
                    // angleMin: 2 * PI / 12 * 11.5,
                    // angleMax: 2 * PI / 12 * 12.5,
                    angleMin: 0,
                    angleMax: PI,
                    revert: true,
                    cutOutValue: 0.35,
                    loopCount: map(this.boxes[i].noiseValue2, this.noise2.noiseValueMin, this.noise2.noiseValueMax, 1, 10),
                    colorList: this.paletteZigZag,
                    noiseAngle: false,
                    normIt: true,
                    buffer: this.bufferZigZag,
                }
            );
        }
    }

    // drawfullGround() {

    //     let randomIndex = getRandomIndex(this.boxes.length);
    //     // let showTrigger = randomIndex.length / 4 * 3;

    //     let i = 0;

    //     for (var v = 0; v < randomIndex.length; v++) {

    //         i = randomIndex[v];

    //         // let offset = getRandomFromInterval(-10, 10);

    //         // if (i == showTrigger) {
    //         // this.drawShape();
    //         // }

    //         if (this.drawSkipMargin(this.boxes[i])) {
    //             continue;
    //         }

    //         if (this.boxes[i].horizon) {
    //             this.digndag2(
    //                 {
    //                     centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
    //                     centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
    //                     noiseNumber: 3,
    //                     noiseValue: this.boxes[i].noiseValue3,
    //                     // vertexLength: map(this.boxes[i].noiseValue1, this.noiseValue1Min, this.noiseValue1Max, 20, 50), // 15,
    //                     vertexLength: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 10, 50), // 15,
    //                     strokeWeighty: 1,
    //                     angleMin: 2 * PI / 12 * 8.5,
    //                     angleMax: 2 * PI / 12 * 9.5,
    //                     revert: true,
    //                     cutOutValue: 0,
    //                     loopCount: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 10, 20), // 20,
    //                     colorList: this.paletteHorizon1,
    //                     noiseAngle: false,
    //                     normIt: true,
    //                     buffer: this.bufferFullGround,
    //                 }
    //             );
    //         } else if (this.boxes[i].aboveHorizon) {
    //             this.digndag2(
    //                 {
    //                     centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
    //                     centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
    //                     noiseNumber: 1,
    //                     noiseValue: this.boxes[i].noiseValue1,
    //                     vertexLength: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 20, 50), // 15,
    //                     strokeWeighty: 1, //map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 1, 2), // 1,
    //                     angleMin: 2 * PI / 12 * 11.5,
    //                     angleMax: 2 * PI / 12 * 12.5,
    //                     // angleMin: 2 * PI / 12 * 11.5,
    //                     // angleMax: 2 * PI / 12 * 12.5,
    //                     revert: true,
    //                     cutOutValue: 0,
    //                     loopCount: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 10, 20),
    //                     colorList: this.paletteFullGrounda,
    //                     noiseAngle: false,
    //                     normIt: true,
    //                     buffer: this.bufferFullGround,
    //                 }
    //             );
    //         } else {
    //             this.digndag2(
    //                 {
    //                     centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
    //                     centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
    //                     noiseNumber: 1,
    //                     noiseValue: this.boxes[i].noiseValue1,
    //                     vertexLength: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 20, 50), // 15,
    //                     strokeWeighty: 1, // map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 1, 2), // 1,
    //                     // angleMin: 2 * PI / 12 * 11.5,
    //                     // angleMax: 2 * PI / 12 * 12.5,
    //                     angleMin: 2 * PI / 12 * 11.50,
    //                     angleMax: 2 * PI / 12 * 12.50,
    //                     revert: true,
    //                     cutOutValue: 0,
    //                     loopCount: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 10, 20),
    //                     colorList: this.paletteFullGroundb,
    //                     noiseAngle: false,
    //                     normIt: true,
    //                     buffer: this.bufferFullGround,
    //                 }
    //             );
    //         }
    //     }
    // }

    drawfullGround() {

        let randomIndex = getRandomIndex(this.boxes.length);
        // let showTrigger = randomIndex.length / 4 * 3;

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            // let offset = getRandomFromInterval(-10, 10);

            // if (i == showTrigger) {
            // this.drawShape();
            // }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].aboveHorizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 1,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 10, 30), // 15,
                        strokeWeighty: 5, //map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 1, 2), // 1,
                        angleMin: 2 * PI / 12 * 11.5,
                        angleMax: 2 * PI / 12 * 12.5,
                        // angleMin: 2 * PI / 12 * 11.5,
                        // angleMax: 2 * PI / 12 * 12.5,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 3, 5),
                        colorList: this.paletteFullGrounda,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferFullGround,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 1,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 10, 30), // 15,
                        strokeWeighty: 5, // map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 1, 2), // 1,
                        // angleMin: 2 * PI / 12 * 11.5,
                        // angleMax: 2 * PI / 12 * 12.5,
                        angleMin: 2 * PI / 12 * 11.50,
                        angleMax: 2 * PI / 12 * 12.50,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue1, this.noise1.noiseValueMin, this.noise1.noiseValueMax, 3, 5),
                        colorList: this.paletteFullGroundb,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferFullGround,
                    }
                );
            }
        }
    }

    drawCutOutClouds() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 9,
                        noiseValue: this.boxes[i].noiseValue9,
                        noiseValueB: this.boxes[i].noiseValue10,
                        vertexLength: map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 5, 15),
                        strokeWeighty: 0.4, //map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1),//0.5,
                        // angleMin: 2 * PI / 12 * 9,
                        // angleMax: 2 * PI / 12 * 11,
                        angleMin: 2 * PI / 12 * 5,
                        angleMax: 2 * PI / 12 * 7,
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.paletteCutOutCloudsa,  // 5
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferCutOutClouds,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 9,
                        noiseNumberB: 10,
                        noiseValue: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        // angleMin: 2 * PI / 12 * 9,
                        // angleMax: 2 * PI / 12 * 11,
                        angleMin: 2 * PI / 12 * 5,
                        angleMax: 2 * PI / 12 * 7,
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.paletteCutOutCloudsb,
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferCutOutClouds,
                    }
                );
            }
        }

    }

    drawEverywhereSome1() {


        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];
            // let offset = getRandomFromInterval(-10, 10);

            // if (i == showTrigger) {
            // this.drawShape();
            // }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }


            if (this.boxes[i].horizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 3,
                        noiseValue: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noise3.noiseValueMin, this.noise3.noiseValueMax, 10, 20), // 15,
                        strokeWeighty: 0.4, //map(this.boxes[i].noiseValue3, this.noise3.noiseValueMin, this.noise3.noiseValueMax, 0.2, 1), // 1,
                        angleMin: 2 * PI / 12 * 11,
                        angleMax: 2 * PI / 12 * 13,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: 30,
                        colorList: this.paletteHorizon1,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferEverywhereSome1,
                    }
                );

            } else if (this.boxes[i].aboveHorizon) {


                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 3,
                        noiseValue: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        // vertexLength: 5,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noise3.noiseValueMin, this.noise3.noiseValueMax, 10, 30),
                        strokeWeighty: 0.4, //map(this.boxes[i].noiseValue3, this.noise3.noiseValueMin, this.noise3.noiseValueMax, 0.5, 1.5), // 0.5,
                        angleMin: 2 * PI / 12 * 4,
                        angleMax: 2 * PI / 12 * 6,
                        // angleMin: map(this.boxes[i].noiseValue5, 0, 1, 0, -PI),
                        // angleMax: map(this.boxes[i].noiseValue5, 0, 1, 0, PI),
                        revert: true,
                        cutOutValue: 0.65,
                        loopCount: map(this.boxes[i].noiseValue3, this.noise3.noiseValueMin, this.noise3.noiseValueMax, 3, 20), // 10,
                        colorList: this.paletteFullGrounda, // 3
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferEverywhereSome1,
                    }
                );

            } else {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 3,
                        noiseValue: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noise3.noiseValueMin, this.noise3.noiseValueMax, 10, 30),
                        strokeWeighty: 0.4, //map(this.boxes[i].noiseValue4, this.noise4.noiseValueMin, this.noise4.noiseValueMax, 0.5, 1.5), // 0.5,
                        angleMin: 2 * PI / 12 * 4,
                        angleMax: 2 * PI / 12 * 6,
                        // angleMin: map(this.boxes[i].noiseValue5, 0, 1, 0, -PI),
                        // angleMax: map(this.boxes[i].noiseValue5, 0, 1, 0, PI),
                        revert: true,
                        cutOutValue: 0.65,
                        loopCount: map(this.boxes[i].noiseValue4, this.noise4.noiseValueMin, this.noise4.noiseValueMax, 3, 20), //10,
                        colorList: this.paletteFullGroundb,
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferEverywhereSome1,
                    }
                );
            }

        }
    }

    drawSection() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // speed up if small areas check first.

            if (this.boxes[i].height <= this.horizonRow + 3 && this.boxes[i].height > this.horizonRow) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 10,
                        noiseValue: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 1, 25),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 0.3, 0.5),// 0.5,
                        angleMin: 2 * PI / 12 * 6.5,
                        angleMax: 2 * PI / 12 * 8.5,
                        revert: true,
                        cutOutValue: 0.3,
                        loopCount: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 10, 90), // 10,
                        colorList: this.paletteSectionb3,  // 5
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferSection,
                    }
                );
            } else if (this.boxes[i].height >= this.horizonRow - 3 && this.boxes[i].height < this.horizonRow) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 10,
                        noiseValue: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 1, 25),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 0.3, 0.5),// 0.5,
                        angleMin: 2 * PI / 12 * 0.5,
                        angleMax: 2 * PI / 12 * 4.5,
                        revert: true,
                        cutOutValue: 0.3,
                        loopCount: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 10, 90), // 10,
                        colorList: this.paletteSectiona3,  // 5
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferSection,
                    }
                );
            } else if (this.boxes[i].height >= this.horizonRow - 7 && this.boxes[i].height < this.horizonRow) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 10,
                        noiseValue: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 1, 45),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 0.3, 0.5),// 0.5,
                        angleMin: 2 * PI / 12 * 0.5,
                        angleMax: 2 * PI / 12 * 2.5,
                        revert: true,
                        cutOutValue: 0.3,
                        loopCount: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 10, 50), // 10,
                        colorList: this.paletteSectiona2,  // 5
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferSection,
                    }
                );
            } else if (this.boxes[i].height <= this.horizonRow + 7 && this.boxes[i].height > this.horizonRow) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 10,
                        noiseValue: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 1, 45),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 0.3, 0.5),// 0.5,
                        angleMin: 2 * PI / 12 * 9.5,
                        angleMax: 2 * PI / 12 * 11.5,
                        revert: true,
                        cutOutValue: 0.3,
                        loopCount: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 10, 50), // 10,
                        colorList: this.paletteSectionb2,  // 5
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferSection,
                    }
                );
            } else if (this.boxes[i].height >= this.horizonRow - 20 && this.boxes[i].height < this.horizonRow) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 10,
                        noiseValue: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 1, 45),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 0.3, 0.5),// 0.5,
                        angleMin: 2 * PI / 12 * 0.5,
                        angleMax: 2 * PI / 12 * 2.5,
                        revert: true,
                        cutOutValue: 0.6,
                        loopCount: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 10, 30), // 10,
                        colorList: this.paletteSectiona1,  // 5
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferSection,
                    }
                );
            } else if (this.boxes[i].height <= this.horizonRow + 20 && this.boxes[i].height > this.horizonRow) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 10,
                        noiseValue: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 1, 45),
                        strokeWeighty: 0.6, // map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 0.3, 0.5),// 0.5,
                        angleMin: 2 * PI / 12 * 4.5,
                        angleMax: 2 * PI / 12 * 6.5,
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue10, this.noise10.noiseValueMin, this.noise10.noiseValueMax, 10, 30), // 10,
                        colorList: this.paletteSectionb1,  // 5
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferSection,
                    }
                );
            } else {

            }
        }
    }



    drawCutOutClouds2() {

        let randomIndex = getRandomIndex(this.boxes.length);
        // let showTrigger = randomIndex.length / 4 * 3;

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            // let offset = getRandomFromInterval(-10, 10);

            // if (i == showTrigger) {
            // this.drawShape();
            // }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].horizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 3,
                        noiseValue: this.boxes[i].noiseValue3,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noise3.noiseValueMin, this.noise3.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // 0.8,
                        angleMin: 2 * PI / 12 * 11.5,
                        angleMax: 2 * PI / 12 * 0.5,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: 10,
                        colorList: this.paletteHorizon1,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferCutOutClouds2,
                    }
                );

            } else if (this.boxes[i].aboveHorizon) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 5,
                        noiseValue: this.boxes[i].noiseValue5,
                        vertexLength: map(this.boxes[i].noiseValue5, this.noise5.noiseValueMin, this.noise5.noiseValueMax, 1, 3),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue5, this.noise5.noiseValueMin, this.noise5.noiseValueMax, 0.4, 1.2), //0.2,
                        angleMin: 2 * PI / 12 * 0,
                        angleMax: 2 * PI / 12 * 12,
                        revert: true,
                        cutOutValue: 0.8,
                        loopCount: map(this.boxes[i].noiseValue5, this.noise5.noiseValueMin, this.noise5.noiseValueMax, 1, 150),
                        colorList: this.paletteCutOutClouds2a,  // 5
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferCutOutClouds2,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 5,
                        noiseValue: this.boxes[i].noiseValue6,
                        vertexLength: map(this.boxes[i].noiseValue6, this.noise6.noiseValueMin, this.noise6.noiseValueMax, 1, 3),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue5, this.noise5.noiseValueMin, this.noise5.noiseValueMax, 0.4, 1.2), //0.2,
                        angleMin: 2 * PI / 12 * 0,
                        angleMax: 2 * PI / 12 * 12,
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue6, this.noise6.noiseValueMin, this.noise6.noiseValueMax, 1, 150),
                        colorList: this.paletteCutOutClouds2b,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferCutOutClouds2,
                    }
                );
            }

        }
    }

    drawCutOutClouds3() {

        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];
            // let offset = getRandomFromInterval(-10, 10);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].aboveHorizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 7,
                        noiseValue: this.boxes[i].noiseValue7,
                        noiseValueB: this.boxes[i].noiseValue8,
                        vertexLength: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 1, 25),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue7, 0, 1, 0.1, 0.2), //0.1,
                        angleMin: 2 * PI / 12 * 5,
                        angleMax: 2 * PI / 12 * 6,
                        // angleMin: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        // angleMax: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 1, 25),
                        colorList: this.paletteCutOutClouds3a,
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferCutOutClouds3,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 7,
                        noiseNumberB: 8,
                        noiseValue: this.boxes[i].noiseValue7,
                        vertexLength: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 1, 25),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue7, 0, 1, 0.1, 0.2), //0.1,
                        angleMin: 2 * PI / 12 * 5,
                        angleMax: 2 * PI / 12 * 6,
                        // angleMin: map(this.boxes[i].noiseValue7, 0, 1, -PI, -PI * 1),
                        // angleMax: map(this.boxes[i].noiseValue7, 0, 1, -PI, -PI * 1.8),
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 1, 25),
                        colorList: this.paletteCutOutClouds3b,
                        noiseAngle: true,
                        normIt: true,
                        buffer: this.bufferCutOutClouds3,
                    }
                );
            }
        }
    }

    drawCutOutCloudsV() {

        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];
            // let offset = getRandomFromInterval(-10, 10);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // FIRST NOISE
            if (this.boxes[i].aboveHorizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 11,
                        noiseValue: this.boxes[i].noiseValue11,
                        vertexLength: map(this.boxes[i].noiseValue11, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 1, 3),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue11, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * PI / 12 * 0,
                        angleMax: 2 * PI / 12 * 12,
                        // angleMin: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        // angleMax: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        revert: true,
                        cutOutValue: 0.6,
                        loopCount: map(this.boxes[i].noiseValue11, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 1, 120),
                        colorList: this.palettedrawCutOutCloudsVa,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferCutOutCloudsV,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 11,
                        noiseNumberB: 12,
                        noiseValue: this.boxes[i].noiseValue12,
                        vertexLength: map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 1, 3),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * PI / 12 * 0,
                        angleMax: 2 * PI / 12 * 12,
                        // angleMin: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        // angleMax: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        revert: true,
                        cutOutValue: 0.6,
                        loopCount: map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 1, 120),
                        colorList: this.palettedrawCutOutCloudsVb,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferCutOutCloudsV,
                    }
                );
            }

            // SECOND NOISE
            if (this.boxes[i].aboveHorizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 11,
                        noiseNumberB: 12,
                        noiseValue: this.boxes[i].noiseValue11,
                        vertexLength: map(this.boxes[i].noiseValue11, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue11, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * PI / 12 * 1,
                        angleMax: 2 * PI / 12 * 3,
                        // angleMin: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        // angleMax: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        revert: true,
                        cutOutValue: 0.7,
                        loopCount: map(this.boxes[i].noiseValue11, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 10, 20),
                        colorList: this.palettedrawCutOutCloudsVa,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferCutOutCloudsV,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumber: 11,
                        noiseNumberB: 12,
                        noiseValue: this.boxes[i].noiseValue12,
                        vertexLength: map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * PI / 12 * 1,
                        angleMax: 2 * PI / 12 * 3,
                        // angleMin: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        // angleMax: map(this.boxes[i].noiseValue7, this.noise7.noiseValueMin, this.noise7.noiseValueMax, 0, 2 * PI),
                        revert: true,
                        cutOutValue: 0.7,
                        loopCount: map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 10, 20),
                        colorList: this.palettedrawCutOutCloudsVb,
                        noiseAngle: false,
                        normIt: true,
                        buffer: this.bufferCutOutCloudsV,
                    }
                );
            }
        }
    }

    digndag2(data) {
        let center = createVector(data.centerX, data.centerY);
        let vertexLength = data.vertexLength;
        let strokeWeighty = data.strokeWeighty;
        let angleMin = data.angleMin;
        let angleMax = data.angleMax;
        let loopCount = data.loopCount;
        let vertexColorDistort = 10;  // may lead to errors
        let normIt = data.normIt;
        let buffer = data.buffer;

        let noiseValue = 0;
        let noiseValueEff = 0;
        let angle = 0;
        let colorList = [];
        let noiseVars = {};

        noiseVars = this.getNoiseVars(data.noiseNumber);
        noiseValue = data.noiseValue;
        colorList = data.colorList;

        if (normIt) {
            noiseValueEff = map(noiseValue, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, 1);
        } else {
            noiseValueEff = noiseValue;
        }

        if (noiseValueEff > data.cutOutValue) {

            // if (loopSensitive) {
            // loopCount = map(noiseValue, 0, 1, 5, 30);
            // }
            // loopCount = 10;

            // let colorSelect = Math.floor(noiseValue * (colorList.length));
            // let colorSelect = Math.floor(noiseValue * (this.noiseValue1Max - this.noiseValue1Min) + this.noiseValue1Min);
            // let colorSelect = constrain(Math.round(map(noiseValue, this.noiseValue1Min, this.noiseValue1Max, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            // let colorSelect = constrain(Math.round(map(noiseValue, 0, 1, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            let colorSelect = constrain(Math.round(map(noiseValue, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            // console.log(noiseVars.noiseValueMin);
            // console.log(noiseVars.noiseValueMax);
            // console.log(colorList.length - 1);
            // console.log(colorSelect);

            buffer.push();
            buffer.noFill();
            buffer.strokeWeight(strokeWeighty);
            buffer.strokeCap(SQUARE);

            buffer.beginShape();

            let oldAdder = center;
            let newAdder = oldAdder;
            let strokeColor = colorList[colorSelect]; // distortColorSuperNew(colorList[colorSelect], 10); //
            buffer.vertex(oldAdder.x, oldAdder.y)

            for (var i = 0; i < loopCount; i++) {
                oldAdder = newAdder;

                if (data.noiseAngle) {
                    angle = map(noiseValueEff, 0, 1, 0, 2 * PI) + getRandomFromInterval(-0.5, 0.5);
                } else {
                    angle = getRandomFromInterval(angleMin, angleMax);
                }

                // make spots not lines
                if (data.revert) {
                    if (i % 2 != 0) {
                        angle = angle - PI;
                    }
                }

                let v = p5.Vector.fromAngle(angle, vertexLength * getRandomFromInterval(0.9, 1.1));

                newAdder = p5.Vector.add(oldAdder, v);
                strokeColor = distortColorSuperNew(colorList[colorSelect], vertexColorDistort);
                buffer.stroke(strokeColor);
                buffer.vertex(newAdder.x, newAdder.y);
            }

            buffer.endShape();
            buffer.pop();
        }
    }

    zigzag2(data) {
        let center = createVector(data.centerX, data.centerY);
        let vertexLength = data.vertexLength;
        let strokeWeighty = data.strokeWeighty;
        let angleMin = data.angleMin;
        let angleMax = data.angleMax;
        let loopCount = data.loopCount;
        let vertexColorDistort = 10;  // may lead to errors
        let normIt = data.normIt;
        let buffer = data.buffer;

        let noiseValue = 0;
        let noiseValueEff = 0;
        let angle = 0;
        let colorList = [];
        let noiseVars = {};

        noiseVars = this.getNoiseVars(data.noiseNumber);
        noiseValue = data.noiseValue;
        colorList = data.colorList;

        if (normIt) {
            noiseValueEff = map(noiseValue, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, 1);
        } else {
            noiseValueEff = noiseValue;
        }

        if (noiseValueEff > data.cutOutValue) {

            // if (loopSensitive) {
            // loopCount = map(noiseValue, 0, 1, 5, 30);
            // }
            // loopCount = 10;

            let colorSelect = constrain(Math.round(map(noiseValue, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            // console.log(noiseVars.noiseValueMin);
            // console.log(noiseVars.noiseValueMax);
            // console.log(colorList.length - 1);
            // console.log(colorSelect);

            buffer.push();
            buffer.noFill();
            buffer.strokeWeight(strokeWeighty);
            buffer.strokeCap(SQUARE);

            buffer.beginShape();

            let strokeColor = colorList[colorSelect]; // distortColorSuperNew(colorList[colorSelect], 10); //

            for (var i = 0; i < loopCount; i++) {

                angle = getRandomFromInterval(angleMin, angleMax);

                let v = p5.Vector.fromAngle(angle, vertexLength * getRandomFromInterval(0.9, 1.1));

                strokeColor = distortColorSuperNew(colorList[colorSelect], vertexColorDistort);
                buffer.stroke(strokeColor);
                let adder = p5.Vector.add(center, v);
                this.buffer.vertex(adder.x, adder.y);
            }

            buffer.endShape();
            buffer.pop();
        }
    }

    drawShape() {

        let min = 10;
        let max = 30;
        // let loopCount = 800;
        // let loopCount = 1200;
        let loopCount = 5000;

        for (var j = 0; j < loopCount; j++) {
            let center = createVector(getRandomFromInterval(0, this.buffer.width), getRandomFromInterval(0, this.buffer.height));
            let tempColor = getRandomFromList(getRandomFromList([
                this.paletteFullGrounda,
                this.paletteFullGroundb,
                this.paletteCutOutCloudsa,
                this.paletteCutOutCloudsb,
                this.paletteCutOutClouds2a,
                this.paletteCutOutClouds2b,
                this.paletteCutOutClouds3a,
                this.paletteCutOutClouds3b,
                this.paletteSectiona1,
                this.paletteSectiona2,
                this.paletteSectiona3,
                this.paletteSectionb1,
                this.paletteSectionb2,
                this.paletteSectionb3,
                this.paletteZigZag,
                this.palettedrawCutOutCloudsVa,
                this.palettedrawCutOutCloudsVb,
            ]));

            this.buffer.push();
            // this.buffer.noFill();
            this.buffer.fill(tempColor);
            // this.buffer.stroke(color("white"));
            // this.buffer.stroke(tempColor);
            // this.buffer.strokeWeight(1);
            this.buffer.noStroke();

            this.buffer.beginShape();
            this.buffer.vertex(center.x - getRandomFromInterval(min, max), center.y - getRandomFromInterval(min, max));
            this.buffer.vertex(center.x + getRandomFromInterval(min, max), center.y - getRandomFromInterval(min, max));
            this.buffer.vertex(center.x + getRandomFromInterval(min, max), center.y + getRandomFromInterval(min, max));
            this.buffer.vertex(center.x - getRandomFromInterval(min, max), center.y + getRandomFromInterval(min, max));
            this.buffer.endShape(CLOSE);
            this.buffer.pop();
        }
    }

    draw() {
        // DEPRECATED
        // this.drawBackdrop();
        this.drawShape();

        // LAYER
        // this.drawfullGround();
        // this.drawCutOutCloudsV();
        // this.drawEverywhereSome1();
        // this.drawSection();
        // this.drawZigZag();
        // this.drawCutOutClouds();
        // this.drawCutOutClouds2();
        // this.drawCutOutClouds3();
    }

    show() {
        push();
        // blendMode(OVERLAY);

        // DEBUG BUFFER
        image(this.buffer, 0, 0);

        // LAYER
        if (frameCount >= this.STARTFRAME + 10) {
            image(this.bufferFullGround, 0, 0);
        }

        if (frameCount >= this.STARTFRAME + 11) {
            image(this.bufferCutOutClouds, 0, 0);
        }

        if (frameCount >= this.STARTFRAME + 12) {
            image(this.bufferCutOutCloudsV, 0, 0);
        }

        if (frameCount >= this.STARTFRAME + 13) {
            image(this.bufferCutOutClouds3, 0, 0);
        }

        if (frameCount >= this.STARTFRAME + 14) {
            image(this.bufferCutOutClouds2, 0, 0);
        }

        if (frameCount >= this.STARTFRAME + 15) {
            image(this.bufferSection, 0, 0);
        }

        if (frameCount >= this.STARTFRAME + 16) {
            image(this.bufferEverywhereSome1, 0, 0);
        }

        if (frameCount >= this.STARTFRAME + 17) {
            image(this.bufferZigZag, 0, 0);
        }

        if (frameCount >= this.STARTFRAME + 18) {
            this.finished = true;
        }

        pop();
    }

    getNoiseVars(number) {

        let noiseValueName = "";
        let noiseValueMin = 0;
        let noiseValueMax = 0;

        if (number == 1) {
            noiseValueName = "noiseValue1";
            // noiseValueMin = this.noiseValue1Min;
            // noiseValueMax = this.noiseValue1Max;
            noiseValueMin = this.noise1.noiseValueMin; // noiseValue1Min;
            noiseValueMax = this.noise1.noiseValueMax; // this.noiseValue1Max;
        } else if (number == 2) {
            noiseValueName = "noiseValue2";
            // noiseValueMin = this.noiseValue2Min;
            // noiseValueMax = this.noiseValue2Max;

            noiseValueMin = this.noise2.noiseValueMin;
            noiseValueMax = this.noise2.noiseValueMax;
        } else if (number == 3) {
            noiseValueName = "noiseValue3";
            noiseValueMin = this.noise3.noiseValueMin;
            noiseValueMax = this.noise3.noiseValueMax;
        } else if (number == 4) {
            noiseValueName = "noiseValue4";
            noiseValueMin = this.noise4.noiseValueMin;
            noiseValueMax = this.noise4.noiseValueMax;
        } else if (number == 5) {
            noiseValueName = "noiseValue5";
            noiseValueMin = this.noise5.noiseValueMin;
            noiseValueMax = this.noise5.noiseValueMax;
        } else if (number == 6) {
            noiseValueName = "noiseValue6";
            noiseValueMin = this.noise6.noiseValueMin;
            noiseValueMax = this.noise6.noiseValueMax;
        } else if (number == 7) {
            noiseValueName = "noiseValue7";
            noiseValueMin = this.noise7.noiseValueMin;
            noiseValueMax = this.noise7.noiseValueMax;
        } else if (number == 8) {
            noiseValueName = "noiseValue8";
            noiseValueMin = this.noise8.noiseValueMin;
            noiseValueMax = this.noise8.noiseValueMax;
        } else if (number == 9) {
            noiseValueName = "noiseValue9";
            noiseValueMin = this.noise9.noiseValueMin;
            noiseValueMax = this.noise9.noiseValueMax;
        } else if (number == 10) {
            noiseValueName = "noiseValue10";
            noiseValueMin = this.noise10.noiseValueMin;
            noiseValueMax = this.noise10.noiseValueMax;
        } else if (number == 11) {
            noiseValueName = "noiseValue11";
            noiseValueMin = this.noise11.noiseValueMin;
            noiseValueMax = this.noise11.noiseValueMax;
        } else {
            noiseValueName = "noiseValue12";
            noiseValueMin = this.noise12.noiseValueMin;
            noiseValueMax = this.noise12.noiseValueMax;
        }

        // console.log("Min: " + noiseValueMin);
        // console.log("Max: " + noiseValueMax);

        return {
            noiseValueName: noiseValueName,
            noiseValueMin: noiseValueMin,
            noiseValueMax: noiseValueMax,
        }
    }
}
