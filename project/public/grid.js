class Grid {
    constructor(data) {
        this.horizonRatio = data.horizonRatio;

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

        // this.aboveTone = data.aboveTone;
        // this.belowTone = data.belowTone;
        // this.aboveToneOVERSHOOT = data.aboveToneOVERSHOOT;
        // this.belowToneOVRESHOOT = data.belowToneOVERSHOOT;

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
            this.aboveTone = data.aboveToneOVERSHOOT;
            this.belowTone = data.belowToneOVERSHOOT;
        } else {
            this.aboveTone = data.aboveTone;
            this.belowTone = data.belowTone;
        }

        // #PALETTES


        // TRANSPARENT RECTS
        // let BASETONE = "#667b96";
        let BASETONE = tinycolor(this.aboveTone).spin(-1).desaturate(1).darken(14).toHexString();
        // let BASETONEBELOW = "#948269"
        let BASETONEBELOW = tinycolor(this.belowTone).spin(-1).desaturate(1).darken(14).toHexString();

        // let RECTBASEABOVE = "#849bbd1a";
        let RECTBASEABOVE = tinycolor(this.belowTone).clone().spin(1).saturate(10).darken(0).setAlpha(0.102);
        // let RECTBASEBELOW = "#bea8891a";
        let RECTBASEBELOW = tinycolor(this.aboveTone).clone().spin(1).saturate(10).darken(0).setAlpha(0.102);


        // let ABOVETONE = "#92a8b4" // blue
        // let BELOWTONE = "#8b967d"; // green


        // let ABOVETONE = "#4b6786";  // overshoot - cool color: d5560c
        // let BELOWTONE = "#7e614f";  // overshoot 
        // let ABOVETONE = "#8dacc9";  // full blue



        // TRUE BASE TONE
        let BASETONEA = BASETONE;
        let BASETONEB = BASETONE;
        let BASETONEC = BASETONE;
        let BASETONED = BASETONE;
        let BASETONEE = BASETONE;


        // YELLOW
        // let DETAILTONEA = "#ffdda1";
        // let DETAILTONEB = "#ffd151";
        // let DETAILTONEC = "#f8c537";
        // let DETAILTONED = "#edb230";
        // let DETAILTONEE = "#e77728";

        // let ABOVETONEA = tinycolor(DETAILTONEA).darken(15);
        // let ABOVETONEB = tinycolor(DETAILTONEB).darken(15);
        // let ABOVETONEC = tinycolor(DETAILTONEC).darken(15);
        // let ABOVETONED = tinycolor(DETAILTONED).darken(15);
        // let ABOVETONEE = tinycolor(DETAILTONEE).darken(15);

        // blue
        // let DETAILTONEA = "#0f3e50";
        // let DETAILTONEB = "#1e4e5f";
        // let DETAILTONEC = "#437080";
        // let DETAILTONED = "#4f8597";
        // let DETAILTONEE = "#78a3b1";

        // blue grey
        // let DETAILTONEA = "#71a3bd";
        // let DETAILTONEB = "#557f94";
        // let DETAILTONEC = "#3c4a52";
        // let DETAILTONED = "#506b79";
        // let DETAILTONEE = "#8da1ac";

        // dark blue - A
        let DETAILTONEA = this.aboveTone;
        let DETAILTONEB = this.aboveTone;
        let DETAILTONEC = this.aboveTone;
        let DETAILTONED = this.aboveTone;
        let DETAILTONEE = this.aboveTone;


        // green
        // let DETAILTONEBELOWA = "#83781B";
        // let DETAILTONEBELOWB = "#95B46A";
        // let DETAILTONEBELOWC = "#709255";
        // let DETAILTONEBELOWD = "#3E5622";
        // let DETAILTONEBELOWE = "#172815";

        // green - strong
        // let DETAILTONEBELOWA = "#5aa376";
        // let DETAILTONEBELOWB = "#79a854";
        // let DETAILTONEBELOWC = "#659B5E";
        // let DETAILTONEBELOWD = "#556F44";
        // let DETAILTONEBELOWE = "#3b6644";

        // green - grey
        // let DETAILTONEBELOWA = "#7e9e8a";
        // let DETAILTONEBELOWB = "#889e76";
        // let DETAILTONEBELOWC = "#758a72";
        // let DETAILTONEBELOWD = "#58795e";
        // let DETAILTONEBELOWE = "#565e51";

        // blue grey
        // let DETAILTONEBELOWA = "#71a3bd";
        // let DETAILTONEBELOWB = "#557f94";
        // let DETAILTONEBELOWC = "#3c4a52";
        // let DETAILTONEBELOWD = "#506b79";
        // let DETAILTONEBELOWE = "#8da1ac";

        // // yellow
        // let DETAILTONEBELOWA = "#ffdda1";
        // let DETAILTONEBELOWB = "#ffd151";
        // let DETAILTONEBELOWC = "#f8c537";
        // let DETAILTONEBELOWD = "#edb230";
        // let DETAILTONEBELOWE = "#e77728";

        // dark blue - A
        // let DETAILTONEBELOWA = "#63788d";
        // let DETAILTONEBELOWB = "#63788d";
        // let DETAILTONEBELOWC = "#63788d";
        // let DETAILTONEBELOWD = "#63788d";
        // let DETAILTONEBELOWE = "#63788d";

        // blue - light as a bird
        let DETAILTONEBELOWA = this.belowTone;
        let DETAILTONEBELOWB = this.belowTone;
        let DETAILTONEBELOWC = this.belowTone;
        let DETAILTONEBELOWD = this.belowTone;
        let DETAILTONEBELOWE = this.belowTone;




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
            this.belowTone,
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

        // this.noiseBase = new noiseAggregator(60, 20, 20, 6, 8, 8, this.shortBoxCount);
        this.noiseBase = new noiseAggregator(190, 170, 20, 6, 8, 8, this.shortBoxCount);
        this.noiseDetail = new noiseAggregator(135, 56, 90, 8, 30, 10, this.shortBoxCount);

        this.noiseBaseBelow = new noiseAggregator(70, 16, 15, 20, 6, 6, this.shortBoxCount);
        this.noiseDetailBelow = new noiseAggregator(130, 46, 19, 10, 8, 8, this.shortBoxCount);

        // this.noiseColorBase = new noiseAggregator(80, 10, 30, 10, 9, 3, this.shortBoxCount);
        this.noiseColorBase = new noiseAggregator(50, 20, 60, 5, 9, 3, this.shortBoxCount);
        // this.noiseColorDetail = new noiseAggregator(100, 15, 60, 10, 25, 6, this.shortBoxCount);
        this.noiseColorDetail = new noiseAggregator(70, 15, 20, 10, 25, 6, this.shortBoxCount);  // biger
        this.noiseColorDetailBelow = new noiseAggregator(80, 15, 40, 3, 13, 4, this.shortBoxCount);
        this.noiseColorBaseBelow = new noiseAggregator(130, 10, 90, 3, 3, 3, this.shortBoxCount);

        this.noiseCutOut = new noiseAggregator(97, 13, 60, 5, 4, 4, this.shortBoxCount);

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
            this.createNoiseLayer();
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
            rectNodeAbove.setAttributeNS(null, 'fill', tinycolor(this.belowTone).darken(5).desaturate(5));
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
            rectNodeBelow.setAttributeNS(null, 'fill', tinycolor(this.aboveTone).darken(5).desaturate(5));
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
                        colorList: [this.belowTone],
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
                        colorList: [this.aboveTone],
                    }
                ).draw();
            }
        }
    }

    createNoiseLayer() {

        let aboveToneRgb = tinycolor(this.aboveTone).toRgb()
        let belowToneRgb = tinycolor(this.belowTone).toRgb()

        const svgNode = document.getElementById('svgNode');
        const defs = document.getElementById('defs');

        // filter object with transparent background
        var filterObjA = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        filterObjA.setAttribute("id", "filterObjA");
        filterObjA.setAttribute("width", "100%");
        filterObjA.setAttribute("height", "100%");
        filterObjA.setAttribute("opacity", "1");

        var filterObjB = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        filterObjB.setAttribute("id", "filterObjB");
        filterObjB.setAttribute("width", "100%");
        filterObjB.setAttribute("height", "100%");
        filterObjB.setAttribute("opacity", "1");

        // filter know how: https://stackoverflow.com/questions/10867282/how-can-i-add-a-filter-to-a-svg-object-in-javascript 

        var filterA = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filterA.setAttribute("id", "filterA");
        filterA.setAttribute("x", "0");
        filterA.setAttribute("y", "0");
        // added
        filterA.setAttribute("filterUnits", "objectBoundingBox");
        filterA.setAttribute("primitiveUnits", "userSpaceOnUse");
        filterA.setAttribute("color-interpolation-filters", "linearRGB");

        var filterB = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filterB.setAttribute("id", "filterB");
        filterB.setAttribute("x", "0");
        filterB.setAttribute("y", "0");
        // added
        filterB.setAttribute("filterUnits", "objectBoundingBox");
        filterB.setAttribute("primitiveUnits", "userSpaceOnUse");
        filterB.setAttribute("color-interpolation-filters", "linearRGB");

        // var gaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
        // gaussianFilter.setAttribute("in", "SourceGraphic");
        // gaussianFilter.setAttribute("stdDeviation", "1");

        // https://fffuel.co/nnnoise/

        var turbulenceA = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
        turbulenceA.setAttribute("id", "turbulenceA");
        turbulenceA.setAttribute("in", "filterObjA");
        turbulenceA.setAttribute("type", "fractalNoise");
        // turbulenceA.setAttribute("baseFrequency", "0.3");  // 0.102
        turbulenceA.setAttribute("baseFrequency", "0.1");  // 0.102, 0.061
        turbulenceA.setAttribute("numOctaves", "6");
        // turbulenceA.setAttribute("seed", "15");
        turbulenceA.setAttribute("seed", `${Math.round(fxrand() * 100)}`);
        turbulenceA.setAttribute("stitchTiles", "stitch");
        turbulenceA.setAttribute("x", "0%");
        turbulenceA.setAttribute("y", "0%");
        turbulenceA.setAttribute("width", "100%");
        turbulenceA.setAttribute("height", "100%");
        turbulenceA.setAttribute("result", "turbulenceA");

        var turbulenceB = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
        turbulenceB.setAttribute("id", "turbulenceB");
        turbulenceB.setAttribute("in", "filterObjB");
        turbulenceB.setAttribute("type", "fractalNoise");
        // turbulenceB.setAttribute("baseFrequency", "0.3");  // 0.102
        turbulenceB.setAttribute("baseFrequency", "0.1");  // 0.102, 0.061
        turbulenceB.setAttribute("numOctaves", "6");
        // turbulenceB.setAttribute("seed", "15");
        turbulenceB.setAttribute("seed", `${Math.round(fxrand() * 100)}`);
        turbulenceB.setAttribute("stitchTiles", "stitch");
        turbulenceB.setAttribute("x", "0%");
        turbulenceB.setAttribute("y", "0%");
        turbulenceB.setAttribute("width", "100%");
        turbulenceB.setAttribute("height", "100%");
        turbulenceB.setAttribute("result", "turbulenceB");

        var specularLightA = document.createElementNS("http://www.w3.org/2000/svg", "feSpecularLighting");
        specularLightA.setAttribute("id", "specularLightA");
        specularLightA.setAttribute("surfaceScale", "10"); // 1- 40, 17
        specularLightA.setAttribute("specularConstant", "0.75");
        specularLightA.setAttribute("specularExponent", "20");
        specularLightA.setAttribute("lighting-color", "#1900ff");
        // specularLightA.setAttribute("lighting-color", "#1eff00");
        // specularLightA.setAttribute("lighting-color", ABOVETONE);
        specularLightA.setAttribute("x", "0%");
        specularLightA.setAttribute("y", "0%");
        specularLightA.setAttribute("width", "100%");
        // specularLightA.setAttribute("height", "50%");
        specularLightA.setAttribute("height", `${this.horizonRatio * 100}%`);
        specularLightA.setAttribute("in", "turbulenceA");
        specularLightA.setAttribute("result", "specularLightA");

        var specularLightB = document.createElementNS("http://www.w3.org/2000/svg", "feSpecularLighting");
        specularLightB.setAttribute("id", "specularLightB");
        specularLightB.setAttribute("surfaceScale", "10"); // 1- 40, 17
        specularLightB.setAttribute("specularConstant", "0.75");
        specularLightB.setAttribute("specularExponent", "20");
        specularLightB.setAttribute("lighting-color", "#1900ff");
        // specularLightB.setAttribute("lighting-color", "#1eff00");
        // specularLightB.setAttribute("lighting-color", BELOWTONE);
        specularLightB.setAttribute("x", "0%");
        // specularLightB.setAttribute("y", "50%");
        specularLightB.setAttribute("y", `${this.horizonRatio * 100}%`);
        specularLightB.setAttribute("width", "100%");
        specularLightB.setAttribute("height", "100%");
        specularLightB.setAttribute("in", "turbulenceB");
        specularLightB.setAttribute("result", "specularLightB");

        var distantLightA = document.createElementNS("http://www.w3.org/2000/svg", "feDistantLight");
        distantLightA.setAttribute("id", "distantLightA");
        distantLightA.setAttribute("azimuth", "3");
        distantLightA.setAttribute("elevation", "100");
        specularLightA.appendChild(distantLightA);

        var distantLightB = document.createElementNS("http://www.w3.org/2000/svg", "feDistantLight");
        distantLightB.setAttribute("id", "distantLightB");
        distantLightB.setAttribute("azimuth", "3");
        distantLightB.setAttribute("elevation", "100");
        specularLightB.appendChild(distantLightB);
        // specularLightB.appendChild(distantLight);


        // desaturate
        var colorMatrixA = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        colorMatrixA.setAttribute("type", "matrix");
        colorMatrixA.setAttribute("values", "\
           200 0 0 0 0 \
           200 0 0 0 0 \
           200 0 0 0 0 \
           0 0 0 1 0");
        colorMatrixA.setAttribute("x", "0%");
        colorMatrixA.setAttribute("y", "0%");
        colorMatrixA.setAttribute("width", "100%");
        colorMatrixA.setAttribute("height", "100%");
        // colorMatrixA.setAttribute("in", "specularLightB");
        colorMatrixA.setAttribute("in", "sourceGraphic");
        colorMatrixA.setAttribute("result", "colorMatrixA");

        // recolor
        var colorMatrixHueA = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        colorMatrixHueA.setAttribute("in", "colorMatrixA");
        colorMatrixHueA.setAttribute("type", "matrix");
        colorMatrixHueA.setAttribute("values", `\
           ${aboveToneRgb.r / 255} 0 0 0 0 \
           0 ${aboveToneRgb.g / 255} 0 0 0 \
           0 0 ${aboveToneRgb.b / 255} 0 0 \
           0 0 0 1 0`); // red / 255 = 0.06
        colorMatrixHueA.setAttribute("result", "colorMatrixHueA");


        // desaturate
        var colorMatrixB = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        colorMatrixB.setAttribute("type", "matrix");
        colorMatrixB.setAttribute("values", "\
        200 0 0 0 0 \
        200 0 0 0 0 \
        200 0 0 0 0 \
        0 0 0 1 0");
        colorMatrixB.setAttribute("x", "0%");
        colorMatrixB.setAttribute("y", "0%");
        colorMatrixB.setAttribute("width", "100%");
        colorMatrixB.setAttribute("height", "100%");
        // colorMatrixB.setAttribute("in", "specularLightB");
        colorMatrixB.setAttribute("in", "sourceGraphic");
        colorMatrixB.setAttribute("result", "colormatrixB");

        // recolor
        var colorMatrixHueB = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        colorMatrixHueB.setAttribute("in", "colormatrixB");
        colorMatrixHueB.setAttribute("type", "matrix");
        colorMatrixHueB.setAttribute("values", `\
        ${belowToneRgb.r / 255} 0 0 0 0 \
        0 ${belowToneRgb.g / 255} 0 0 0 \
        0 0 ${belowToneRgb.b / 255} 0 0 \
        0 0 0 1 0`); // red / 255 = 0.06
        colorMatrixHueB.setAttribute("result", "colorMatrixHueB");



        // var blender = document.createElementNS("http://www.w3.org/2000/svg", "feBlend");
        // blender.setAttribute("in", "SourceGraphic");
        // blender.setAttribute("in2", "turbulence");
        // blender.setAttribute("mode", "overlay");
        // blender.setAttribute("result", "BLEND");



        // filter.appendChild(gaussianFilter);
        // filter.appendChild(blender);

        filterA.appendChild(turbulenceA);
        filterA.appendChild(specularLightA);
        filterA.appendChild(colorMatrixA);  // desaturate
        filterA.appendChild(colorMatrixHueA);

        filterB.appendChild(turbulenceB);
        filterB.appendChild(specularLightB);
        filterB.appendChild(colorMatrixB);  // desaturate
        filterB.appendChild(colorMatrixHueB);

        defs.appendChild(filterA);
        defs.appendChild(filterB);

        // var feMergeNode0 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        // feMergeNode0.setAttribute("in", "SourceGraphic");
        // var feMergeNode1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        // feMergeNode1.setAttribute("in", "turbulenceA");
        // var feMergeNode2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        // feMergeNode2.setAttribute("in", "specularLightA");
        // var feMergeNode3 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        // feMergeNode3.setAttribute("in", "specularLightB");

        // var feMerge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
        // feMerge.appendChild(feMergeNode0);
        // feMerge.appendChild(feMergeNode1);
        // feMerge.appendChild(feMergeNode2);
        // feMerge.appendChild(feMergeNode3);
        // filterA.appendChild(feMerge);

        filterObjA.setAttribute("filter", "url(#filterA)");
        filterObjA.setAttribute("mask", "url(#maskNoise)");
        filterObjB.setAttribute("filter", "url(#filterB)");
        filterObjB.setAttribute("mask", "url(#maskNoise)");

        // const drawing = document.getElementById('drawing');
        // svgNode.appendChild(drawing);

        var showDrawing = document.createElementNS("http://www.w3.org/2000/svg", "use");
        showDrawing.setAttribute("id", "showDrawing");
        showDrawing.setAttribute("href", "#drawing");
        svgNode.appendChild(showDrawing);

        svgNode.appendChild(filterObjA);
        svgNode.appendChild(filterObjB);
    }


}