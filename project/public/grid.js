
class Grid {
    constructor(data) {
        this.horizonRatio = 1 / 7 * 4;

        this.OK = true;
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

        if (this.drawing.width < this.drawing.height) {
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
    }

    createBoxes() {

        var index = 0;

        // console.log(this.heightBoxCount);
        // console.log(this.widthBoxCount);

        // h = long, w = short

        for (var h = 0; h < (this.heightBoxCount); h++) {
            // this.noise1.resetSoff();
            // this.noise2.resetSoff();
            // this.noise3.resetSoff();
            // this.noise4.resetSoff();
            // this.noise5.resetSoff();
            // this.noise6.resetSoff();
            // this.noise7.resetSoff();
            // this.noise8.resetSoff();
            // this.noise9.resetSoff();
            // this.noise10.resetSoff();
            // this.noise11.resetSoff();
            // this.noise12.resetSoff();

            for (var w = 0; w < (this.widthBoxCount); w++) {

                // var center = createVector(this.widthMargin + w * this.boxSize + this.boxSize / 2, this.heightMargin + h * this.boxSize + this.boxSize / 2);
                var center = { x: this.widthMargin + w * this.boxSize + this.boxSize / 2, y: this.heightMargin + h * this.boxSize + this.boxSize / 2 };

                // corners of the box
                var A = { x: this.widthMargin + w * this.boxSize, y: this.heightMargin + h * this.boxSize };
                // var B = p5.Vector.add(A, createVector(this.boxSize, 0));
                // var C = p5.Vector.add(A, createVector(this.boxSize, this.boxSize));
                // var D = p5.Vector.add(A, createVector(0, this.boxSize));
                var B = vectorAdd(A, { x: this.boxSize, y: 0 });
                var C = vectorAdd(A, { x: this.boxSize, y: this.boxSize });
                var D = vectorAdd(A, { x: 0, y: this.boxSize });

                // var noiseValue1 = this.noise1.createNoiseValue();
                // var noiseValue2 = this.noise2.createNoiseValue();
                // var noiseValue3 = this.noise3.createNoiseValue();
                // var noiseValue4 = this.noise4.createNoiseValue();
                // var noiseValue5 = this.noise5.createNoiseValue();
                // var noiseValue6 = this.noise6.createNoiseValue();
                // var noiseValue7 = this.noise7.createNoiseValue();
                // var noiseValue8 = this.noise8.createNoiseValue();
                // var noiseValue9 = this.noise9.createNoiseValue();
                // var noiseValue10 = this.noise10.createNoiseValue();
                // var noiseValue11 = this.noise11.createNoiseValue();
                // var noiseValue12 = this.noise12.createNoiseValue();

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

                // this.noise1.updateSoff();
                // this.noise2.updateSoff();
                // this.noise3.updateSoff();
                // this.noise4.updateSoff();
                // this.noise5.updateSoff();
                // this.noise6.updateSoff();
                // this.noise7.updateSoff();
                // this.noise8.updateSoff();
                // this.noise9.updateSoff();
                // this.noise10.updateSoff();
                // this.noise11.updateSoff();
                // this.noise12.updateSoff();
            }
            // this.noise1.updateLoff();
            // this.noise1.updateZoff();
            // this.noise2.updateLoff();
            // this.noise2.updateZoff();
            // this.noise3.updateLoff();
            // this.noise3.updateZoff();
            // this.noise4.updateLoff();
            // this.noise4.updateZoff();
            // this.noise5.updateLoff();
            // this.noise5.updateZoff();
            // this.noise6.updateLoff();
            // this.noise6.updateZoff();
            // this.noise7.updateLoff();
            // this.noise7.updateZoff();
            // this.noise8.updateLoff();
            // this.noise8.updateZoff();
            // this.noise9.updateLoff();
            // this.noise9.updateZoff();
            // this.noise10.updateLoff();
            // this.noise10.updateZoff();
            // this.noise11.updateLoff();
            // this.noise11.updateZoff();
            // this.noise12.updateLoff();
            // this.noise12.updateZoff();
        }

    }

    showDebug() {

        for (var i = 0; i < this.boxes.length; i++) {
            //     this.buffer.rect(this.boxes[i].A.x, this.boxes[i].A.y, this.boxes[i].C.x, this.boxes[i].C.y);
            //     // this.buffer.point(this.boxes[i].center.x, this.boxes[i].center.y);

            // this.drawing.rect(100, 100).move(100, 50).fill('#f06')
            // this.drawing.rect(this.boxes[i].A.x, this.boxes[i].A.y).move(this.boxes[i].center.x, this.boxes[i].center.y).fill(getRandomFromList(['#f06', "#37ad37ff", "#528bd6ff"]))
            this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].center.x, this.boxes[i].center.y).fill(getRandomFromList(['#f06', "#37ad37ff", "#528bd6ff"]))
        }

    }

}