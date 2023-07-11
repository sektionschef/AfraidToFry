class Grid {
    constructor(data) {
        this.horizonRatio = 4 / 7;

        this.overshoot = data.overshoot;  // time limit reached
        this.finished = false;  // flag for completely drawn

        this.DEBUG = false;
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

        this.boxes = [];

        // COLOR 
        // if (this.overshoot == true) {
        //     this.aboveTone = "#b7c6d4";
        //     this.underneathTone = "#a0b4a0";
        // } else {
        //     this.aboveTone = "#cdd7df";
        //     this.underneathTone = "#6e8578";
        // }

        if (this.overshoot == true) {
            // this.aboveTone = "#d4ccb7";
            // this.underneathTone = "#b4a1a0";
            // this.aboveTone = "#d4cab3";
            // this.underneathTone = "#b6a2a1";

            // this.aboveTone = "#8b94a3";
            // this.underneathTone = "#504e45";

            this.aboveTone = "#717d92";
            this.underneathTone = "#69654f";
        } else {
            this.aboveTone = "#cdd7df";
            this.underneathTone = "#6e8578";
        }

        // this.paletteRA = new dynamicPalette("#b7c6d4", 15, 25, 10);  // klaas
        // this.paletteRAbby = new dynamicPalette("#b7c6d4", 15, 25, 10);  // klaas
        // this.paletteLoop8A = new dynamicPalette("#9aa9b8", 55, 15, 10);  // klaas
        // klaas
        // this.paletteRB = new dynamicPalette("#899c89", 15, 25, 10);  // klaas
        // this.paletteRBbby = new dynamicPalette("#a4cca4", 15, 25, 10);  // klaas
        // this.paletteLoop8B = new dynamicPalette("#718571", 55, 15, 10);  // klaas

        // this.paletteRA = new dynamicPalette(this.aboveTone, 15, 15, 8);
        // this.paletteRB = new dynamicPalette(this.underneathTone, 15, 15, 8);
        // this.paletteOne = new dynamicPalette("#adb8be", 15, 15, 8);

        this.paletteRA = new dynamicPalette(this.aboveTone, 15, 15, 8);
        this.paletteRB = new dynamicPalette(this.underneathTone, 15, 15, 8);
        this.paletteOne = new dynamicPalette("#adb8be", 0, 0, 0);

        // if (fxrand() > 0.2) {this.paletteA = this.paletteRA} else {this.paletteB = this.paletteRB}

        // this.noiseRA = new noiseAggregator(135, 50, 110, 10, 4, 5);
        // this.noiseRA = new noiseAggregator(235, 50, 110, 4, 4, 5);  // klaas
        // this.noiseRA = new noiseAggregator(135, 150, 110, 24, 14, 10); // klaa2
        // this.noiseRA = new noiseAggregator(335, 60, 210, 24, 65, 65); // klaa3
        this.noiseRA = new noiseAggregator(135, 40, 60, 14, 45, 5); // klaa3

        // this.noiseSA = new noiseAggregator(155, 50, 80, 10, 20, 50);
        // this.noiseSA = new noiseAggregator(230, 38, 90, 4, 4, 5);  // klaas
        // this.noiseSA = new noiseAggregator(130, 158, 120, 28, 18, 9);  // klaas2
        this.noiseSA = new noiseAggregator(190, 5, 120, 28, 40, 10);  // klaas3

        this.noiseMucho = new noiseAggregator(100, 38, 60, 10, 8, 2);  // mucho

        this.createBoxes();

        this.normalizeNoises();

        if (this.DEBUG) {
            // this.showDebug();
            this.loopDEBUG();
        } else {

            // setTimeout(() => {
            //     this.loop1();
            // }, 0);

            // this.loop1()  // initial one with up and down

            // this.loop2(); // combined two
            // this.loop3();  // combined two
            // this.loop4();  // noisy space

            // this.loop5();  // canvas dots

            // this.loopBase();
            this.loop6();
            // this.loop8();
            // this.loop7();

        }
    }

    createBoxes() {

        var index = 0;

        this.noiseRAMin = 1;
        this.noiseRAMax = -1;
        this.noiseSAMin = 1;
        this.noiseSAMax = -1;
        this.noiseMuchoMin = 10;
        this.noiseMuchoMax = -10;

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
                var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 1, 1, 0, 0, 1, 1);
                // var noiseValueSA = this.noiseSA.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.5, 0);
                // var noiseValueSA = this.noiseSA.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.25, 0.25);
                var noiseValueSA = this.noiseSA.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 1, 1, 0, 0, 1, 1);

                // var noiseValueMucho = this.noiseMucho.createNoiseValue(w, h, 0, this.heightBoxCount, 1, 0.5, 0.5, 1, 0.5, 0.5);
                // var noiseValueMucho = this.noiseMucho.createNoiseValue(w, h, 0, this.heightBoxCount, 0, 0, 0, 0, 1, 1);
                // var noiseValueMucho = this.noiseMucho.createNoiseValue(w, h, 0, this.heightBoxCount, 1, 1, 0.5, 0.5, 0.15, 0.15);
                var noiseValueMucho = this.noiseMucho.createNoiseValue(w, h, 0, this.heightBoxCount, 1, 1, 1, 1, 1, 1);

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

                if (noiseValueMucho < this.noiseMuchoMin) {
                    this.noiseMuchoMin = noiseValueMucho;
                }
                if (noiseValueMucho > this.noiseMuchoMax) {
                    this.noiseMuchoMax = noiseValueMucho;
                }

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
                    "noiseValueMucho": noiseValueMucho,
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

        // console.log(this.noiseMuchoMax);
        // console.log(this.noiseMuchoMin);

    }

    normalizeNoises() {
        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].noiseValueMucho = map(this.boxes[i].noiseValueMucho, this.noiseMuchoMin, this.noiseMuchoMax, -1, 1);
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

    loop1() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].noiseValue2 > 0.5) {
                if (this.boxes[i].aboveHorizon) {
                    this.digndag(
                        {
                            centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                            centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                            noiseValue: this.boxes[i].noiseValue2,
                            vertexLength: 10, //map(this.boxes[i].noiseValue2, -1, 1, 3, 7),
                            strokeWeighty: 0.4, // map(this.boxes[i].noiseValue2, -1, 1, 0.1, 0.3),
                            angleMin: 2 * Math.PI / 12 * 4.75,
                            angleMax: 2 * Math.PI / 12 * 5.25,
                            revert: true,
                            cutOutValue: -1,
                            loopCount: 40, // map(this.boxes[i].noiseValue2, -1, 1, 5, 20),
                            colorList: this.palette3.palette,
                            noiseAngle: true,
                            group: "",
                        }
                    );
                } else {
                    this.digndag(
                        {
                            centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                            centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                            noiseValue: this.boxes[i].noiseValue2,
                            vertexLength: 10, // map(this.boxes[i].noiseValue2, -1, 1, 3, 7),
                            strokeWeighty: 0.4, //map(this.boxes[i].noiseValue2, -1, 1, 0.1, 0.3),
                            angleMin: 2 * Math.PI / 12 * 5.75,
                            angleMax: 2 * Math.PI / 12 * 6.25,
                            revert: true,
                            cutOutValue: -1,
                            loopCount: 40, //map(this.boxes[i].noiseValue2, -1, 1, 5, 20), // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                            colorList: this.palette4.palette,
                            noiseAngle: true,
                            group: "",
                        }
                    )
                }

            } else if (this.boxes[i].noiseValue2 > 0) {
                if (this.boxes[i].aboveHorizon) {
                    this.digndag(
                        {
                            centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                            centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                            noiseValue: this.boxes[i].noiseValue6,
                            vertexLength: 20, //map(this.boxes[i].noiseValue2, -1, 1, 3, 7),
                            strokeWeighty: 0.4, //map(this.boxes[i].noiseValue6, -1, 1, 0.1, 0.3),
                            angleMin: 2 * Math.PI / 12 * 2.5,
                            angleMax: 2 * Math.PI / 12 * 3.5,
                            revert: true,
                            cutOutValue: -1,
                            loopCount: 40, // map(this.boxes[i].noiseValue6, -1, 1, 5, 10),
                            colorList: this.palette11.palette,
                            noiseAngle: false,
                            group: "",
                        }
                    );
                } else {
                    this.digndag(
                        {
                            centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                            centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                            noiseValue: this.boxes[i].noiseValue6,
                            vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 3, 7),
                            strokeWeighty: 0.4, // map(this.boxes[i].noiseValue6, -1, 1, 0.1, 0.3),
                            angleMin: 2 * Math.PI / 12 * 2.5,
                            angleMax: 2 * Math.PI / 12 * 3.5,
                            revert: true,
                            cutOutValue: -1,
                            loopCount: 40, // map(this.boxes[i].noiseValue6, -1, 1, 5, 10), // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                            colorList: this.palette12.palette,
                            noiseAngle: false,
                            group: "",
                        }
                    )
                }

                // old loop1
            } else {

                if (this.boxes[i].aboveHorizon) {
                    this.digndag(
                        {
                            centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                            centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                            noiseValue: this.boxes[i].noiseValue1,
                            vertexLength: 30,
                            strokeWeighty: 0.4,
                            // angleMin: 2 * Math.PI / 12 * 1,
                            // angleMax: 2 * Math.PI / 12 * 3,
                            angleMin: 2 * Math.PI / 12 * 5.75,
                            angleMax: 2 * Math.PI / 12 * 6.25,
                            revert: true,
                            cutOutValue: -1,
                            loopCount: 20,
                            colorList: this.palette1.palette,
                            noiseAngle: false,
                            group: "",
                        }
                    );
                } else {
                    this.digndag(
                        {
                            centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                            centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                            noiseValue: this.boxes[i].noiseValue1,
                            vertexLength: 30, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                            strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                            angleMin: 2 * Math.PI / 12 * 5.75,
                            angleMax: 2 * Math.PI / 12 * 6.25,
                            revert: true,
                            cutOutValue: -1,
                            loopCount: 20,
                            colorList: this.palette2.palette,
                            noiseAngle: false,
                            normIt: false,
                            group: "",
                        }
                    )
                }

                if (this.boxes[i].aboveHorizon) {
                    this.digndag(
                        {
                            centerX: this.boxes[i].center.x + getRandomFromInterval(-10, 10),
                            centerY: this.boxes[i].center.y + getRandomFromInterval(-10, 10),
                            noiseValue: this.boxes[i].noiseValue1,
                            vertexLength: 20,
                            strokeWeighty: 0.4,
                            // angleMin: 2 * Math.PI / 12 * 1,
                            // angleMax: 2 * Math.PI / 12 * 3,
                            angleMin: 2 * Math.PI / 12 * 2.5,
                            angleMax: 2 * Math.PI / 12 * 3.5,
                            revert: true,
                            cutOutValue: -1,
                            loopCount: 20,
                            colorList: this.palette1.palette,
                            noiseAngle: false,
                            group: "",
                        }
                    );
                } else {
                    this.digndag(
                        {
                            centerX: this.boxes[i].center.x + getRandomFromInterval(-10, 10),
                            centerY: this.boxes[i].center.y + getRandomFromInterval(-10, 10),
                            noiseValue: this.boxes[i].noiseValue1,
                            vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                            strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                            angleMin: 2 * Math.PI / 12 * 2.5,
                            angleMax: 2 * Math.PI / 12 * 3.5,
                            revert: true,
                            cutOutValue: -1,
                            loopCount: 20,
                            colorList: this.palette2.palette,
                            noiseAngle: false,
                            group: "",
                        }
                    )
                }
            }

            if (this.boxes[i].horizon) {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x,
                        centerY: this.boxes[i].center.y,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                        strokeWeighty: 2.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 2.5,
                        angleMax: 2 * Math.PI / 12 * 3.5,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 120,
                        colorList: ["#383838"],
                        noiseAngle: false,
                        group: "",
                    }
                )

            }

        }

    }

    loop2() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].aboveHorizon) {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 10, //map(this.boxes[i].noiseValue2, -1, 1, 3, 7),
                        strokeWeighty: map(this.boxes[i].noiseValue2, -1, 1, 0.1, 0.3),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue2, -1, 1, 5, 10),
                        colorList: this.palette3.palette,
                        noiseAngle: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 10, // map(this.boxes[i].noiseValue2, -1, 1, 3, 7),
                        strokeWeighty: map(this.boxes[i].noiseValue2, -1, 1, 0.1, 0.3),
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue2, -1, 1, 5, 10), // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette4.palette,
                        noiseAngle: false,
                        group: "",
                    }
                )
            }


            if (this.boxes[i].aboveHorizon) {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue6,
                        vertexLength: 10, //map(this.boxes[i].noiseValue2, -1, 1, 3, 7),
                        strokeWeighty: map(this.boxes[i].noiseValue6, -1, 1, 0.1, 0.3),
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue6, -1, 1, 5, 10),
                        colorList: this.palette11.palette,
                        noiseAngle: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue6,
                        vertexLength: 10, // map(this.boxes[i].noiseValue2, -1, 1, 3, 7),
                        strokeWeighty: map(this.boxes[i].noiseValue6, -1, 1, 0.1, 0.3),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue6, -1, 1, 5, 10), // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette12.palette,
                        noiseAngle: false,
                        group: "",
                    }
                )
            }


            // if (this.boxes[i].aboveHorizon) {
            //     this.digndag(
            //         {
            //             centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
            //             centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
            //             noiseValue: this.boxes[i].noiseValue6,
            //             vertexLength: map(this.boxes[i].noiseValue6, -1, 1, 5, 10),
            //             strokeWeighty: map(this.boxes[i].noiseValue6, -1, 1, 0.1, 0.4),
            //             angleMin: 2 * Math.PI / 12 * 8,
            //             angleMax: 2 * Math.PI / 12 * 10,
            //             revert: true,
            //             cutOutValue: 0,
            //             loopCount: map(this.boxes[i].noiseValue6, -1, 1, 5, 20),
            //             // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
            //             colorList: this.palette11.palette,
            //             noiseAngle: true,
            //             group: "",
            //         }
            //     );
            // } else {
            //     this.digndag(
            //         {
            //             centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
            //             centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
            //             noiseValue: this.boxes[i].noiseValue6,
            //             vertexLength: map(this.boxes[i].noiseValue6, -1, 1, 5, 10),
            //             strokeWeighty: map(this.boxes[i].noiseValue6, -1, 1, 0.1, 0.4),
            //             angleMin: 2 * Math.PI / 12 * 10,
            //             angleMax: 2 * Math.PI / 12 * 12,
            //             revert: true,
            //             cutOutValue: 0,
            //             loopCount: map(this.boxes[i].noiseValue6, -1, 1, 5, 20),
            //             colorList: this.palette12.palette,
            //             noiseAngle: true,
            //             group: "",
            //         }
            //     )
            // }
        }
    }

    loop3() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].aboveHorizon) {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue4, -1, 1, 5, 20),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue4, -1, 1, 5, 140),
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette7.palette,
                        noiseAngle: true,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue4, -1, 1, 5, 20),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue4, -1, 1, 5, 140),
                        colorList: this.palette8.palette,
                        noiseAngle: true,
                        normIt: false,
                        group: "",
                    }
                )

            }

            if (this.boxes[i].aboveHorizon) {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue4, -1, 1, 5, 20),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue4, -1, 1, 5, 40),
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette9.palette,
                        noiseAngle: true,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue4, -1, 1, 5, 20),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue4, -1, 1, 5, 40),
                        colorList: this.palette10.palette,
                        noiseAngle: true,
                        normIt: false,
                        group: "",
                    }
                )
            }

        }
    }

    loop4() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue3,
                        vertexLength: map(this.boxes[i].noiseValue3, -1, 1, 5, 20),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: 0.75,
                        loopCount: map(this.boxes[i].noiseValue3, -1, 1, 5, 40),
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette13.palette,
                        noiseAngle: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue3,
                        vertexLength: map(this.boxes[i].noiseValue3, -1, 1, 5, 20),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: 0.75,
                        loopCount: map(this.boxes[i].noiseValue3, -1, 1, 5, 40),
                        colorList: this.palette14.palette,
                        noiseAngle: false,
                        group: "",
                    }
                )
            }


            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue5,
                        vertexLength: map(this.boxes[i].noiseValue5, -1, 1, 5, 10),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 7,
                        angleMax: 2 * Math.PI / 12 * 1,
                        revert: true,
                        cutOutValue: 0.75,
                        loopCount: map(this.boxes[i].noiseValue5, -1, 1, 5, 100),
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette15.palette,
                        noiseAngle: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue5,
                        vertexLength: map(this.boxes[i].noiseValue5, -1, 1, 5, 10),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 7,
                        angleMax: 2 * Math.PI / 12 * 1,
                        revert: true,
                        cutOutValue: 0.75,
                        loopCount: map(this.boxes[i].noiseValue5, -1, 1, 5, 100),
                        colorList: this.palette16.palette,
                        noiseAngle: false,
                        group: "",
                    }
                )
            }


        }

    }

    loop5() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            // if (this.drawSkipMargin(this.boxes[i])) {
            //     continue;
            // }

            drawing.rect(2 + getRandomFromInterval(0, 1), 2 + getRandomFromInterval(0, 1)).move(this.boxes[i].center.x + getRandomFromInterval(0, 3), this.boxes[i].center.y + getRandomFromInterval(0, 3)).fill('#8f8f8f17')


        }

    }


    loopDEBUG() {
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
                    noiseValueMin: this.noiseRAMin,
                    noiseValueMax: this.noiseRAMax,
                }).draw();
            } else {
                new deugy({
                    x: this.boxes[i].A.x,
                    y: this.boxes[i].A.y,
                    width: this.boxSize,
                    height: this.boxSize,
                    colorList: this.paletteRB.palette,
                    noiseValue: this.boxes[i].noiseValueSA,
                    noiseValueMin: this.noiseSAMin,
                    noiseValueMax: this.noiseSAMax,
                }).draw();
            }

            // new deugy({
            //     x: this.boxes[i].A.x,
            //     y: this.boxes[i].A.y,
            //     width: this.boxSize,
            //     height: this.boxSize,
            //     colorList: this.paletteRA.palette,
            //     noiseValue: this.boxes[i].noiseValueMucho,
            //     noiseValueMin: this.noiseMuchoMin,
            //     noiseValueMax: this.noiseMuchoMax,
            // }).draw();

        }
    }

    loopBase() {
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

            // if (fxrand() > 0.2) { this.paletteA = this.paletteRA } else { this.paletteA = this.paletteOne }
            // if (fxrand() > 0.2) { this.paletteB = this.paletteRB } else { this.paletteB = this.paletteOne }


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


    loop6() {
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
            //                 revert: true,
            //                 cutOutValue: -1,
            //                 loopCount: 5, // map(this.boxes[i].noiseValue7, -1, 1, 1, 5),
            //                 // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
            //                 colorList: this.palette15.palette,
            //                 noiseAngle: false,
            //                 group: "",
            //             }
            //         );
            //     }
            // }

            // gescccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccheiter
            if (fxrand() > 0) { this.paletteA = this.paletteRA } else { this.paletteA = this.paletteOne }
            if (fxrand() > 0) { this.paletteB = this.paletteRB } else { this.paletteB = this.paletteOne }


            // if (this.boxes[i].horizon) {
            //     new digi({
            //         x: this.boxes[i].center.x,
            //         y: this.boxes[i].center.y,
            //         noiseValue: this.boxes[i].noiseValueRA,
            //         noiseValueMin: this.noiseRAMin,
            //         noiseValueMax: this.noiseRAMax,
            //         colorNoise: this.boxes[i].noiseValueMucho,
            //         colorNoiseMin: this.noiseMuchoMin,
            //         colorNoiseMax: this.noiseMuchoMax,
            //         vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
            //         strokeWeighty: 0.5, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
            //         // angleMin: 2 * Math.PI / 12 * 2.5,
            //         // angleMax: 2 * Math.PI / 12 * 3.5,
            //         angleMean: Math.PI / 1,
            //         angleSTD: Math.PI / 56,
            //         revert: true,
            //         cutOutValue: -1,
            //         loopCount: 20,
            //         colorList: new dynamicPalette("#979797", 5, 25, 10).palette,
            //         noiseAngle: false,
            //         group: "",
            //         drawing: drawing,
            //         horizonRow: this.horizonRow,
            //         i: i,
            //         longBoxCount: this.longBoxCount,
            //     }).draw();
            // }

            // some Shapes
            // if (this.boxes[i].center.y >= 440 && this.boxes[i].center.y <= 640) {
            //     new digi({
            //         x: this.boxes[i].center.x,
            //         y: this.boxes[i].center.y,
            //         noiseValue: this.boxes[i].noiseValueRA,
            //         noiseValueMin: this.noiseRAMin,
            //         noiseValueMax: this.noiseRAMax,
            //         colorNoise: this.boxes[i].noiseValueMucho,
            //         colorNoiseMin: this.noiseMuchoMin,
            //         colorNoiseMax: this.noiseMuchoMax,
            //         vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
            //         strokeWeighty: 0.5, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
            //         // angleMin: 2 * Math.PI / 12 * 2.5,
            //         // angleMax: 2 * Math.PI / 12 * 3.5,
            //         angleMean: Math.PI / 1,
            //         angleSTD: Math.PI / 56,
            //         revert: true,
            //         cutOutValue: -1,
            //         loopCount: 20,
            //         colorList: new dynamicPalette("#979797", 5, 25, 10).palette,
            //         noiseAngle: false,
            //         group: "",
            //         drawing: drawing,
            //         horizonRow: this.horizonRow,
            //         i: i,
            //         longBoxCount: this.longBoxCount,
            //     }).draw();
            // }

            if (this.boxes[i].aboveHorizon) {
                // if (fxrand() > 0.05) { var patty = this.paletteRA.palette } else { var patty = this.paletteRAprot.palette };
                new digi_rectOnly({
                    x: this.boxes[i].center.x,
                    y: this.boxes[i].center.y,
                    noiseValue: this.boxes[i].noiseValueRA,
                    noiseValueMin: this.noiseRAMin,
                    noiseValueMax: this.noiseRAMax,
                    colorNoise: this.boxes[i].noiseValueMucho,
                    colorNoiseMin: this.noiseMuchoMin,
                    colorNoiseMax: this.noiseMuchoMax,
                    vertexLength: 160 / this.shortBoxCount * 30, // map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, 10, 30), // 30,
                    strokeWeighty: 160 / this.shortBoxCount * 0.3, //map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, 0.05, 0.25), // 0.3,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    circleRadius: 10,
                    circleStroke: 0.25,
                    loopCircle: map(this.boxes[i].noiseValueRA, -1, 1, 3, 20),
                    loopRect: 1,
                    rectWidth: map(this.boxes[i].noiseValueRA, -1, 1, 5, 30), // 12,
                    rectHeight: 6,
                    rectStroke: 0.4,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: map(this.boxes[i].noiseValueRA, -1, 1, 20, 50), // 20,
                    colorList: this.paletteA.palette,
                    // colorList: patty,
                    noiseAngle: false,
                    group: "",
                    drawing: drawing,
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                }).draw();
            } else {
                new digi_rectOnly({
                    x: this.boxes[i].center.x,
                    y: this.boxes[i].center.y,
                    noiseValue: this.boxes[i].noiseValueSA,
                    noiseValueMin: this.noiseSAMin,
                    noiseValueMax: this.noiseSAMax,
                    colorNoise: this.boxes[i].noiseValueMucho,
                    colorNoiseMin: this.noiseMuchoMin,
                    colorNoiseMax: this.noiseMuchoMax,
                    vertexLength: 160 / this.shortBoxCount * 30, // map(this.boxes[i].noiseValueSA, -1, 1, 30, 50), // 30, // sau
                    strokeWeighty: 160 / this.shortBoxCount * 0.3, //map(this.boxes[i].noiseValueSA, this.noiseSAMin, this.noiseSAMax, 0.05, 0.25), // 0.3,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    circleRadius: 10,
                    circleStroke: 0.25,
                    loopCircle: map(this.boxes[i].noiseValueRA, -1, 1, 3, 20),
                    loopRect: 2,
                    rectWidth: 12,
                    rectHeight: 6,
                    rectStroke: 0.4,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: map(this.boxes[i].noiseValueSA, -1, 1, 20, 50), // 20,
                    colorList: this.paletteB.palette,
                    noiseAngle: false,
                    group: "",
                    drawing: drawing,
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                }).draw();
            }

        }

    }

    loop7() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (fxrand() > 0) { this.paletteA = this.paletteRA } else { this.paletteA = this.paletteOne }
            if (fxrand() > 0) { this.paletteB = this.paletteRB } else { this.paletteB = this.paletteOne }

            if (this.boxes[i].aboveHorizon) {
                new digi({
                    x: this.boxes[i].center.x + getNormallyDistributedRandomNumber(3, 1),
                    y: this.boxes[i].center.y + getNormallyDistributedRandomNumber(3, 1),
                    noiseValue: this.boxes[i].noiseValueRA,
                    noiseValueMin: this.noiseRAMin,
                    noiseValueMax: this.noiseRAMax,
                    colorNoise: this.boxes[i].noiseValueMucho,
                    colorNoiseMin: this.noiseMuchoMin,
                    colorNoiseMax: this.noiseMuchoMax,
                    vertexLength: map(this.boxes[i].noiseValueRA, -1, 1, 5, 30), // 15,
                    strokeWeighty: 0.1, //map(this.boxes[i].noiseValueRA, -1, 1, 0.05, 0.25), // 0.1,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    circleRadius: 2,
                    circleStroke: 0.1, //map(this.boxes[i].noiseValueRA, -1, 1, 0.75, 0.15), //0.1
                    loopCircle: map(this.boxes[i].noiseValueRA, -1, 1, 3, 15), // 5,
                    loopRect: map(this.boxes[i].noiseValueRA, -1, 1, 3, 10), //10,
                    rectWidth: 6,
                    rectHeight: 2,
                    rectStroke: 0.1,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: 25,
                    colorList: this.paletteA.palette,
                    noiseAngle: true,
                    group: "",
                    drawing: drawing,
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                }).draw();
            } else {
                new digi({
                    x: this.boxes[i].center.x + getNormallyDistributedRandomNumber(3, 1),
                    y: this.boxes[i].center.y + getNormallyDistributedRandomNumber(3, 1),
                    noiseValue: this.boxes[i].noiseValueSA,
                    noiseValueMin: this.noiseSAMin,
                    noiseValueMax: this.noiseSAMax,
                    colorNoise: this.boxes[i].noiseValueMucho,
                    colorNoiseMin: this.noiseMuchoMin,
                    colorNoiseMax: this.noiseMuchoMax,
                    vertexLength: 15, //map(this.boxes[i].noiseValueRA, -1, 1, 5, 20), // 15,
                    strokeWeighty: 0.075, // map(this.boxes[i].noiseValueSA, -1, 1, 0.05, 0.25), // 0.1,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    circleRadius: 2,
                    circleStroke: 0.075,
                    loopCircle: 5,
                    loopRect: 10,
                    rectWidth: 6,
                    rectHeight: 2,
                    rectStroke: 0.2,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: 25,
                    colorList: this.paletteB.palette,
                    noiseAngle: true,
                    group: "",
                    drawing: drawing,
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
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

            if (this.boxes[i].aboveHorizon) {
                new zigi(
                    {
                        x: this.boxes[i].center.x,
                        y: this.boxes[i].center.y,
                        noiseValue: this.boxes[i].noiseValueRA,
                        noiseValueMin: this.noiseRAMin,
                        noiseValueMax: this.noiseRAMax,
                        colorNoise: this.boxes[i].noiseValueMucho,
                        colorNoiseMin: this.noiseMuchoMin,
                        colorNoiseMax: this.noiseMuchoMax,
                        vertexLength: 10, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
                        strokeWeighty: 0.05, // map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
                        angleMin: 0,
                        angleMax: Math.PI,
                        cutOutValue: -1,
                        loopCount: map(this.boxes[i].noiseValueRA, -1, 1, 1, 10),
                        // colorList: this.paletteRA.palette,
                        colorList: ["#161616", "#353535", "#727272", "#8d8c8c", "#adadad", "#c7c7c7"],
                        group: "",
                    }
                ).draw();
            } else {
                new zigi(
                    {
                        x: this.boxes[i].center.x,
                        y: this.boxes[i].center.y,
                        noiseValue: this.boxes[i].noiseValueSA,
                        noiseValueMin: this.noiseSAMin,
                        noiseValueMax: this.noiseSAMax,
                        colorNoise: this.boxes[i].noiseValueMucho,
                        colorNoiseMin: this.noiseMuchoMin,
                        colorNoiseMax: this.noiseMuchoMax,
                        vertexLength: 10, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
                        strokeWeighty: 0.05, // map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
                        angleMin: 0,
                        angleMax: Math.PI,
                        cutOutValue: -1,
                        loopCount: map(this.boxes[i].noiseValueSA, -1, 1, 1, 10),
                        // colorList: this.paletteRB.palette,
                        colorList: ["#161616", "#353535", "#727272", "#8d8c8c", "#adadad", "#c7c7c7"],
                        group: "",
                    }
                ).draw();
            }

        }

    }

}