
class Grid {
    constructor(data) {
        this.horizonRatio = 4 / 7;

        this.overshoot = data.overshoot;  // time limit reached
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

        // this.palette1 = new dynamicPalette(this.drawing, "#6286a0", 4, 4);
        // this.palette2 = new dynamicPalette(this.drawing, "#48794a", 2, 4);
        // this.palette3 = new dynamicPalette(this.drawing, "#74a0bd", -2, 0);
        // this.palette4 = new dynamicPalette(this.drawing, "#537955", -3, 1);
        // this.palette5 = new dynamicPalette(this.drawing, "#438aa1", 0, 0);
        // this.palette6 = new dynamicPalette(this.drawing, "#469e6e", 0, 0);
        // this.palette7 = new dynamicPalette(this.drawing, "#6c93ad", 2, 2);
        // this.palette8 = new dynamicPalette(this.drawing, "#467a5a", 2, 4);
        // this.palette9 = new dynamicPalette(this.drawing, "#8ab8ec", 1, 1);
        // this.palette10 = new dynamicPalette(this.drawing, "#5aa066", 1, 1);
        // this.palette11 = new dynamicPalette(this.drawing, "#6a9bd4", 2, 5);
        // this.palette12 = new dynamicPalette(this.drawing, "#7ac486", 2, 5);
        // this.palette13 = new dynamicPalette(this.drawing, "#25568f", 2, 5);
        // this.palette14 = new dynamicPalette(this.drawing, "#1d6329", 2, 5);
        // this.palette15 = new dynamicPalette(this.drawing, "#6eb179", 0, 0);
        // this.palette16 = new dynamicPalette(this.drawing, "#a2bfe0", 0, 0);

        // this.palette1 = new dynamicPalette(this.drawing, "#6286a0", 3, 4, -2);
        // this.palette2 = new dynamicPalette(this.drawing, "#548155", 3, 4, 2);
        // this.palette3 = new dynamicPalette(this.drawing, "#6286a0", 1, -2, 1);
        // this.palette4 = new dynamicPalette(this.drawing, "#548155", 1, -2, 1);
        // this.palette5 = new dynamicPalette(this.drawing, "#6286a0", 2, 0, 0);
        // this.palette6 = new dynamicPalette(this.drawing, "#6286a0", 2, 0, 0);
        // this.palette7 = new dynamicPalette(this.drawing, "#6286a0", 2, 2, 2);
        // this.palette8 = new dynamicPalette(this.drawing, "#6286a0", 2, 2, 0);
        // this.palette9 = new dynamicPalette(this.drawing, "#6286a0", 2, 1, 1);
        // this.palette10 = new dynamicPalette(this.drawing, "#6286a0", 2, 1, 1);
        // this.palette11 = new dynamicPalette(this.drawing, "#6286a0", 2, 2, 0);
        // this.palette12 = new dynamicPalette(this.drawing, "#548155", 2, 2, 0);
        // this.palette13 = new dynamicPalette(this.drawing, "#6286a0", 2, 2, 0);
        // this.palette14 = new dynamicPalette(this.drawing, "#6286a0", 2, 2, 0);
        // this.palette15 = new dynamicPalette(this.drawing, "#6286a0", 2, 0, 0);
        // this.palette16 = new dynamicPalette(this.drawing, "#6286a0", 2, 0, 0);

        if (this.overshoot == true) {
            this.aboveTone = "#cec9b1";
            this.underneathTone = "#869290";

            this.vogerl1 = { palette: ["#a0a8be"] };
            this.vogerl2 = { palette: ["#94a595"] };
        } else {
            this.aboveTone = "#cdd7df";
            this.underneathTone = "#6e8578";
            // this.vogerl1 = new dynamicPalette(this.drawing, "#3d4a66", -2, 0);
            this.vogerl1 = { palette: ["#a0a8be"] };
            // this.vogerl1 = { palette: [this.underneathTone] };
            // this.vogerl2 = new dynamicPalette(this.drawing, "#374736", 5, -2);
            this.vogerl2 = { palette: ["#94a595"] };
            // this.vogerl2 = { palette: [this.aboveTone] };
        }


        this.palette1 = new dynamicPalette(this.drawing, this.aboveTone, 3, 4, -2);
        this.palette2 = new dynamicPalette(this.drawing, this.underneathTone, 3, 4, 2);
        this.palette3 = new dynamicPalette(this.drawing, this.aboveTone, 1, -2, 1);
        this.palette4 = new dynamicPalette(this.drawing, this.underneathTone, 1, -2, 1);
        this.palette5 = new dynamicPalette(this.drawing, this.aboveTone, 2, 0, 0);
        this.palette6 = new dynamicPalette(this.drawing, this.underneathTone, 2, 0, 0);
        this.palette7 = new dynamicPalette(this.drawing, this.aboveTone, 2, 2, 2);
        this.palette8 = new dynamicPalette(this.drawing, this.underneathTone, 2, 2, 0);
        this.palette9 = new dynamicPalette(this.drawing, this.aboveTone, 2, 1, 1);
        this.palette10 = new dynamicPalette(this.drawing, this.underneathTone, 2, 1, 1);
        this.palette11 = new dynamicPalette(this.drawing, this.aboveTone, 2, 2, 0);
        this.palette12 = new dynamicPalette(this.drawing, this.underneathTone, 2, 2, 0);
        this.palette13 = new dynamicPalette(this.drawing, this.aboveTone, 2, 2, 0);
        this.palette14 = new dynamicPalette(this.drawing, this.underneathTone, 2, 2, 0);
        this.palette15 = new dynamicPalette(this.drawing, this.aboveTone, 2, 0, 0);
        this.palette16 = new dynamicPalette(this.drawing, this.underneathTone, 2, 0, 0);


        this.noise1 = new noiseArea(120, 1);
        this.noise2 = new noiseArea(120, 3);
        this.noise3 = new noiseArea(250, 10);
        this.noise4 = new noiseArea(140, 4);
        this.noise5 = new noiseArea(5, 15);
        this.noise6 = new noiseArea(120, 15);
        this.noise7 = new noiseArea(150, 10);
        this.noise8 = new noiseArea(120, 60);

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


        // setTimeout(() => {
        //     this.loop1();
        // }, 0);

        this.loop1()  // initial one with up and down

        // this.loop2(); // combined two
        // this.loop3();  // combined two
        // this.loop4();  // noisy space

        // this.loop5();  // canvas dots
        // this.loop6();  // empty
        // this.loop7();  // empty

        this.loop8();
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
                var aboveHorizon = h <= this.horizonRow;;

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
                    "noiseValue1": this.noise1.createNoiseValue(w, h),
                    "noiseValue2": this.noise2.createNoiseValue(w, h),
                    "noiseValue3": this.noise3.createNoiseValue(w, h),
                    "noiseValue4": this.noise4.createNoiseValue(w, h),
                    "noiseValue5": this.noise5.createNoiseValue(w, h),
                    "noiseValue6": this.noise6.createNoiseValue(w, h),
                    "noiseValue7": this.noise7.createNoiseValue(w, h),
                    "noiseValue8": this.noise8.createNoiseValue(w, h),
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
            this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).stroke({ color: '#f06', opacity: 1, width: 0.5 }).fill("none");
            //  draw noise
            // this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).stroke({ color: '#f06', opacity: 1, width: 0.5 }).fill({ color: hslToHex(120, map(this.boxes[i].noiseValue1, -1, 1, 0, 100), 50) })
            this.drawing.rect(this.boxSize, this.boxSize).move(this.boxes[i].A.x, this.boxes[i].A.y).stroke({ color: '#f06', opacity: 1, width: 0.5 }).fill({
                // color: tinycolor({ h: 100, s: map(this.boxes[i].noiseValue1, -1, 1, 0, 1), l: 0.5 }).toHexString()
                color: tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(this.boxes[i].noiseValue1, -1, 1, -10, 10)).toHexString()
            });
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
        let group = data.group;

        let noiseValue = 0;
        let angle = 0;
        let colorList = [];

        noiseValue = data.noiseValue;
        colorList = data.colorList;

        if (noiseValue > data.cutOutValue) {

            let colorSelect = Math.round(map(noiseValue, -1, 1, 0, (colorList.length - 1)));

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
            this.drawing.polyline(polyLineString).fill('none').stroke({ width: strokeWeighty, color: colorList[colorSelect] });
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

            // sau
            drawing.rect(2 + getRandomFromInterval(0, 1), 2 + getRandomFromInterval(0, 1)).move(this.boxes[i].center.x + getRandomFromInterval(0, 3), this.boxes[i].center.y + getRandomFromInterval(0, 3)).fill('#8f8f8f17')


        }

    }
    loop6() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
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
                this.zignzag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue8,
                        vertexLength: 5, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
                        strokeWeighty: 0.1, // map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
                        angleMin: 0,
                        angleMax: Math.PI,
                        cutOutValue: -1,
                        loopCount: map(this.boxes[i].noiseValue8, -1, 1, 1, 15),
                        colorList: this.vogerl1.palette,
                        group: "",
                    }
                );
            } else {
                this.zignzag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue8,
                        vertexLength: 5, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
                        strokeWeighty: 0.1, // map(this.boxes[i].noiseValue8, -1, 1, 0.1, 0.3), // 1,
                        angleMin: 0,
                        angleMax: Math.PI,
                        cutOutValue: -1,
                        loopCount: map(this.boxes[i].noiseValue8, -1, 1, 1, 15),
                        colorList: this.vogerl2.palette,
                        group: "",
                    }
                );
            }

        }

    }

}