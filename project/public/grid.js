class Grid {
    constructor(data) {
        this.horizonRatio = HORIZONRATIO;

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

        // #PALETTES
        // https://rechneronline.de/number-list/

        // VAR old school
        // let profileHue = [-12, -8, -5, -3, 0, 3, 5, 8, 12, -5, -3, 0, 3, 5];
        // let profileSat = [-30, -20, -15, -10, -5, 0, 5, 10, 15, 20, 30, -10, -5, 0, 5, 10];
        // let profileLight = [-3, 0, 3, -3, 0, 3, 6, -6];
        // VAR COOL
        // let profileHue = [-6, -3, 0, 3, 6];
        // let profileSat = [-40, -30, -20, -10, 0, 10, 20, 30, 40];
        // let profileLight = [0];
        // bambam
        let profileHue = [-6, -3, 0, 3, 6];
        let profileSat = [-30, -20, -10, 0, 10, 20, 30];
        let profileLight = [-6, -3, 0, 3, 6];

        this.paletteBaseA = new dynamicPalette(
            BASETONEA,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteBaseB = new dynamicPalette(
            BASETONEB,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteBaseC = new dynamicPalette(
            BASETONEC,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteBaseD = new dynamicPalette(
            BASETONED,
            profileHue,
            profileSat,
            profileLight
        );
        this.paletteBaseE = new dynamicPalette(
            BASETONEE,
            profileHue,
            profileSat,
            profileLight
        );


        this.paletteBaseBelow = new dynamicPalette(
            BASETONEBELOW,
            profileHue,
            profileSat,
            profileLight
        );



        this.paletteDetailAboveA = new dynamicPalette(
            DETAILTONEA,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteDetailAboveB = new dynamicPalette(
            DETAILTONEB,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteDetailAboveC = new dynamicPalette(
            DETAILTONEC,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteDetailAboveD = new dynamicPalette(
            DETAILTONED,
            profileHue,
            profileSat,
            profileLight
        );
        this.paletteDetailAboveE = new dynamicPalette(
            DETAILTONEE,
            profileHue,
            profileSat,
            profileLight
        );


        this.paletteDetailBelowA = new dynamicPalette(
            DETAILTONEBELOWA,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteDetailBelowB = new dynamicPalette(
            DETAILTONEBELOWB,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteDetailBelowC = new dynamicPalette(
            DETAILTONEBELOWC,
            profileHue,
            profileSat,
            profileLight
        );

        this.paletteDetailBelowD = new dynamicPalette(
            DETAILTONEBELOWD,
            profileHue,
            profileSat,
            profileLight
        );
        this.paletteDetailBelowE = new dynamicPalette(
            DETAILTONEBELOWE,
            profileHue,
            profileSat,
            profileLight
        );


        this.paletteDetail = new dynamicPalette(
            this.aboveTone,
            // "#8898a8",
            // [30, 0, 0, 0, 60],  // analogous
            // [0, 0, 0, 0, 0, 0, 180],  // analogous
            // [0, 0, 0, 0, 30],
            // [-10, -5, -5, 0, 0, 0, 5, 5, 10],
            // [-10, -5, 0, 5, 10],  // last
            [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,],
            // [-10, -5, -5, 0, 0, 0, 5, 5, 10],  // only // standards
            // [-20, -15, -5, 0, 5, 15, 20],
            // [-4, -2, 0, 2, 4],
            // [-40, -35, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 35, 40],
            // [-40, -35, -25, -15, -5, 0, 5, 15, 25, 35, 40],
            // [-45, -35, -25, -15, -10, -5, 0, 5, 10, 15, 25, 35, 45],  // standards
            // [0, 0, 0, 5, 5, 10],
            // [-20, -15, -10, -5, 0, 5, 10, 15, 20, 30],
            [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 30, 35],
            // [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,],
            // [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20, -21, -22, -23, -24, -25, -26, -27, -28, -29, -30, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,],
            // [0],
            // [-25, -15, -10, -5, 0, 5, 10, 15, 25],
            // [-14, -7, 0, 7, 14],
            // [-6, -3, 0, 3],  // standards
            [0, -1],
        );
        this.paletteDetailBelow = new dynamicPalette(
            this.underneathTone,
            // [0],
            // [-10, -5, 0, 5, 10],  // last
            [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,],
            // [-20, -15, -5, 0, 0, 0, 5, 15, 20],
            // [-35, -30, -20, -10, -5, 0, 5, 10, 20, 30, 35],
            // [-20, -10, -5, 0, 5, 10, 20],
            [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 30, 35],
            // [-6, -3, 0, 3],
            [-6, -3, 0, 3],
        )
        this.paletteFruity = new dynamicPalette(
            "#b152a1",
            [-3, 0, 3, 5, 7],
            // [-35, -30, -25, -20, -15, -10],
            // [-35, -30, -25, -20, -15, -10],
            [-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25],
            [0]
        );

        // this.noiseBase = new noiseAggregator(60, 20, 20, 6, 8, 8);
        this.noiseBase = new noiseAggregator(190, 170, 20, 6, 8, 8);
        this.noiseDetail = new noiseAggregator(135, 56, 90, 8, 30, 10);

        this.noiseBaseBelow = new noiseAggregator(70, 16, 15, 20, 6, 6);
        this.noiseDetailBelow = new noiseAggregator(130, 46, 19, 10, 8, 8);

        // this.noiseColorBase = new noiseAggregator(80, 10, 30, 10, 9, 3);
        this.noiseColorBase = new noiseAggregator(50, 20, 60, 5, 9, 3);
        // this.noiseColorDetail = new noiseAggregator(100, 15, 60, 10, 25, 6);
        this.noiseColorDetail = new noiseAggregator(70, 15, 20, 10, 25, 6);  // biger
        this.noiseColorDetailBelow = new noiseAggregator(80, 15, 40, 3, 13, 4);
        this.noiseColorBaseBelow = new noiseAggregator(130, 10, 90, 3, 3, 3);

        this.noiseCutOut = new noiseAggregator(97, 13, 60, 5, 4, 4);

        this.createBoxes();
        this.normalizeNoises();

        // PALETTE SWAP
        // for (var i = 0; i < this.paletteDetail.palette.length; i++) {
        //     if (i == 33) {
        //         for (var v = 0; v < 3; v++) {

        //             // var swapB = this.paletteDetail.palette[i + v];
        //             // var swapA = this.paletteDetailBelow.palette[i + v];
        //             // this.paletteDetail.palette[i + v] = swapA;
        //             // this.paletteDetailBelow.palette[i + v] = swapB;

        //             this.paletteDetail.palette[i + v] = this.paletteBase.palette[i + v];
        //             this.paletteDetailBelow.palette[i + v] = this.paletteTwo.palette[i + v];
        //         }

        //     }
        // }


        if (this.DEBUG) {
            // this.showDebug();
        } else {

            // setTimeout(() => {
            //     this.loop1();
            // }, 0);

            // this.loopShowNoise();

            this.loopBaseRect();
            this.loopBase();
            this.loopDetail();
            this.loopOnTop();
        }
    }

    createBoxes() {

        var index = 0;

        this.noiseDetailMin = 1;
        this.noiseDetailMax = -1;
        this.noiseBaseMin = 1;
        this.noiseBaseMax = -1;
        this.noiseBaseDetailMin = 1;
        this.noiseBaseDetailMax = -1;
        this.noiseBaseBelowMin = 1;
        this.noiseBaseBelowMax = -1;
        this.noiseDetailBelowMin = 1;
        this.noiseDetailBelowMax = -1;
        this.noiseColorDetailMin = 1;
        this.noiseColorDetailMax = -1;
        this.noiseColorBaseMin = 10;
        this.noiseColorBaseMax = -10;
        this.noiseColorDetailBelowMin = 10;
        this.noiseColorDetailBelowMax = -10;
        this.noiseColorBaseBelowMin = 10;
        this.noiseColorBaseBelowMax = -10;
        this.noiseCutOutMin = 10;
        this.noiseCutOutMax = -10;

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

                // var noiseValueBase = this.noiseBase.createNoiseValue(w, h, 0, this.horizonRow, 0, 0, 1, 1, 0, 0);
                // var noiseValueBase = this.noiseBase.createNoiseValue(w, h, 0, this.horizonRow, 1, 0.25, 0.25, 1, 0, 0);
                var noiseValueBase = this.noiseBase.createNoiseValue(w, h, 0, this.horizonRow, 1, 1, 0, 0, 0, 0);
                // var noiseValueBase = this.noiseBase.createNoiseValue(w, h, 0, this.horizonRow, 0, 0, 1, 1, 0, 0);

                // var noiseValueDetail = this.noiseDetail.createNoiseValue(w, h, 0, this.horizonRow, 1, 1, 0, 0, 0, 0);
                // var noiseValueDetail = this.noiseDetail.createNoiseValue(w, h, 0, this.horizonRow, 0, 0, 1, 1, 0, 0);
                // var noiseValueDetail = this.noiseDetail.createNoiseValue(w, h, 0, this.horizonRow, 0, 0, 0, 0, 1, 1);
                var noiseValueDetail = this.noiseDetail.createNoiseValue(w, h, 0, this.horizonRow, 1, 0.5, 0.5, 1, 0.25, 0.25);

                // var noiseValueBaseBelow = this.noiseBaseBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.5, 0);
                // var noiseValueBaseBelow = this.noiseBaseBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.25, 0.25);
                var noiseValueBaseBelow = this.noiseBaseBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0.75, 0.75, 0.5, 0.5, 0.1, 0.1);

                var noiseValueDetailBelow = this.noiseDetailBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0.75, 0.75, 0.5, 0.5, 0.1, 0.1);

                // var noiseValueColorDetail = this.noiseColorDetail.createNoiseValue(w, h, 0, this.horizonRow, 1, 0, 0.5, 0.5, 0, 0.5);

                // var noiseValueColorDetail = this.noiseColorDetail.createNoiseValue(w, h, 0, this.horizonRow, 1, 1, 0, 0, 0, 0);
                // var noiseValueColorDetail = this.noiseColorDetail.createNoiseValue(w, h, 0, this.horizonRow, 0, 0, 1, 1, 0, 0);
                // var noiseValueColorDetail = this.noiseColorDetail.createNoiseValue(w, h, 0, this.horizonRow, 0, 0, 0, 0, 1, 1);
                var noiseValueColorDetail = this.noiseColorDetail.createNoiseValue(w, h, 0, this.horizonRow, 1, 0, 0, 1, 0, 1);

                // var noiseValueColorBase = this.noiseColorBase.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 1, 1, 0, 0, 0, 0);
                var noiseValueColorBase = this.noiseColorBase.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.2, 0.2);
                // var noiseValueColorBase = this.noiseColorBase.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 1, 1, 0.25, 0.5, 1, 1);

                // var noiseValueColorDetailBelow = this.noiseColorDetailBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 1, 1, 0, 0, 0, 0);
                // var noiseValueColorDetailBelow = this.noiseColorDetailBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 0, 1, 1, 0, 0);
                // var noiseValueColorDetailBelow = this.noiseColorDetailBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 0, 0, 0, 1, 1);
                var noiseValueColorDetailBelow = this.noiseColorDetailBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0.5, 1, 1, 0.5, 0.5, 0.5);

                var noiseValueColorBaseBelow = this.noiseColorBaseBelow.createNoiseValue(w, h, this.horizonRow, this.heightBoxCount, 0, 1, 1, 0, 0.2, 0.2);

                var noiseValueCutOut = this.noiseCutOut.createNoiseValue(w, h, 0, this.heightBoxCount, 1, 1, 0.5, 0.5, 0.2, 0.2);

                if (noiseValueDetail < this.noiseDetailMin) {
                    this.noiseDetailMin = noiseValueDetail;
                }
                if (noiseValueDetail > this.noiseDetailMax) {
                    this.noiseDetailMax = noiseValueDetail;
                }
                if (noiseValueBase < this.noiseBaseMin) {
                    this.noiseBaseMin = noiseValueBase;
                }
                if (noiseValueBase > this.noiseBaseMax) {
                    this.noiseBaseMax = noiseValueBase;
                }
                if (noiseValueBaseBelow < this.noiseBaseBelowMin) {
                    this.noiseBaseBelowMin = noiseValueBaseBelow;
                }
                if (noiseValueBaseBelow > this.noiseBaseBelowMax) {
                    this.noiseBaseBelowMax = noiseValueBaseBelow;
                }

                if (noiseValueDetailBelow < this.noiseDetailBelowMin) {
                    this.noiseDetailBelowMin = noiseValueDetailBelow;
                }
                if (noiseValueDetailBelow > this.noiseDetailBelowMax) {
                    this.noiseDetailBelowMax = noiseValueDetailBelow;
                }

                if (noiseValueColorDetail < this.noiseColorDetailMin) {
                    this.noiseColorDetailMin = noiseValueColorDetail;
                }
                if (noiseValueColorDetail > this.noiseColorDetailMax) {
                    this.noiseColorDetailMax = noiseValueColorDetail;
                }

                if (noiseValueColorBase < this.noiseColorBaseMin) {
                    this.noiseColorBaseMin = noiseValueColorBase;
                }
                if (noiseValueColorBase > this.noiseColorBaseMax) {
                    this.noiseColorBaseMax = noiseValueColorBase;
                }

                if (noiseValueColorBaseBelow < this.noiseColorBaseBelowMin) {
                    this.noiseColorBaseBelowMin = noiseValueColorBaseBelow;
                }
                if (noiseValueColorBaseBelow > this.noiseColorBaseBelowMax) {
                    this.noiseColorBaseBelowMax = noiseValueColorBaseBelow;
                }

                if (noiseValueColorDetailBelow < this.noiseColorDetailBelowMin) {
                    this.noiseColorDetailBelowMin = noiseValueColorDetailBelow;
                }
                if (noiseValueColorDetailBelow > this.noiseColorDetailBelowMax) {
                    this.noiseColorDetailBelowMax = noiseValueColorDetailBelow;
                }

                if (noiseValueCutOut < this.noiseCutOutMin) {
                    this.noiseCutOutMin = noiseValueCutOut;
                }
                if (noiseValueCutOut > this.noiseCutOutMax) {
                    this.noiseCutOutMax = noiseValueCutOut;
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
                    "noiseValueDetail": noiseValueDetail,
                    "noiseValueBase": noiseValueBase,
                    "noiseValueBaseBelow": noiseValueBaseBelow,
                    "noiseValueDetailBelow": noiseValueDetailBelow,
                    "noiseValueColorDetail": noiseValueColorDetail,
                    "noiseValueColorBase": noiseValueColorBase,
                    "noiseValueColorDetailBelow": noiseValueColorDetailBelow,
                    "noiseValueColorBaseBelow": noiseValueColorBaseBelow,
                    // "noiseValue9": this.noise9.createNoiseValue(w, h),
                    // "noiseValue10": this.noise10.createNoiseValue(w, h),
                    // "polygonA": polygonA,
                    // "polygonLeft": polygonLeft,
                    "noiseValueCutOut": noiseValueCutOut,
                    "horizon": horizon,
                    "aboveHorizon": aboveHorizon,
                })
                index += 1;
            }
        }
    }

    normalizeNoises() {

        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].noiseValueColorDetail = map(this.boxes[i].noiseValueColorDetail, this.noiseColorDetailMin, this.noiseColorDetailMax, -1, 1);
            this.boxes[i].noiseValueColorBase = map(this.boxes[i].noiseValueColorBase, this.noiseColorBaseMin, this.noiseColorBaseMax, -1, 1);
            this.boxes[i].noiseValueColorDetailBelow = map(this.boxes[i].noiseValueColorDetailBelow, this.noiseColorDetailBelowMin, this.noiseColorDetailBelowMax, -1, 1);
            this.boxes[i].noiseValueColorBaseBelow = map(this.boxes[i].noiseValueColorBaseBelow, this.noiseColorBaseBelowMin, this.noiseColorBaseBelowMax, -1, 1);
            this.boxes[i].noiseValueDetail = map(this.boxes[i].noiseValueDetail, this.noiseDetailMin, this.noiseDetailMax, -1, 1);
            this.boxes[i].noiseValueBase = map(this.boxes[i].noiseValueBase, this.noiseBaseMin, this.noiseBaseMax, -1, 1);
            this.boxes[i].noiseValueDetailBelow = map(this.boxes[i].noiseValueDetailBelow, this.noiseDetailBelowMin, this.noiseDetailBelowMax, -1, 1);
            this.boxes[i].noiseValueBaseBelow = map(this.boxes[i].noiseValueBaseBelow, this.noiseBaseBelowMin, this.noiseBaseBelowMax, -1, 1);
            this.boxes[i].noiseValueCutOut = map(this.boxes[i].noiseValueCutOut, this.noiseCutOutMin, this.noiseCutOutMax, -1, 1);
        }

        // console.log(this.noiseDetailBelowMin);
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

        for (var i = 0; i < this.boxes.length; i++) {
            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            new deugy({
                x: this.boxes[i].A.x,
                y: this.boxes[i].A.y,
                width: this.boxSize,
                height: this.boxSize,
                // colorList: this.paletteDetail.palette,
                colorList: this.paletteDetailAboveA.palette,
                // noiseValue: this.boxes[i].noiseValueDetail,
                // noiseValue: this.boxes[i].noiseValueBase,
                noiseValue: this.boxes[i].noiseValueCutOut,
            }).draw();

            // if (this.boxes[i].aboveHorizon) {
            //     new deugy({
            //         x: this.boxes[i].A.x,
            //         y: this.boxes[i].A.y,
            //         width: this.boxSize,
            //         height: this.boxSize,
            //         // colorList: this.paletteDetail.palette,
            //         colorList: this.paletteDetailAboveA.palette,
            //         // noiseValue: this.boxes[i].noiseValueDetail,
            //         // noiseValue: this.boxes[i].noiseValueBase,
            //         noiseValue: this.boxes[i].noiseValueColorDetail,
            //         // noiseValue: this.boxes[i].noiseValueColorBase,
            //     }).draw();
            // } else {
            //     new deugy({
            //         x: this.boxes[i].A.x,
            //         y: this.boxes[i].A.y,
            //         width: this.boxSize,
            //         height: this.boxSize,
            //         colorList: this.paletteDetailAboveA.palette,
            //         // noiseValue: this.boxes[i].noiseValueBaseBelow,
            //         // noiseValue: this.boxes[i].noiseValueColorDetail,
            //         // noiseValue: this.boxes[i].noiseValueColorBase,
            //         noiseValue: this.boxes[i].noiseValueColorDetailBelow,
            //     }).draw();
            // }
        }
    }

    loopBaseRect() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        var marginPix = this.boxSize * this.marginBoxCount;

        // console.log("RAMin: " + this.noiseDetailMin);
        // console.log("RAMax: " + this.noiseDetailMax);

        // console.log("SAMin: " + this.noiseBaseBelowMin);
        // console.log("SAMax: " + this.noiseBaseBelowMax);

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // // NOISE pattern with rects
            // if (this.boxes[i].aboveHorizon) {
            //     new digRect({
            //         x: this.boxes[i].A.x,
            //         y: this.boxes[i].A.y,
            //         width: (this.boxSize + 1),  // +1 to avoid strokes
            //         height: (this.boxSize + 1),
            //         colorList: this.paletteDetail.palette,
            //         noiseValue: this.boxes[i].noiseValueDetail,
            //         noiseValueMin: this.noiseDetailMin,
            //         noiseValueMax: this.noiseDetailMax,
            //     }).draw();
            // } else {
            //     new digRect({
            //         x: this.boxes[i].A.x,
            //         y: this.boxes[i].A.y,
            //         width: (this.boxSize + 1),
            //         height: (this.boxSize + 1),
            //         colorList: this.paletteDetailBelow.palette,
            //         noiseValue: this.boxes[i].noiseValueBaseBelow,
            //         noiseValueMin: this.noiseBaseBelowMin,
            //         noiseValueMax: this.noiseBaseBelowMax,
            //     }).draw();
            // }

        }

        // var posStdD = 10;  // standard deviation for position
        // var offset = 30;  // move inward
        // var loopCount = 40;

        var posStdD = 0;  // standard deviation for position
        var offset = 20;  // move inward
        var loopCount = 1;

        var groupDrawing = document.getElementById('drawing');

        for (var o = 0; o < loopCount; o++) {
            // const rectNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            // rectNode.setAttributeNS(null, 'x', marginPix + getNormallyDistributedRandomNumber(0, posStdD) + offset);
            // rectNode.setAttributeNS(null, 'y', marginPix + getNormallyDistributedRandomNumber(0, posStdD) + offset);
            // rectNode.setAttributeNS(null, 'width', (rescaling_width - marginPix * 2) - offset * 2);
            // rectNode.setAttributeNS(null, 'height', rescaling_height - marginPix * 2 - offset * 2);
            // // rectNode.setAttributeNS(null, 'fill', 'none');
            // // rectNode.setAttributeNS(null, 'fill', tinycolor(this.aboveTone).darken(20));
            // // rectNode.setAttributeNS(null, 'fill', "#9191911a");
            // rectNode.setAttributeNS(null, 'fill', "#808b9b1a");
            // // rectNode.setAttributeNS(null, 'stroke', color_);
            // rectNode.setAttributeNS(null, 'stroke', "none");
            // // rectNode.setAttributeNS(null, 'stroke-width', this.rectStroke);

            // // svgNode.appendChild(rectNode);
            // groupDrawing.appendChild(rectNode);


            const rectNodeAbove = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rectNodeAbove.setAttributeNS(null, 'x', marginPix + getNormallyDistributedRandomNumber(0, posStdD) + offset);
            rectNodeAbove.setAttributeNS(null, 'y', marginPix + getNormallyDistributedRandomNumber(0, posStdD) + offset);
            rectNodeAbove.setAttributeNS(null, 'width', (rescaling_width - marginPix * 2) - offset * 2);
            rectNodeAbove.setAttributeNS(null, 'height', Math.ceil(rescaling_height * this.horizonRatio) - marginPix - offset);
            // rectNodeAbove.setAttributeNS(null, 'fill', BELOWTONE);
            // rectNodeAbove.setAttributeNS(null, 'fill', tinycolor(BELOWTONE).clone().setAlpha(0.1).darken(5).desaturate(5));
            rectNodeAbove.setAttributeNS(null, 'fill', tinycolor(BELOWTONE).darken(5).desaturate(5));
            rectNodeAbove.setAttributeNS(null, 'stroke', "none");

            groupDrawing.appendChild(rectNodeAbove);


            const rectNodeBelow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rectNodeBelow.setAttributeNS(null, 'x', marginPix + getNormallyDistributedRandomNumber(0, posStdD) + offset);
            rectNodeBelow.setAttributeNS(null, 'y', Math.floor(rescaling_height * this.horizonRatio) + getNormallyDistributedRandomNumber(0, posStdD));
            rectNodeBelow.setAttributeNS(null, 'width', (rescaling_width - marginPix * 2) - offset * 2);
            rectNodeBelow.setAttributeNS(null, 'height', (rescaling_height - rescaling_height * this.horizonRatio) - marginPix - offset);
            // rectNodeBelow.setAttributeNS(null, 'fill', ABOVETONE);
            // rectNodeBelow.setAttributeNS(null, 'fill', tinycolor(ABOVETONE).clone().setAlpha(0.1).darken(5).desaturate(5));
            // rectNodeBelow.setAttributeNS(null, 'fill', tinycolor(ABOVETONE).clone().setAlpha(0.1));
            rectNodeBelow.setAttributeNS(null, 'fill', tinycolor(ABOVETONE).darken(5).desaturate(5));
            rectNodeBelow.setAttributeNS(null, 'stroke', "none");

            groupDrawing.appendChild(rectNodeBelow);
        }


    }


    loopBase() {
        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        // console.log("RAMin: " + this.noiseDetailMin);
        // console.log("RAMax: " + this.noiseDetailMax);

        // console.log("SAMin: " + this.noiseBaseBelowMin);
        // console.log("SAMax: " + this.noiseBaseBelowMax);

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

            if (this.boxes[i].aboveHorizon) {
                new digi({
                    x: this.boxes[i].center.x,
                    y: this.boxes[i].center.y,
                    noiseValue: this.boxes[i].noiseValueBase,
                    // colorNoise: this.boxes[i].noiseValueBase,
                    colorNoise: this.boxes[i].noiseValueColorBase,
                    // colorListA: this.paletteDetailAboveA.palette,
                    // colorListB: this.paletteDetailAboveB.palette,
                    // colorListC: this.paletteDetailAboveC.palette,
                    // colorListD: this.paletteDetailAboveD.palette,
                    // colorListE: this.paletteDetailAboveE.palette,
                    colorListA: this.paletteBaseA.palette,
                    colorListB: this.paletteBaseB.palette,
                    colorListC: this.paletteBaseC.palette,
                    colorListD: this.paletteBaseD.palette,
                    colorListE: this.paletteBaseE.palette,
                    noiseAngle: true,
                    group: "",
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                    cutOutValue: -0.8,
                    noiseValueCutOut: this.boxes[i].noiseValueCutOut,
                    lineNoiseMapDynamic: false,
                    lineVertexLengthMin: 160 / this.shortBoxCount * 5,
                    lineVertexLengthMax: 160 / this.shortBoxCount * 6,
                    lineStrokeWeightyMin: 160 / this.shortBoxCount * 0.4,
                    lineStrokeWeightyMax: 160 / this.shortBoxCount * 0.4,
                    // lineLoopCount: map(this.boxes[i].noiseValueDetail, -1, 1, 20, 50), // 20,
                    lineLoopCountMin: 0,
                    lineLoopCountMax: 20,
                    lineAngleMean: Math.PI / 1,
                    lineAngleSTD: Math.PI / 56,
                    lineNoiseAngleDist: 0.3,
                    lineVertexLengthMean: 1.1,
                    lineVertexLengthStd: 0.05,
                    lineRevert: true,
                    triangle: true,
                    triangleStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueBase, -1, 1, 0.4, 0.4),
                    triangleLoop: map(this.boxes[i].noiseValueDetail, -1, 1, 10, 0),
                    triangleWidthy: 160 / this.shortBoxCount * 3,
                    trianglePosDistStd: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueBase, -1, 1, 2, 3),
                    rect: true,
                    rectLoop: map(this.boxes[i].noiseValueDetail, -1, 1, 0, 10),
                    rectWidth: 160 / this.shortBoxCount * 6, // map(this.boxes[i].noiseValueDetail, -1, 1, 5, 30), // 12,
                    rectHeight: 160 / this.shortBoxCount * 3,
                    rectStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueBase, -1, 1, 0.4, 0.4),
                    rectPosDistStd: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueBase, -1, 1, 2, 3),
                }).draw();
            } else {
                // console.log(this.boxes[i].noiseValueColorBaseBelow);
                new digi({
                    x: this.boxes[i].center.x,
                    y: this.boxes[i].center.y,
                    noiseValue: this.boxes[i].noiseValueBaseBelow,
                    colorNoise: this.boxes[i].noiseValueColorBaseBelow,
                    // colorListA: this.paletteDetailBelowA.palette,
                    // colorListB: this.paletteDetailBelowB.palette,
                    // colorListC: this.paletteDetailBelowC.palette,
                    // colorListD: this.paletteDetailBelowD.palette,
                    // colorListE: this.paletteDetailBelowE.palette,
                    colorListA: this.paletteBaseBelow.palette,
                    colorListB: this.paletteBaseBelow.palette,
                    colorListC: this.paletteBaseBelow.palette,
                    colorListD: this.paletteBaseBelow.palette,
                    colorListE: this.paletteBaseBelow.palette,
                    noiseAngle: true,
                    group: "",
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                    cutOutValue: -0.8,
                    noiseValueCutOut: this.boxes[i].noiseValueCutOut,
                    lineNoiseMapDynamic: false,
                    lineVertexLengthMin: 160 / this.shortBoxCount * 5,
                    lineVertexLengthMax: 160 / this.shortBoxCount * 6,
                    lineStrokeWeightyMin: 160 / this.shortBoxCount * 0.4,
                    lineStrokeWeightyMax: 160 / this.shortBoxCount * 0.4,
                    lineLoopCountMin: 0,
                    lineLoopCountMax: 20,
                    lineAngleMean: Math.PI / 1,
                    lineAngleSTD: Math.PI / 56,
                    lineNoiseAngleDist: 0.3,
                    lineVertexLengthMean: 1.1,
                    lineVertexLengthStd: 0.05,
                    lineRevert: true,
                    triangle: true,
                    triangleStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueBase, -1, 1, 0.4, 0.4),
                    triangleLoop: map(this.boxes[i].noiseValueDetail, -1, 1, 10, 0),
                    triangleWidthy: 160 / this.shortBoxCount * 3,
                    trianglePosDistStd: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueBase, -1, 1, 2, 3),
                    rect: true,
                    rectLoop: map(this.boxes[i].noiseValueDetail, -1, 1, 0, 15),
                    rectWidth: 160 / this.shortBoxCount * 6, // map(this.boxes[i].noiseValueDetail, -1, 1, 5, 30), // 12,
                    rectHeight: 160 / this.shortBoxCount * 3,
                    rectStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueBase, -1, 1, 0.4, 0.4),
                    rectPosDistStd: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueBase, -1, 1, 2, 3),
                }).draw();
            }
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

            if (this.boxes[i].aboveHorizon) {
                new digi({
                    x: this.boxes[i].center.x * getNormallyDistributedRandomNumber(1, 0),
                    y: this.boxes[i].center.y * getNormallyDistributedRandomNumber(1, 0),
                    noiseValue: this.boxes[i].noiseValueDetail,
                    // colorNoise: this.boxes[i].noiseValueDetail,
                    colorNoise: this.boxes[i].noiseValueColorDetail,
                    colorListA: this.paletteDetailAboveE.palette,
                    colorListB: this.paletteDetailAboveD.palette,
                    colorListC: this.paletteDetailAboveB.palette,
                    colorListD: this.paletteDetailAboveC.palette,
                    colorListE: this.paletteDetailAboveA.palette,
                    noiseAngle: true,
                    group: "",
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                    cutOutValue: -0.5,
                    noiseValueCutOut: this.boxes[i].noiseValueCutOut,
                    // lineVertexLength: 160 / this.shortBoxCount * 8, // map(this.boxes[i].noiseValueDetail, -1, 1, 2, 10), // 15,
                    lineNoiseMapDynamic: true,
                    lineVertexLengthMin: 80 / this.shortBoxCount * 10,
                    lineVertexLengthMax: 80 / this.shortBoxCount * 15,
                    lineVertexLengthMean: 1,
                    lineVertexLengthStd: 80 / this.shortBoxCount * 0.05, // map(this.boxes[i].noiseValueDetail, -1, 1, 0.15, 0.05), //0.05,
                    // lineStrokeWeighty: 160 / this.shortBoxCount * 0.1, // map(this.boxes[i].noiseValueDetail, -1, 1, 0.1, 0.15), // 0.1,
                    lineStrokeWeightyMin: 160 / this.shortBoxCount * 0.1,
                    lineStrokeWeightyMax: 160 / this.shortBoxCount * 0.2,
                    lineLoopCountMin: 0,
                    lineLoopCountMax: 20,
                    lineAngleMean: Math.PI / 1,
                    lineAngleSTD: Math.PI / 56,
                    lineNoiseAngleDist: 0.3, // 0.3
                    lineRevert: true,
                    triangle: true,
                    triangleStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueDetail, -1, 1, 0.3, 0.1), // 0.2
                    triangleLoop: map(this.boxes[i].noiseValueDetail, -1, 1, 6, 0), // 40,
                    triangleWidthy: 160 / this.shortBoxCount * 1.5,
                    trianglePosDistStd: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueDetail, -1, 1, 3, 2), // 2
                    rect: true,
                    rectLoop: map(this.boxes[i].noiseValueDetail, -1, 1, 0, 6), // 40,
                    rectWidth: 160 / this.shortBoxCount * 5, // map(this.boxes[i].noiseValueDetail, 0, 1, 6, 9),// 6,
                    rectHeight: 160 / this.shortBoxCount * 1.5, // map(this.boxes[i].noiseValueDetail, 0, 1, 2, 3),// 2,
                    rectStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueDetail, -1, 1, 0.1, 0.3), // 0.3
                    rectPosDistStd: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueDetail, -1, 1, 2, 3), // 2
                }).draw();
            } else {
                new digi({
                    x: this.boxes[i].center.x * getNormallyDistributedRandomNumber(1, 0),
                    y: this.boxes[i].center.y * getNormallyDistributedRandomNumber(1, 0),
                    noiseValue: this.boxes[i].noiseValueDetailBelow,
                    colorNoise: this.boxes[i].noiseValueColorDetailBelow,
                    colorListA: this.paletteDetailBelowE.palette,
                    colorListB: this.paletteDetailBelowD.palette,
                    colorListC: this.paletteDetailBelowB.palette,
                    colorListD: this.paletteDetailBelowC.palette,
                    colorListE: this.paletteDetailBelowA.palette,
                    noiseAngle: true,
                    group: "",
                    horizonRow: this.horizonRow,
                    i: i,
                    longBoxCount: this.longBoxCount,
                    cutOutValue: -0.5,
                    noiseValueCutOut: this.boxes[i].noiseValueCutOut,
                    lineNoiseMapDynamic: true,
                    lineVertexLengthMin: 80 / this.shortBoxCount * 10,
                    lineVertexLengthMax: 80 / this.shortBoxCount * 15,
                    lineVertexLengthMean: 1,
                    lineVertexLengthStd: 80 / this.shortBoxCount * 0.05, // map(this.boxes[i].noiseValueDetail, -1, 1, 0.15, 0.05), //0.05,
                    lineStrokeWeightyMin: 160 / this.shortBoxCount * 0.1,
                    lineStrokeWeightyMax: 160 / this.shortBoxCount * 0.2,
                    lineLoopCountMin: 0,
                    lineLoopCountMax: 20,
                    lineAngleMean: Math.PI / 1,
                    lineAngleSTD: Math.PI / 56,
                    lineNoiseAngleDist: 0.3, // 0.2
                    lineRevert: true,
                    triangle: true,
                    triangleStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueDetailBelow, -1, 1, 0.3, 0.1), // 0.2
                    triangleLoop: map(this.boxes[i].noiseValueDetailBelow, -1, 1, 6, 0), // 40,
                    triangleWidthy: 160 / this.shortBoxCount * 1.5,
                    trianglePosDistStd: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueDetailBelow, -1, 1, 3, 2), // 2
                    rect: true,
                    rectLoop: map(this.boxes[i].noiseValueDetailBelow, -1, 1, 0, 6), // 40,
                    rectWidth: 160 / this.shortBoxCount * 5, // map(this.boxes[i].noiseValueDetailBelow, 0, 1, 6, 9),// 6,
                    rectHeight: 160 / this.shortBoxCount * 1.5, // map(this.boxes[i].noiseValueDetailBelow, 0, 1, 2, 3),// 2,
                    rectStroke: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueDetailBelow, -1, 1, 0.1, 0.3), // 0.3
                    rectPosDistStd: 160 / this.shortBoxCount * map(this.boxes[i].noiseValueDetailBelow, -1, 1, 2, 3), // 2
                }).draw();
            }

        }

    }
    loopOnTop() {
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
                        noiseValue: this.boxes[i].noiseValueBase,
                        colorNoise: this.boxes[i].noiseValueColorDetailBelow,
                        vertexLength: 10, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
                        strokeWeighty: 0.1, // map(this.boxes[i].noiseValueBase, -1, 1, 0.05, 0.1), // 1,
                        angleMin: 0,
                        angleMax: Math.PI,
                        cutOutValue: -0.5,
                        noiseValueCutOut: this.boxes[i].noiseValueCutOut,
                        loopCount: map(this.boxes[i].noiseValueDetail, -1, 1, 1, 15),
                        // colorList: this.paletteDetail.palette,
                        // colorList: ["#161616", "#353535", "#727272", "#8d8c8c", "#adadad", "#c7c7c7"],
                        colorList: [BELOWTONE],
                    }
                ).draw();
            } else {
                new zigi(
                    {
                        x: this.boxes[i].center.x,
                        y: this.boxes[i].center.y,
                        noiseValue: this.boxes[i].noiseValueBase,
                        colorNoise: this.boxes[i].noiseValueColorDetailBelow,
                        vertexLength: 10, // map(this.boxes[i].noiseValue8, -1, 1, 5, 10), // 15,
                        strokeWeighty: 0.1, // map(this.boxes[i].noiseValueBase, -1, 1, 0.05, 0.1), // 1,
                        angleMin: 0,
                        angleMax: Math.PI,
                        cutOutValue: -0.5,
                        noiseValueCutOut: this.boxes[i].noiseValueCutOut,
                        loopCount: map(this.boxes[i].noiseValueDetail, -1, 1, 1, 15),
                        // colorList: this.paletteDetail.palette,
                        // colorList: ["#161616", "#353535", "#727272", "#8d8c8c", "#adadad", "#c7c7c7"],
                        colorList: [ABOVETONE],
                    }
                ).draw();
            }

        }
    }
}