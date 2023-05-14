
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

        this.palette1 = new dynamicPalette(this.drawing, "#6363b1");
        this.palette2 = new dynamicPalette(this.drawing, "#63b181");
        this.palette3 = new dynamicPalette(this.drawing, "#6363b1");
        this.palette4 = new dynamicPalette(this.drawing, "#63b181");
        this.palette5 = new dynamicPalette(this.drawing, "#6363b1");
        this.palette6 = new dynamicPalette(this.drawing, "#63b181");
        this.palette7 = new dynamicPalette(this.drawing, "#6363b1");
        this.palette8 = new dynamicPalette(this.drawing, "#63b181");

        this.noise1 = new noiseArea(150, 10);
        this.noise2 = new noiseArea(140, 4);
        this.noise3 = new noiseArea(150, 10);
        this.noise4 = new noiseArea(140, 9);
        this.noise5 = new noiseArea(150, 10);
        this.noise6 = new noiseArea(140, 9);
        this.noise7 = new noiseArea(150, 10);
        this.noise8 = new noiseArea(40, 90);

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

        this.loop1()
        // this.loop2();
        // this.loop3();
        // this.loop4();
        // this.loop5();
        // this.loop6();
        // this.loop7();
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

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: 20, // map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20,
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette1.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette2.palette,
                        noiseAngle: false,
                        normIt: false,
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

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: 20, // map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20,
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette1.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette2.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                )

            }
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

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: 20, // map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20,
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette1.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette2.palette,
                        noiseAngle: false,
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

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: 20, // map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20,
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette1.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette2.palette,
                        noiseAngle: false,
                        normIt: false,
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

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: 20, // map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20,
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette1.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette2.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                )

            }
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

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: 20, // map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20,
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette1.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette2.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                )

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

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue1,
                        vertexLength: 20, // map(this.boxes[i].noiseValue12, this.noise12.noiseValueMin, this.noise12.noiseValueMax, 5, 15),
                        strokeWeighty: 1, // map(this.boxes[i].noiseValue12, this.noise11.noiseValueMin, this.noise11.noiseValueMax, 0.3, 0.6),
                        angleMin: 2 * Math.PI / 12 * 1,
                        angleMax: 2 * Math.PI / 12 * 3,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20,
                        // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                        colorList: this.palette1.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                );
            } else {
                this.digndag(
                    {
                        centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                        noiseValue: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue2, -1, 1, 5, 15),
                        strokeWeighty: 0.4, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 0.3, 1), //0.5,
                        angleMin: 2 * Math.PI / 12 * 5,
                        angleMax: 2 * Math.PI / 12 * 7,
                        revert: true,
                        cutOutValue: -1,
                        loopCount: 20, // map(this.boxes[i].noiseValue9, this.noise9.noiseValueMin, this.noise9.noiseValueMax, 10, 20), // 10,
                        colorList: this.palette2.palette,
                        noiseAngle: false,
                        normIt: false,
                        group: "",
                    }
                )

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

            this.zignzag(
                {
                    centerX: this.boxes[i].center.x + this.boxes[i].offset.x,
                    centerY: this.boxes[i].center.y + this.boxes[i].offset.y,
                    noiseValue: this.boxes[i].noiseValue8,
                    vertexLength: map(this.boxes[i].noiseValue8, -1, 1, 5, 20), // 15,
                    strokeWeighty: map(this.boxes[i].noiseValue8, -1, 1, 0.05, 0.3), // 1,
                    angleMin: 0,
                    angleMax: Math.PI,
                    cutOutValue: -1,
                    loopCount: 20,
                    // colorList: ["#000000", "#524444", "#8a7878", "#ccb3b3"],
                    colorList: ["#444444"],
                    group: "",
                }
            );

        }

    }

}