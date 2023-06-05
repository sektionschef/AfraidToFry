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

        // this.columns = new Set();
        // this.rows = new Set();
        this.boxes = [];
        // this.stripes = [];
        // this.stripeLines = [];

        if (this.overshoot == true) {
            this.aboveTone = "#cec9b1";
            this.underneathTone = "#869290";

            this.vogerl1 = { palette: ["#a0a8be"] };
            this.vogerl2 = { palette: ["#94a595"] };
        } else {
            this.aboveTone = "#cdd7df";
            this.underneathTone = "#6e8578";
            // this.vogerl1 = new dynamicPalette(this.drawing, "#3d4a66", -2, 0);
            this.vogerl1 = { palette: ["#616368"] };
            // this.vogerl1 = { palette: [this.underneathTone] };
            // this.vogerl2 = new dynamicPalette(this.drawing, "#374736", 5, -2);
            this.vogerl2 = { palette: ["#94a595"] };
            // this.vogerl2 = { palette: [this.aboveTone] };
        }

        // this.paletteRA = new dynamicPalette(this.drawing, "#ABC6DE", 3, -10, 6);
        // this.paletteRA = new dynamicPalette(this.drawing, "#b7c6d4", 3, -10, 6);
        this.paletteRA = new dynamicPalette("#b7c6d4", 15, 25, 10);
        this.paletteRAbby = new dynamicPalette("#b7c6d4", 15, 25, 10);

        // this.paletteRAbby = new dynamicPalette(this.drawing, "#ABC6DE", 5, -15, 10);

        this.paletteRB = new dynamicPalette("#899c89", 25, 35, 10);
        this.paletteRBbby = new dynamicPalette("#a4cca4", 25, 35, 10);

        // this.paletteSA = { palette: ["#F4F4F2", "#c7bebe", "#8f9299", "#6b6f75"] };
        // this.paletteSB = { palette: ["#F4F4F2", "#E8E8E8", "#BBBFCA", "#95989e"] };

        // this.noise1 = new noiseArea(120, 1);
        // this.noise2 = new noiseArea(120, 3);
        // this.noise3 = new noiseArea(250, 10);
        // this.noise4 = new noiseArea(140, 4);
        // this.noise5 = new noiseArea(5, 15);
        // this.noise6 = new noiseArea(120, 15);
        // this.noise7 = new noiseArea(150, 10);
        // this.noise8 = new noiseArea(120, 60);

        // this.noiseRA = new noiseAggregator(135, 50, 110, 10, 4, 5);
        this.noiseRA = new noiseAggregator(235, 50, 110, 4, 4, 5);
        // this.noiseSA = new noiseAggregator(155, 50, 80, 10, 20, 50);
        this.noiseSA = new noiseAggregator(230, 38, 90, 4, 4, 5);


        this.createBoxes();

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
            this.loop6();  // half - ganz nicer effect
            this.loop7();  // neuer grid - 20230529

            // this.loop8();
        }



    }

    createBoxes() {

        var index = 0;

        this.noiseRAMin = 1;
        this.noiseRAMax = -1;
        this.noiseSAMin = 1;
        this.noiseSAMax = -1;

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
                var noiseValueRA = this.noiseRA.createNoiseValue(w, h, 0, this.horizonRow, 1, 0, 0, 1, 0.5, 0.5);
                // var noiseValueSA = this.noiseSA.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.5, 0);
                var noiseValueSA = this.noiseSA.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.5, 0.5);

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

    showDebug() {
        for (var i = 0; i < this.boxes.length; i++) {

            // only stroke
            // this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).stroke({ color: '#f06', opacity: 1, width: 0.5 }).fill("none");

            //  draw noise
            // this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).stroke({ color: '#f06', opacity: 1, width: 0.5 }).fill({ color: hslToHex(120, map(this.boxes[i].noiseValue1, -1, 1, 0, 100), 50) })
            // this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).stroke({ color: '#f06', opacity: 1, width: 0.5 }).fill({
            // color: tinycolor({ h: 100, s: map(this.boxes[i].noiseValue1, -1, 1, 0, 1), l: 0.5 }).toHexString()
            // color: tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(this.boxes[i].noiseValue1, -1, 1, -10, 10)).toHexString()
            // });
            // draw differnt colors
            // this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).fill(getRandomFromList(['#f06', "#37ad37ff", "#528bd6ff"]))


            const svgNode = document.getElementById('svgNode');

            var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttributeNS(null, 'x', this.boxes[i].A.x);
            rect.setAttributeNS(null, 'y', this.boxes[i].A.y);
            rect.setAttributeNS(null, 'height', this.boxSize);
            rect.setAttributeNS(null, 'width', this.boxSize);
            rect.setAttributeNS(null, 'stroke', '#f06');
            rect.setAttributeNS(null, 'stroke-width', '0.5');

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


    digndag(data) {

        let center = { x: data.centerX, y: data.centerY };
        let vertexLength = data.vertexLength;
        let strokeWeighty = data.strokeWeighty;
        let angleMin = data.angleMin;
        let angleMax = data.angleMax;
        let loopCount = data.loopCount;
        let group = data.group;

        let noiseValue = 0;
        let angle = 0;
        let colorList = [];

        noiseValue = data.noiseValue;
        colorList = data.colorList;

        if (noiseValue > data.cutOutValue) {

            let colorSelect = Math.round(map(noiseValue, -1, 1, 0, (colorList.length - 1)));
            let color_d = colorList[colorSelect];
            // let color_d = tinycolor(colorList[colorSelect]).spin(getRandomFromInterval(-20, 20)).darken(getRandomFromInterval(-5, 5)).desaturate(getRandomFromInterval(-10, 10)).toHexString();

            // point and add new point
            var oldPoint = center;
            var newPoint = oldPoint;
            // console.log(angleBetweenPoints(pointA, pointB));
            var polyLineString = createCoordString(oldPoint);

            for (var i = 0; i < loopCount; i++) {

                if (data.noiseAngle) {
                    angle = map(noiseValue, -1, 1, 0, 2 * Math.PI) + getRandomFromInterval(-0.5, 0.5);
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
            // with svg.js
            // this.drawing.polyline(polyLineString).fill('none').stroke({ width: strokeWeighty, color: color_d });

            // without svg.js
            const polyNode = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyNode.setAttributeNS(null, 'points', polyLineString);
            polyNode.setAttributeNS(null, 'fill', 'none');
            polyNode.setAttributeNS(null, 'stroke', 'black');
            svgNode.appendChild(polyNode);
        }

    }

    zignzag(data) {
        let center = { x: data.centerX, y: data.centerY };
        let vertexLength = data.vertexLength;
        let strokeWeighty = data.strokeWeighty;
        let angleMin = data.angleMin;
        let angleMax = data.angleMax;
        let loopCount = data.loopCount;
        let group = data.group;

        let noiseValue = 0;
        let angle = 0;
        let colorList = [];

        noiseValue = data.noiseValue;
        colorList = data.colorList;

        if (noiseValue > data.cutOutValue) {

            let colorSelect = Math.round(map(noiseValue, -1, 1, 0, (colorList.length - 1)));

            var polyLineString = createCoordString(center);

            for (var i = 0; i < loopCount; i++) {

                angle = getRandomFromInterval(angleMin, angleMax);

                var newPoint = vectorAdd(center, vectorFromAngle(angle, vertexLength * getRandomFromInterval(0.9, 1.1)));
                polyLineString = polyLineString.concat(" ", createCoordString(newPoint));
            }

            this.drawing.polyline(polyLineString).fill('none').stroke({ width: strokeWeighty, color: colorList[colorSelect] });
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


            if (this.boxes[i].horizon) {
                new digi({
                    x: this.boxes[i].center.x,
                    y: this.boxes[i].center.y,
                    noiseValue: this.boxes[i].noiseValueRA,
                    noiseValueMin: this.noiseRAMin,
                    noiseValueMax: this.noiseRAMax,
                    vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                    strokeWeighty: 0.5, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                    // angleMin: 2 * Math.PI / 12 * 2.5,
                    // angleMax: 2 * Math.PI / 12 * 3.5,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: 20,
                    colorList: new dynamicPalette("#979797", 5, 25, 10).palette,
                    noiseAngle: false,
                    group: "",
                    drawing: drawing,
                }).draw();
            }

            if (this.boxes[i].aboveHorizon) {
                // if (fxrand() > 0.05) { var patty = this.paletteRA.palette } else { var patty = this.paletteRAprot.palette };
                new digi({
                    x: this.boxes[i].center.x,
                    y: this.boxes[i].center.y,
                    noiseValue: this.boxes[i].noiseValueRA,
                    noiseValueMin: this.noiseRAMin,
                    noiseValueMax: this.noiseRAMax,
                    vertexLength: 30, // map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, 10, 30), // 30,
                    strokeWeighty: map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, 0.05, 0.25), // 0.1,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, 20, 50), // 20,
                    colorList: this.paletteRA.palette,
                    // colorList: patty,
                    noiseAngle: false,
                    group: "",
                    drawing: drawing,
                }).draw();
            } else {
                new digi({
                    x: this.boxes[i].center.x,
                    y: this.boxes[i].center.y,
                    noiseValue: this.boxes[i].noiseValueSA,
                    noiseValueMin: this.noiseSAMin,
                    noiseValueMax: this.noiseSAMax,
                    vertexLength: 30, // map(this.boxes[i].noiseValueSA, -1, 1, 30, 50), // 30,
                    strokeWeighty: map(this.boxes[i].noiseValueSA, this.noiseSAMin, this.noiseSAMax, 0.05, 0.25), // 0.1,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: 20,
                    colorList: this.paletteRB.palette,
                    noiseAngle: false,
                    group: "",
                    drawing: drawing,
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

            if (this.boxes[i].aboveHorizon) {
                new digi({
                    x: this.boxes[i].center.x + getNormallyDistributedRandomNumber(3, 1),
                    y: this.boxes[i].center.y + getNormallyDistributedRandomNumber(3, 1),
                    noiseValue: this.boxes[i].noiseValueRA,
                    noiseValueMin: this.noiseRAMin,
                    noiseValueMax: this.noiseRAMax,
                    vertexLength: 15, // map(this.boxes[i].noiseValueRA, -1, 1, 30, 50), // 30,
                    strokeWeighty: 0.075, //map(this.boxes[i].noiseValueRA, -1, 1, 0.05, 0.25), // 0.1,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: 25,
                    colorList: this.paletteRAbby.palette,
                    noiseAngle: true,
                    group: "",
                    drawing: drawing,
                }).draw();
            } else {
                new digi({
                    x: this.boxes[i].center.x + getNormallyDistributedRandomNumber(3, 1),
                    y: this.boxes[i].center.y + getNormallyDistributedRandomNumber(3, 1),
                    noiseValue: this.boxes[i].noiseValueSA,
                    noiseValueMin: this.noiseSAMin,
                    noiseValueMax: this.noiseSAMax,
                    vertexLength: 15, // map(this.boxes[i].noiseValueRA, -1, 1, 30, 50), // 30,
                    strokeWeighty: 0.075, // map(this.boxes[i].noiseValueSA, -1, 1, 0.05, 0.25), // 0.1,
                    angleMean: Math.PI / 1,
                    angleSTD: Math.PI / 56,
                    revert: true,
                    cutOutValue: -1,
                    loopCount: 25,
                    colorList: this.paletteRBbby.palette,
                    noiseAngle: true,
                    group: "",
                    drawing: drawing,
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
                        vertexLength: 5, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
                        strokeWeighty: 0.2, // map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
                        angleMin: 0,
                        angleMax: Math.PI,
                        cutOutValue: -1,
                        loopCount: map(this.boxes[i].noiseValueRA, this.noiseRAMin, this.noiseRAMax, 1, 10),
                        // colorList: this.paletteRA.palette,
                        colorList: new dynamicPalette(this.drawing, "#979797", 3, -10, 6).palette,
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
                        vertexLength: 5, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
                        strokeWeighty: 0.05, // map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
                        angleMin: 0,
                        angleMax: Math.PI,
                        cutOutValue: -1,
                        loopCount: map(this.boxes[i].noiseValueSA, this.noiseSAMin, this.noiseSAMax, 1, 10),
                        // colorList: this.paletteRB.palette,
                        colorList: new dynamicPalette(this.drawing, "#979797", 3, -10, 6).palette,
                        group: "",
                    }
                ).draw();
            }

        }

    }

}