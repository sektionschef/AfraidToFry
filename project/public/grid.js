class Grid {
    constructor(data) {
        this.horizonRatio = 4 / 7;

        this.overshoot = data.overshoot;  // time limit reached
        this.finished = false;  // flag for completely drawn

        this.DEBUG = false;
        this.shortBoxCount = data.shortBoxCount; // boxes on the shorter side
        // this.marginBoxCount = data.marginBoxCount;
        this.marginBoxCount = Math.round(this.shortBoxCount * 0.1);
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

        this.boxes = [];

        if (this.overshoot == true) {

            // this.aboveTone = "#9eaecc";
            // this.underneathTone = "#30362f";
            this.aboveTone = ABOVETONE;
            this.underneathTone = BELOWTONE;
        } else {
            // this.aboveTone = "#cdd7df";
            // this.underneathTone = "#6e8578";
            this.aboveTone = ABOVETONE;
            this.underneathTone = BELOWTONE;
        }

        this.paletteRA = new dynamicPalette(
            this.aboveTone,
            // [-2, -5, -10, 0, 2, 5, 10],
            // [0, 4, 8], // good
            [-2, 0, 2],
            // [-10, 0, 10],
            [-30, -20, -12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 20, 30],  // harsh
            // [-30, -20, -12, -10, -8, -6, -4, -2, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 2, 4, 6, 8, 10, 12, 20, 30], // easy
            // [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            // [-6, -4, -2, 0, 2, 4, 6],
            // [-34, -32, -30, -28, -26, -24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
            // [-18, -16, -14, -12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14],
            // [-16, -8, 0, 8, 16],
            // [-16, -8, -4, 0, 4, 8, 16],
            // [-12, -9, -6, -3, 0, 3, 6, 9, 12],
            [3, 0, -3]
        );
        this.paletteRB = new dynamicPalette(this.underneathTone, [-1, -2, -5, -10, 0, 1, 2, 5, 10], [-30, -20, -10, -5, 0, 5, 10, 20, 30], [0, 2]);
        this.paletteOne = new dynamicPalette("#b4aca3", [-1, -2, -5, -10, 0, 1, 2, 5, 10], [-30, -20, -10, -5, 0, 5, 10, 20, 30], [0, 2]);
        this.paletteTwo = new dynamicPalette("#574f46", [-1, -2, -5, -10, 0, 1, 2, 5, 10], [-30, -20, -10, -5, 0, 5, 10, 20, 30], [0, 2]);

        // if (fxrand() > 0.2) {this.paletteA = this.paletteRA} else {this.paletteB = this.paletteRB}

        // this.noiseRA = new noiseAggregator(135, 50, 110, 10, 4, 5);
        // this.noiseRA = new noiseAggregator(235, 50, 110, 4, 4, 5);  // klaas
        // this.noiseRA = new noiseAggregator(135, 150, 110, 24, 14, 10); // klaa2
        // this.noiseRA = new noiseAggregator(335, 60, 210, 24, 65, 65); // klaa3
        this.noiseRA = new noiseAggregator(135, 15, 80, 6, 10, 10); // klaa3

        // this.noiseSA = new noiseAggregator(155, 50, 80, 10, 20, 50);
        // this.noiseSA = new noiseAggregator(230, 38, 90, 4, 4, 5);  // klaas
        // this.noiseSA = new noiseAggregator(130, 158, 120, 28, 18, 9);  // klaas2
        this.noiseSA = new noiseAggregator(10, 3, 20, 2, 4, 4);  // klaas3

        // this.noiseColorA = new noiseAggregator(100, 38, 60, 10, 8, 2); 
        this.noiseColorA = new noiseAggregator(100, 18, 60, 10, 4, 4);
        this.noiseColorB = new noiseAggregator(280, 30, 40, 5, 40, 3);

        this.createBoxes();
        this.normalizeNoises();

        // PALETTE SWAP
        // for (var i = 0; i < this.paletteRA.palette.length; i++) {
        //     if (i == 33) {
        //         for (var v = 0; v < 3; v++) {

        //             // var swapB = this.paletteRA.palette[i + v];
        //             // var swapA = this.paletteRB.palette[i + v];
        //             // this.paletteRA.palette[i + v] = swapA;
        //             // this.paletteRB.palette[i + v] = swapB;

        //             this.paletteRA.palette[i + v] = this.paletteOne.palette[i + v];
        //             this.paletteRB.palette[i + v] = this.paletteTwo.palette[i + v];
        //         }

        //     }
        // }


        if (this.DEBUG) {
            // this.showDebug();
        } else {

            // setTimeout(() => {
            //     this.loop1();
            // }, 0);

            // this.loopBaseVis();
            // this.loopShowNoise();

            this.loopBase();
            this.loopDetail();
            this.loop8();

        }
    }

    createBoxes() {

        var index = 0;

        this.noiseRAMin = 1;
        this.noiseRAMax = -1;
        this.noiseSAMin = 1;
        this.noiseSAMax = -1;
        this.noiseColorAMin = 10;
        this.noiseColorAMax = -10;
        this.noiseColorBMin = 10;
        this.noiseColorBMax = -10;

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

                // REDUCE NOISE TO AREA NOT WHOLE CANVAS
                // var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 1, 0, 0, 1, 0.25, 0.25); // not jack johnson
                // var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 1, 1, 0, 0, 1, 1);
                // var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 1, 1, 0.7, 0, 0.5, 0.2);
                // var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 8, 4, 4, 2, 1, 1);
                // var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 46, 23, 3, 12, 3, 3);
                // var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 46, 23, 12, 20, 6, 6);
                // var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 40, 40, -10, -10, 10, 10);
                var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 40, 40, 0, 0, 0, 0);
                // var noiseValueSA = this.noiseSA.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.5, 0);
                // var noiseValueSA = this.noiseSA.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.25, 0.25);
                var noiseValueSA = this.noiseSA.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 0, 0, 0, 1, 1);

                // var noiseValueColorA = this.noiseColorA.createNoiseValue(w, h, 0, this.horizonRow, 1, 0, 0.5, 0.5, 0, 0.5);
                var noiseValueColorA = this.noiseColorA.createNoiseValue(w, h, 0, this.horizonRow, 8, 8, 6, 6, 4, 4);
                var noiseValueColorB = this.noiseColorB.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 4, 8, 0, 0, 8, 4);

                if (noiseValueRA < this.noiseRAMin) {
                    this.noiseRAMin = noiseValueRA;
                }
                if (noiseValueRA > this.noiseRAMax) {
                    this.noiseRAMax = noiseValueRA;
                }
                if (noiseValueSA < this.noiseSAMin) {
                    this.noiseSAMin = noiseValueSA;
                }
                if (noiseValueSA > this.noiseSAMax) {
                    this.noiseSAMax = noiseValueSA;
                }

                if (noiseValueColorA < this.noiseColorAMin) {
                    this.noiseColorAMin = noiseValueColorA;
                }
                if (noiseValueColorA > this.noiseColorAMax) {
                    this.noiseColorAMax = noiseValueColorA;
                }

                if (noiseValueColorB < this.noiseColorBMin) {
                    this.noiseColorBMin = noiseValueColorB;
                }
                if (noiseValueColorB > this.noiseColorBMax) {
                    this.noiseColorBMax = noiseValueColorB;
                }

                this.boxes.push({
                    "center": center,
                    "A": A,
                    "B": B,
                    "C": C,
                    "D": D,
                    "height": h,
                    "width": w,
                    "index": index,
                    "mask": false,
                    // "noiseValue1": this.noise1.createNoiseValue(w, h),
                    // "noiseValue2": this.noise2.createNoiseValue(w, h),
                    // "noiseValue3": this.noise3.createNoiseValue(w, h),
                    // "noiseValue4": this.noise4.createNoiseValue(w, h),
                    // "noiseValue5": this.noise5.createNoiseValue(w, h),
                    // "noiseValue6": this.noise6.createNoiseValue(w, h),
                    // "noiseValue7": this.noise7.createNoiseValue(w, h),
                    // "noiseValue8": this.noise8.createNoiseValue(w, h),
                    "noiseValueRA": noiseValueRA,
                    "noiseValueSA": noiseValueSA,
                    "noiseValueColorA": noiseValueColorA,
                    "noiseValueColorB": noiseValueColorB,
                    // "noiseValue9": this.noise9.createNoiseValue(w, h),
                    // "noiseValue10": this.noise10.createNoiseValue(w, h),
                    // "polygonA": polygonA,
                    // "polygonLeft": polygonLeft,
                    "horizon": horizon,
                    "aboveHorizon": aboveHorizon,
                })
                index += 1;
            }
        }

    }

    normalizeNoises() {

        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].noiseValueColorA = map(this.boxes[i].noiseValueColorA, this.noiseColorAMin, this.noiseColorAMax, -1, 1);
            this.boxes[i].noiseValueColorB = map(this.boxes[i].noiseValueColorB, this.noiseColorBMin, this.noiseColorBMax, -1, 1);
            this.boxes[i].noiseValueRA = map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, -1, 1);
            this.boxes[i].noiseValueSA = map(this.boxes[i].noiseValueSA, this.noiseSAMin, this.noiseSAMax, -1, 1);
        }
    }

    showDebug() {
        for (var i = 0; i < this.boxes.length; i++) {

            const svgNode = document.getElementById('svgNode');

            var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttributeNS(null, 'x', this.boxes[i].A.x);
            rect.setAttributeNS(null, 'y', this.boxes[i].A.y);
            rect.setAttributeNS(null, 'height', this.boxSize);
            rect.setAttributeNS(null, 'width', this.boxSize);
            rect.setAttributeNS(null, 'stroke', '#f06');
            rect.setAttributeNS(null, 'stroke-width', '0.5');
            // rect.setAttributeNS(null, 'fill', 'none');
            // rect.setAttributeNS(null, 'fill', getRandomFromList(['#f06', "#37ad37ff", "#528bd6ff"]));

            svgNode.appendChild(rect);
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

    loopShowNoise() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].aboveHorizon) {
                new deugy({
                    x: this.boxes[i].A.x,
                    y: this.boxes[i].A.y,
                    width: this.boxSize,
                    height: this.boxSize,
                    colorList: this.paletteRA.palette,
                    noiseValue: this.boxes[i].noiseValueRA,
                }).draw();
            } else {
                new deugy({
                    x: this.boxes[i].A.x,
                    y: this.boxes[i].A.y,
                    width: this.boxSize,
                    height: this.boxSize,
                    colorList: this.paletteRB.palette,
                    noiseValue: this.boxes[i].noiseValueSA,
                }).draw();
            }


            // color noise

            // if (this.boxes[i].aboveHorizon) {
            //     new deugy({
            //         x: this.boxes[i].A.x,
            //         y: this.boxes[i].A.y,
            //         width: this.boxSize,
            //         height: this.boxSize,
            //         colorList: this.paletteRA.palette,
            //         noiseValue: this.boxes[i].noiseValueColorA,
            //     }).draw();
            // } else {
            //     new deugy({
            //         x: this.boxes[i].A.x,
            //         y: this.boxes[i].A.y,
            //         width: this.boxSize,
            //         height: this.boxSize,
            //         colorList: this.paletteRB.palette,
            //         noiseValue: this.boxes[i].noiseValueColorB,
            //     }).draw();
            // }
        }
    }

    loopBaseVis() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        var marginPix = this.boxSize * this.marginBoxCount;

        // console.log("RAMin: " + this.noiseRAMin);
        // console.log("RAMax: " + this.noiseRAMax);

        // console.log("SAMin: " + this.noiseSAMin);
        // console.log("SAMax: " + this.noiseSAMax);

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            this.paletteA = this.paletteRA
            this.paletteB = this.paletteRB
            // if (fxrand() > 0.01) { this.paletteA = this.paletteRA } else { this.paletteA = this.paletteOne }
            // if (fxrand() > 0.01) { this.paletteB = this.paletteRB } else { this.paletteB = this.paletteOne }


            // // NOISE pattern with rects
            // if (this.boxes[i].aboveHorizon) {
            //     new digRect({
            //         x: this.boxes[i].A.x,
            //         y: this.boxes[i].A.y,
            //         width: (this.boxSize + 1),  // +1 to avoid strokes
            //         height: (this.boxSize + 1),
            //         colorList: this.paletteA.palette,
            //         noiseValue: this.boxes[i].noiseValueRA,
            //         noiseValueMin: this.noiseRAMin,
            //         noiseValueMax: this.noiseRAMax,
            //     }).draw();
            // } else {
            //     new digRect({
            //         x: this.boxes[i].A.x,
            //         y: this.boxes[i].A.y,
            //         width: (this.boxSize + 1),
            //         height: (this.boxSize + 1),
            //         colorList: this.paletteB.palette,
            //         noiseValue: this.boxes[i].noiseValueSA,
            //         noiseValueMin: this.noiseSAMin,
            //         noiseValueMax: this.noiseSAMax,
            //     }).draw();
            // }

            const rectNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rectNode.setAttributeNS(null, 'x', marginPix);
            rectNode.setAttributeNS(null, 'y', marginPix);
            rectNode.setAttributeNS(null, 'width', (rescaling_width - marginPix * 2));
            rectNode.setAttributeNS(null, 'height', rescaling_height - marginPix * 2);
            // rectNode.setAttributeNS(null, 'fill', 'none');
            rectNode.setAttributeNS(null, 'fill', this.aboveTone);
            // rectNode.setAttributeNS(null, 'stroke', color_);
            rectNode.setAttributeNS(null, 'stroke', "none");
            // rectNode.setAttributeNS(null, 'stroke-width', this.rectStroke);
            svgNode.appendChild(rectNode);

        }

    }


    loopBase() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        // console.log("RAMin: " + this.noiseRAMin);
        // console.log("RAMax: " + this.noiseRAMax);

        // console.log("SAMin: " + this.noiseSAMin);
        // console.log("SAMax: " + this.noiseSAMax);

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // if (this.boxes[i].aboveHorizon) {
            //     for (var o = 0; o <= map(this.boxes[i].noiseValue7, -1, 1, 1, 10); o++) {

            //         this.digndag(
            //             {
            //                 centerX: this.boxes[i].center.x + getRandomFromInterval(0, 5),
            //                 centerY: this.boxes[i].center.y + getRandomFromInterval(0, 5),
            //                 noiseValue: this.boxes[i].noiseValue7,
            //                 vertexLength: map(this.boxes[i].noiseValue7, -1, 1, 5, 10),
            //                 strokeWeighty: 0.1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
            //                 angleMin: 2 * Math.PI / 12 * 0.85,
            //                 angleMax: 2 * Math.PI / 12 * 3.15,
            //                 lineRevert: true,
            //                 cutOutValue: -1,
            //                 lineLoopCount: 5, // map(this.boxes[i].noiseValue7, -1, 1, 1, 5),
            //                 // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
            //                 colorList: this.palette15.palette,
            //                 noiseAngle: false,
            //                 group: "",
            //             }
            //         );
            //     }
            // }

            // gescccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccheiter
            this.paletteA = this.paletteRA
            this.paletteB = this.paletteRB


            // if (this.boxes[i].aboveHorizon) {
            // if (fxrand() > 0.05) { var patty = this.paletteRA.palette } else { var patty = this.paletteRAprot.palette };
            new digi({
                x: this.boxes[i].center.x,
                y: this.boxes[i].center.y,
                noiseValue: this.boxes[i].noiseValueRA,
                colorNoise: this.boxes[i].noiseValueRA,
                colorList: this.paletteA.palette,
                noiseAngle: false,
                group: "",
                horizonRow: this.horizonRow,
                i: i,
                longBoxCount: this.longBoxCount,
                cutOutValue: -1,
                lineNoiseMapDynamic: false,
                // lineVertexLength: 160 / this.shortBoxCount * 30, // map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, 10, 30), // 30,
                lineVertexLengthMin: 160 / this.shortBoxCount * 30,
                lineVertexLengthMax: 160 / this.shortBoxCount * 30,
                // lineStrokeWeighty: 160 / this.shortBoxCount * 0.3, //map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, 0.05, 0.25), // 0.3,
                lineStrokeWeightyMin: 160 / this.shortBoxCount * 0.3,
                lineStrokeWeightyMax: 160 / this.shortBoxCount * 0.3,
                // lineLoopCount: map(this.boxes[i].noiseValueRA, -1, 1, 20, 50), // 20,
                lineLoopCountMin: 80 / this.shortBoxCount * 20,
                lineLoopCountMax: 80 / this.shortBoxCount * 20,
                lineAngleMean: Math.PI / 1,
                lineAngleSTD: Math.PI / 56,
                lineNoiseAngleDist: 0.3,
                lineVertexLengthMean: 0.9,
                lineVertexLengthStd: 0.05,
                lineRevert: true,
                triangle: false,
                triangleStroke: 160 / this.shortBoxCount * 0.25,
                triangleLoop: map(this.boxes[i].noiseValueRA, -1, 1, 3, 20),
                trianglePosDistStd: 160 / this.shortBoxCount * 5,
                rect: false,
                rectLoop: 1,
                rectWidth: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueRA, -1, 1, 5, 30), // 12,
                rectHeight: 160 / this.shortBoxCount * 6,
                rectStroke: 160 / this.shortBoxCount * 0.4,
                rectPosDistStd: 160 / this.shortBoxCount * 5,
            }).draw();
            // } else {
            //     new digi({
            //         x: this.boxes[i].center.x,
            //         y: this.boxes[i].center.y,
            //         noiseValue: this.boxes[i].noiseValueSA,
            //         colorNoise: this.boxes[i].noiseValueSA,
            //         colorList: this.paletteB.palette,
            //         noiseAngle: false,
            //         group: "",
            //         horizonRow: this.horizonRow,
            //         i: i,
            //         longBoxCount: this.longBoxCount,
            //         cutOutValue: -1,
            // lineNoiseMapDynamic: false,
            //         // lineVertexLength: 160 / this.shortBoxCount * 30, // map(this.boxes[i].noiseValueSA, -1, 1, 30, 50), // 30, 
            // lineVertexLengthMin: 160 / this.shortBoxCount * 30, 
            // lineVertexLengthMax: 160 / this.shortBoxCount * 30,
            //         lineStrokeWeighty: 160 / this.shortBoxCount * 0.3, //map(this.boxes[i].noiseValueSA, this.noiseSAMin, this.noiseSAMax, 0.05, 0.25), // 0.3,
            //         lineLoopCount: map(this.boxes[i].noiseValueSA, -1, 1, 20, 50), // 20,
            //         lineAngleMean: Math.PI / 1,
            //         lineAngleSTD: Math.PI / 56,
            //         lineNoiseAngleDist: 0.3,
            //         lineVertexLengthMean: 0.9,
            //         lineVertexLengthStd: 0.05,
            //         lineRevert: true,
            //         circle: false,
            //         triangleStroke: 160 / this.shortBoxCount * 0.25,
            //         loopCircle: map(this.boxes[i].noiseValueRA, -1, 1, 3, 20),
            //         trianglePosDistStd: 160 / this.shortBoxCount * 5,
            //         rect: false,
            //         rectLoop: 10,
            //         rectWidth: 160 / this.shortBoxCount * 12,
            //         rectHeight: 160 / this.shortBoxCount * 6,
            //         rectStroke: 160 / this.shortBoxCount * 0.4,
            //         rectPosDistStd: 160 / this.shortBoxCount * 5,
            //     }).draw();
            // }


        }

    }

    loopDetail() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            this.paletteA = this.paletteRA
            this.paletteB = this.paletteRB


            // if (this.boxes[i].aboveHorizon) {
            new digi({
                x: this.boxes[i].center.x * getNormallyDistributedRandomNumber(1, 0),
                y: this.boxes[i].center.y * getNormallyDistributedRandomNumber(1, 0),
                noiseValue: this.boxes[i].noiseValueRA,
                colorNoise: this.boxes[i].noiseValueRA,
                colorList: this.paletteA.palette,
                noiseAngle: true,
                group: "",
                horizonRow: this.horizonRow,
                i: i,
                longBoxCount: this.longBoxCount,
                cutOutValue: -1,
                // lineVertexLength: 160 / this.shortBoxCount * 8, // map(this.boxes[i].noiseValueRA, -1, 1, 2, 10), // 15,
                lineNoiseMapDynamic: true,
                lineVertexLengthMin: 80 / this.shortBoxCount * 5,
                lineVertexLengthMax: 80 / this.shortBoxCount * 25,
                lineVertexLengthMean: 1,
                lineVertexLengthStd: map(this.boxes[i].noiseValueRA, -1, 1, 0.15, 0.05), //0.05,
                // lineStrokeWeighty: 160 / this.shortBoxCount * 0.1, // map(this.boxes[i].noiseValueRA, -1, 1, 0.1, 0.15), // 0.1,
                lineStrokeWeightyMin: 160 / this.shortBoxCount * 0.1,
                lineStrokeWeightyMax: 160 / this.shortBoxCount * 0.4,
                lineLoopCountMin: 80 / this.shortBoxCount * 10,
                lineLoopCountMax: 80 / this.shortBoxCount * 40,
                lineAngleMean: Math.PI / 1,
                lineAngleSTD: Math.PI / 56,
                lineNoiseAngleDist: 0.2,
                lineRevert: true,
                triangle: true,
                triangleStroke: 160 / this.shortBoxCount * 0.2, // map(this.boxes[i].noiseValueRA, -1, 0, 0.3, 0.1), // 0.08
                triangleLoop: 40, //map(this.boxes[i].noiseValueRA, -1, 0, 60, 30), // 40,
                triangleWidthy: 160 / this.shortBoxCount * 1.5,
                trianglePosDistStd: 160 / this.shortBoxCount * 4, // map(this.boxes[i].noiseValueRA, -1, 0, 2, 5),
                rect: true,
                rectLoop: 40, // map(this.boxes[i].noiseValueRA, 0, 1, 10, 60), //30,
                rectWidth: 160 / this.shortBoxCount * 5, // map(this.boxes[i].noiseValueRA, 0, 1, 6, 9),// 6,
                rectHeight: 160 / this.shortBoxCount * 1.5, // map(this.boxes[i].noiseValueRA, 0, 1, 2, 3),// 2,
                rectStroke: 0.3, // 160 / this.shortBoxCount * map(this.boxes[i].noiseValueRA, 0, 1, 0.2, 0.05), // 0.08
                rectPosDistStd: 160 / this.shortBoxCount * 4, // map(this.boxes[i].noiseValueRA, -1, 0, 1, 4), // 5
            }).draw();
            // } else {
            // new digi({
            //     x: this.boxes[i].center.x * getNormallyDistributedRandomNumber(1, 0),
            //     y: this.boxes[i].center.y * getNormallyDistributedRandomNumber(1, 0),
            //     noiseValue: this.boxes[i].noiseValueSA,
            //     colorNoise: this.boxes[i].noiseValueColorB,
            //     colorList: this.paletteB.palette,
            //     noiseAngle: true,
            //     group: "",
            //     horizonRow: this.horizonRow,
            //     i: i,
            //     longBoxCount: this.longBoxCount,
            //     cutOutValue: -1,
            // lineNoiseMapDynamic: false,
            // //     lineVertexLength: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueSA, -1, 1, 5, 15), // 15,
            // lineVertexLengthMin: 160 / this.shortBoxCount * 5, 
            // lineVertexLengthMax: 160 / this.shortBoxCount * 25,
            //     lineVertexLengthMean: 1,
            //     lineVertexLengthStd: 0.05,
            //     lineStrokeWeighty: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueSA, -1, 1, 0.1, 0.25), // 0.1,
            //     lineLoopCount: 20, // map(this.boxes[i].noiseValueSA, -0.5, 0.5, 10, 30), // 20,
            //     lineAngleMean: Math.PI / 1,
            //     lineAngleSTD: Math.PI / 56,
            //     lineNoiseAngleDist: 0.1,
            //     lineRevert: true,
            //     triangle: true,
            //     triangleStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueSA, -1, 0, 0.2, 0.05),
            //     loopCircle: map(this.boxes[i].noiseValueSA, -1, 0, 60, 10), // 40,,
            //     triangleWidthy: 3,
            //     trianglePosDistStd: 160 / this.shortBoxCount * 5,
            //     rect: true,
            //     rectLoop: map(this.boxes[i].noiseValueSA, 0, 1, 10, 60), //30,
            //     rectWidth: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueSA, 0, 1, 3, 6),
            //     rectHeight: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueSA, 0, 1, 1, 3),
            //     rectStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueSA, 0, 1, 0.2, 0.05), // 0.08
            //     rectPosDistStd: 160 / this.shortBoxCount * 5,
            // }).draw();
            // }

            if (
                this.boxes[i].height >= (this.horizonRow - 3) &&
                this.boxes[i].height <= (this.horizonRow + 3) &&
                this.boxes[i].noiseValueRA > 0
            ) {
                new digi({
                    x: this.boxes[i].center.x * getNormallyDistributedRandomNumber(1, 0),
                    y: this.boxes[i].center.y * getNormallyDistributedRandomNumber(1, 0),
                    noiseValue: 0, // this.boxes[i].noiseValueRA,
                    colorNoise: 0, // this.boxes[i].noiseValueRA,
                    colorList: ["#ebebeb"],
                    noiseAngle: false,
                    group: "",
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                    cutOutValue: -1,
                    lineNoiseMapDynamic: false,
                    lineVertexLengthMin: 160 / this.shortBoxCount * 15,
                    lineVertexLengthMax: 160 / this.shortBoxCount * 15,
                    lineStrokeWeightyMin: 160 / this.shortBoxCount * 0.3,
                    lineStrokeWeightyMax: 160 / this.shortBoxCount * 0.3,
                    lineLoopCountMin: 80 / this.shortBoxCount * 30,
                    lineLoopCountMax: 80 / this.shortBoxCount * 30,
                    lineAngleMean: Math.PI / 1,
                    lineAngleSTD: map(this.boxes[i].noiseValueRA, -1, 1, Math.PI / 46, Math.PI / 16), // Math.PI / 56,
                    lineNoiseAngleDist: 0.1,
                    lineVertexLengthMean: 1,
                    lineVertexLengthStd: 0.05,
                    lineRevert: true,
                    triangle: false,
                    triangleStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueRA, -1, 0, 0.2, 0.05), // 0.08
                    triangleLoop: 40, //map(this.boxes[i].noiseValueRA, -1, 0, 60, 30), // 40,
                    triangleWidthy: 3,
                    trianglePosDistStd: 160 / this.shortBoxCount * 5,
                    rect: false,
                    rectLoop: map(this.boxes[i].noiseValueRA, 0, 1, 10, 60), //30,
                    rectWidth: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueRA, 0, 1, 3, 6),// 6,
                    rectHeight: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueRA, 0, 1, 1, 3),// 2,
                    rectStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueRA, 0, 1, 0.2, 0.05), // 0.08
                    rectPosDistStd: 160 / this.shortBoxCount * 5,
                }).draw();
            }


            if (this.boxes[i].horizon) {
                new digi({
                    x: this.boxes[i].center.x * getNormallyDistributedRandomNumber(1, 0),
                    y: this.boxes[i].center.y * getNormallyDistributedRandomNumber(1, 0),
                    noiseValue: this.boxes[i].noiseValueRA,
                    colorNoise: this.boxes[i].noiseValueRA,
                    colorList: ["#575757", "#3f3f3f", "#575757"],
                    noiseAngle: false,
                    group: "",
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                    cutOutValue: -1,
                    lineNoiseMapDynamic: false,
                    //         lineVertexLength: 160 / this.shortBoxCount * 15, //map(this.boxes[i].noiseValueRA, -1, 1, 5, 15), // 15,
                    // lineVertexLengthMin: 160 / this.shortBoxCount * 15, 
                    // lineVertexLengthMax: 160 / this.shortBoxCount * 15,
                    // lineStrokeWeighty: 160 / this.shortBoxCount * 0.1, //map(this.boxes[i].noiseValueRA, -1, 1, 0.05, 0.25), // 0.1,
                    // lineLoopCount: map(this.boxes[i].noiseValueRA, -1, 1, 10, 20), // 20,
                    lineVertexLengthMin: 160 / this.shortBoxCount * 15,
                    lineVertexLengthMax: 160 / this.shortBoxCount * 15,
                    lineStrokeWeightyMin: 160 / this.shortBoxCount * 0.4,
                    lineStrokeWeightyMax: 160 / this.shortBoxCount * 0.4,
                    lineLoopCountMin: 80 / this.shortBoxCount * 20,
                    lineLoopCountMax: 80 / this.shortBoxCount * 20,
                    lineAngleMean: Math.PI / 1,
                    lineAngleSTD: map(this.boxes[i].noiseValueRA, -1, 1, Math.PI / 36, Math.PI / 56), // Math.PI / 56, 
                    lineNoiseAngleDist: 0.1,
                    lineVertexLengthMean: 1,
                    lineVertexLengthStd: 0.05,
                    lineRevert: true,
                    triangle: true,
                    triangleStroke: 160 / this.shortBoxCount * 0.2, // map(this.boxes[i].noiseValueRA, -1, 0, 0.2, 0.05), // 0.08
                    triangleLoop: 20, //map(this.boxes[i].noiseValueRA, -1, 0, 60, 30), // 40,
                    triangleWidthy: 160 / this.shortBoxCount * 1.5,
                    trianglePosDistStd: 160 / this.shortBoxCount * 4,
                    rect: true,
                    rectLoop: 20, //map(this.boxes[i].noiseValueRA, 0, 1, 10, 60), //30,
                    rectWidth: 160 / this.shortBoxCount * 5, // map(this.boxes[i].noiseValueRA, 0, 1, 2, 5),// 6,
                    rectHeight: 160 / this.shortBoxCount * 1.5, // map(this.boxes[i].noiseValueRA, 0, 1, 1, 2),// 2,
                    rectStroke: 0.3, // 160 / this.shortBoxCount * map(this.boxes[i].noiseValueRA, 0, 1, 0.1, 0.05), // 0.08
                    rectPosDistStd: 160 / this.shortBoxCount * 4,
                }).draw();
            }


        }

    }
    loop8() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // if (this.boxes[i].aboveHorizon) {
            //     new zigi(
            //         {
            //             x: this.boxes[i].center.x,
            //             y: this.boxes[i].center.y,
            //             noiseValue: this.boxes[i].noiseValueRA,
            //             colorNoise: this.boxes[i].noiseValueColorA,
            //             vertexLength: 10, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
            //             strokeWeighty: 0.3, // map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
            //             angleMin: 0,
            //             angleMax: Math.PI,
            //             cutOutValue: -1,
            //             lineLoopCount: map(this.boxes[i].noiseValueRA, -1, 1, 1, 10),
            //             colorList: this.paletteRA.palette,
            //             // colorList: ["#161616", "#353535", "#727272", "#8d8c8c", "#adadad", "#c7c7c7"],
            //             group: "",
            //         }
            //     ).draw();
            // } else {
            //     new zigi(
            //         {
            //             x: this.boxes[i].center.x,
            //             y: this.boxes[i].center.y,
            //             noiseValue: this.boxes[i].noiseValueSA,
            //             colorNoise: this.boxes[i].noiseValueColorA,
            //             vertexLength: 10, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
            //             strokeWeighty: 0.2, // map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
            //             angleMin: 0,
            //             angleMax: Math.PI,
            //             cutOutValue: -1,
            //             lineLoopCount: map(this.boxes[i].noiseValueSA, -1, 1, 1, 30),
            //             colorList: this.paletteRB.palette,
            //             // colorList: ["#161616", "#353535", "#727272", "#8d8c8c", "#adadad", "#c7c7c7"],
            //             group: "",
            //         }
            //     ).draw();
            // }



            // new zigi(
            //     {
            //         x: this.boxes[i].center.x,
            //         y: this.boxes[i].center.y,
            //         noiseValue: this.boxes[i].noiseValueRA,
            //         colorNoise: this.boxes[i].noiseValueRA,
            //         lineVertexLength: 5, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
            //         strokeWeighty: 0.05, ///map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
            //         angleMin: 0,
            //         angleMax: Math.PI / 2,
            //         cutOutValue: -1,
            //         lineLoopCount: map(this.boxes[i].noiseValueRA, -1, 1, 0, 10),
            //         // colorList: this.paletteA.palette,
            //         // colorList: ["#353535", "#727272", "#8d8c8c", "#adadad", "#c7c7c7"],
            //         colorList: ["#c7c7c7", "#adadad", "#8d8c8c", "#727272", "#353535"],
            //         // colorList: ["#808080"],
            //         group: "",
            //     }
            // ).draw();


        }

    }
}