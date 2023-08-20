class digi {
    constructor(data) {
        this.center = { x: data.x, y: data.y };
        this.lineVertexLength = 0; // initial.value;
        this.lineVertexLengthMin = data.lineVertexLengthMin;
        this.lineVertexLengthMax = data.lineVertexLengthMax;
        this.lineStrokeWeighty = 0; // inital value
        this.lineStrokeWeightyMin = data.lineStrokeWeightyMin;
        this.lineStrokeWeightyMax = data.lineStrokeWeightyMax;
        this.angleMin = data.angleMin;
        this.angleMax = data.angleMax;
        this.lineLoopCount = 0; // initial value;
        this.lineLoopCountMin = data.lineLoopCountMin;
        this.lineLoopCountMax = data.lineLoopCountMax;
        this.group = data.group;
        this.noiseAngle = data.noiseAngle;
        this.horizonRow = data.horizonRow;
        this.i = data.i;
        this.longBoxCount = data.longBoxCount;

        this.lineNoiseAngleDist = data.lineNoiseAngleDist;
        this.lineVertexLengthMean = data.lineVertexLengthMean;
        this.lineVertexLengthStd = data.lineVertexLengthStd;
        this.lineNoiseMapDynamic = data.lineNoiseMapDynamic;

        this.triangle = data.triangle;
        this.triangleStroke = data.triangleStroke;
        this.triangleLoop = data.triangleLoop;
        this.widthy = data.triangleWidthy;
        this.trianglePosDistStd = data.trianglePosDistStd;

        this.rect = data.rect;
        this.rectLoop = data.rectLoop;
        this.rectWidth = data.rectWidth;
        this.rectHeight = data.rectHeight;
        this.rectStroke = data.rectStroke;
        this.rectPosDistStd = data.rectPosDistStd;

        this.angle = 0;
        this.lineRevert = data.lineRevert;

        this.colorNoise = data.colorNoise;
        // this.colorNoiseMin = data.colorNoiseMin;
        // this.colorNoiseMax = data.colorNoiseMax;

        this.noiseValue = data.noiseValue;
        // this.noiseValueMin = data.noiseValueMin;
        // this.noiseValueMax = data.noiseValueMax;

        this.cutOutValue = data.cutOutValue;
        this.colorList = data.colorList;
        this.lineAngleMean = data.lineAngleMean;
        this.lineAngleSTD = data.lineAngleSTD;

        // this.noiseDistance = this.noiseValueMax - this.noiseValueMin;
        // this.colorStep = this.noiseDistance / this.colorList.length;

        // this.noiseDistance = this.colorNoiseMax - this.colorNoiseMin;
        this.noiseDistance = 2;// (1- -1);
        this.colorStep = this.noiseDistance / this.colorList.length;

        this.textureStepCount = 3
        this.noiseValueDistance = 2;//this.noiseValueMax - this.noiseValueMin;
        this.textureStep = this.noiseValueDistance / this.textureStepCount;

        // console.log(this.colorNoiseMax);
        // console.log(this.colorNoiseMin);
        // console.log(this.colorStep);
        // console.log(this.colorNoise);

        // console.log(this.colorList.length);

        // mapping for center - HACK FOR MIN AND MAX
        if (this.lineNoiseMapDynamic) {

            if (this.noiseValue <= 0) {
                this.lineVertexLength = map(this.noiseValue, -1, 0, this.lineVertexLengthMin, this.lineVertexLengthMax);
                this.lineLoopCount = map(this.noiseValue, -1, 0, this.lineLoopCountMin, this.lineLoopCountMax);
                this.lineStrokeWeighty = map(this.noiseValue, -1, 0, this.lineStrokeWeightyMax, this.lineStrokeWeightyMin);
            } else {
                this.lineVertexLength = map(this.noiseValue, 0, 1, this.lineVertexLengthMax, this.lineVertexLengthMin);
                this.lineLoopCount = map(this.noiseValue, 0, 1, this.lineLoopCountMin, this.lineLoopCountMax);
                this.lineStrokeWeighty = map(this.noiseValue, 0, 1, this.lineStrokeWeightyMax, this.lineStrokeWeightyMin);
            }
        } else {
            this.lineVertexLength = map(this.noiseValue, -1, 1, this.lineVertexLengthMin, this.lineVertexLengthMax);
            this.lineLoopCount = map(this.noiseValue, -1, 1, this.lineLoopCountMin, this.lineLoopCountMax);
            this.lineStrokeWeighty = map(this.noiseValue, -1, 1, this.lineStrokeWeightyMin, this.lineStrokeWeightyMax);
        }
    }

    draw() {

        if (this.noiseValue > this.cutOutValue) {

            let colorSelect = Math.round(map(this.noiseValue * 100, -100, 100, 0, (this.colorList.length - 1)));
            // console.log(this.noiseValue);
            // console.log(colorSelect);

            // let color_d = this.colorList[colorSelect];

            // let colorSelect = 0
            // let textureSelect = 0

            // for (var i = 1; i < (this.colorList.length + 1); i++) {
            //     // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
            //     if (this.noiseValue < this.noiseValueMin + this.colorStep * i) {
            //         colorSelect = i;
            //         break;
            //     }
            // }

            // for (var i = 0; i < (this.colorList.length); i++) {
            //     // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
            //     if (this.colorNoise < -1 + this.colorStep * i) {
            //         colorSelect = i;
            //         break;
            //     }
            // }
            // console.log(colorSelect);

            // for (var i = 0; i <= this.textureStepCount; i++) {
            //     // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
            //     if (this.noiseValue < -1 + this.textureStep * i) {
            //         textureSelect = i;
            //         break;
            //     }
            // }
            // if (this.noiseValue < -0.5) {
            //     textureSelect = 1;
            // } else if (this.noiseValue < 0) {
            //     textureSelect = 2;
            // } else if (this.noiseValue < 0.5) {
            //     textureSelect = 3;
            // } else {
            //     textureSelect = 4;
            // }

            let color_d = this.colorList[colorSelect]
            // let color_d = tinycolor(colorList[colorSelect]).spin(getRandomFromInterval(-20, 20)).darken(getRandomFromInterval(-5, 5)).desaturate(getRandomFromInterval(-10, 10)).toHexString();

            // console.log(angleBetweenPoints(pointA, pointB));

            // point and add new point
            // var oldPoint = this.center;
            var oldPoint = {};
            Object.assign(oldPoint, this.center);
            // correct for offset of center
            oldPoint.x = oldPoint.x + this.lineVertexLength / 2
            // oldPoint.y = oldPoint.y + this.lineVertexLength / 2
            var newPoint = oldPoint;
            var polyLineString = createCoordString(oldPoint);

            for (var i = 0; i < this.lineLoopCount; i++) {

                if (this.noiseAngle) {
                    // this.angle = map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, 0, 2 * Math.PI) + getRandomFromInterval(-0.5, 0.5);
                    this.angle = map(this.noiseValue, -1, 1, 0, 2 * Math.PI) + getNormallyDistributedRandomNumber(0, this.lineNoiseAngleDist);
                } else {
                    // this.angle = getRandomFromInterval(this.angleMin, this.angleMax);
                    this.angle = getNormallyDistributedRandomNumber(this.lineAngleMean, this.lineAngleSTD);
                }

                // make spots not lines
                if (this.lineRevert) {
                    if (i % 2 != 0) {
                        this.angle = this.angle - Math.PI;
                    }
                }

                // var newPoint = vectorAdd(newPoint, vectorFromAngle(this.angle, this.lineVertexLength * getRandomFromInterval(0.9, 1.1)));
                var newPoint = vectorAdd(newPoint, vectorFromAngle(this.angle, this.lineVertexLength * getNormallyDistributedRandomNumber(this.lineVertexLengthMean, this.lineVertexLengthStd)));

                polyLineString = polyLineString.concat(" ", createCoordString(newPoint));
            }

            // color_d = tinycolor(color_d);

            var h = Math.floor(this.i / this.longBoxCount);
            var distanceFromHorizon = Math.abs(this.horizonRow - h);

            // var criticalDistance = 35;
            // var darknessBoost = 25;
            // var desaturationBoost = 20;
            var criticalDistance = 20;//30;
            var darknessBoost = 40;
            var desaturationBoost = 20;

            // if (distanceFromHorizon < criticalDistance) {
            //     var color_ = tinycolor(color_d).clone().lighten(map(distanceFromHorizon, 0, criticalDistance, darknessBoost, 0)).desaturate(map(distanceFromHorizon, 0, criticalDistance, desaturationBoost, 0)).toHexString();
            // } else {
            var color_ = color_d;
            // }

            // without svg.js
            const svgNode = document.getElementById('svgNode');

            // darken or lighten rect and triangle color
            var effectiveColor = "#000000"
            if (tinycolor(color_).getBrightness() > 127) {
                effectiveColor = tinycolor(color_).darken(getRandomFromList([3, 6, 9])).toHexString()
            } else {
                effectiveColor = tinycolor(color_).lighten(getRandomFromList([3, 6, 9])).toHexString()
            }

            // POLYLINE
            const polyNode = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyNode.setAttributeNS(null, 'points', polyLineString);
            polyNode.setAttributeNS(null, 'fill', 'none');
            // polyNode.setAttributeNS(null, 'stroke', color_d);
            polyNode.setAttributeNS(null, 'stroke', color_);
            polyNode.setAttributeNS(null, 'stroke-width', this.lineStrokeWeighty);
            // polyNode.setAttributeNS(null, 'stroke-dasharray', "5, 5");
            svgNode.appendChild(polyNode);

            if (this.noiseValue >= 0 && this.rect) {
                // if (this.rect) {

                // for (var i = 0; i < 20; i++) {
                for (var i = 0; i < this.rectLoop; i++) {
                    var rectX = this.center.x + getNormallyDistributedRandomNumber(0, this.rectPosDistStd);
                    var rectY = this.center.y + getNormallyDistributedRandomNumber(0, this.rectPosDistStd);

                    const rectNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    rectNode.setAttributeNS(null, 'x', 0);
                    rectNode.setAttributeNS(null, 'y', 0);
                    rectNode.setAttributeNS(null, 'width', this.rectWidth);
                    rectNode.setAttributeNS(null, 'height', this.rectHeight);
                    rectNode.setAttributeNS(null, 'transform', "translate(" + rectX + "," + rectY + "), rotate(" + this.angle * (180 / Math.PI) + ")");
                    rectNode.setAttributeNS(null, 'fill', 'none');
                    // rectNode.setAttributeNS(null, 'fill', color_);
                    // rectNode.setAttributeNS(null, 'stroke', tinycolor(color_).lighten(6).toHexString());
                    rectNode.setAttributeNS(null, 'stroke', effectiveColor);
                    // rectNode.setAttributeNS(null, 'stroke', "none");
                    rectNode.setAttributeNS(null, 'stroke-width', this.rectStroke);
                    svgNode.appendChild(rectNode);
                }
                // }
            }
            if (this.noiseValue <= 0 && this.triangle) {
                // if (this.triangle) {

                for (var i = 0; i < this.triangleLoop; i++) {

                    // const circleNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    // circleNode.setAttributeNS(null, 'cx', this.center.x + getNormallyDistributedRandomNumber(0, this.trianglePosDistStd));
                    // circleNode.setAttributeNS(null, 'cy', this.center.y + getNormallyDistributedRandomNumber(0, this.trianglePosDistStd));
                    // circleNode.setAttributeNS(null, 'r', this.circleRadius);
                    // circleNode.setAttributeNS(null, 'fill', 'none');
                    // // circleNode.setAttributeNS(null, 'fill', color_);
                    // circleNode.setAttributeNS(null, 'stroke', tinycolor(color_).darken(3).toHexString());
                    // // circleNode.setAttributeNS(null, 'stroke', "none");
                    // // circleNode.setAttributeNS(null, 'stroke-width', this.lineStrokeWeighty);
                    // circleNode.setAttributeNS(null, 'stroke-width', this.triangleStroke);
                    // svgNode.appendChild(circleNode);

                    var centerX = this.center.x + getNormallyDistributedRandomNumber(0, this.trianglePosDistStd);
                    var centerY = this.center.y + getNormallyDistributedRandomNumber(0, this.trianglePosDistStd);
                    // var AX = centerX - 4;
                    // var AY = centerY + 4;
                    // var BX = centerX + 4;
                    // var BY = centerY + 4;
                    // var CX = centerX;
                    // var CY = centerY - 6;
                    var AX = -this.widthy;
                    var AY = this.widthy;
                    var BX = this.widthy;
                    var BY = this.widthy;
                    var CX = 0;
                    var CY = -this.widthy / 3 * 5;

                    const triangleNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    // triangleNode.setAttributeNS(null, 'cx', this.center.x + getNormallyDistributedRandomNumber(0, this.trianglePosDistStd));
                    // triangleNode.setAttributeNS(null, 'cy', this.center.y + getNormallyDistributedRandomNumber(0, this.trianglePosDistStd));
                    // triangleNode.setAttributeNS(null, 'r', this.circleRadius);
                    triangleNode.setAttributeNS(null, 'points', `${AX}, ${AY} ${BX}, ${BY} ${CX}, ${CY}`);
                    triangleNode.setAttributeNS(null, 'transform', "translate(" + centerX + "," + centerY + "), rotate(" + this.angle * (180 / Math.PI) + ")");
                    triangleNode.setAttributeNS(null, 'fill', 'none');
                    // triangleNode.setAttributeNS(null, 'fill', color_);
                    triangleNode.setAttributeNS(null, 'stroke', effectiveColor);
                    // triangleNode.setAttributeNS(null, 'stroke', "none");
                    // triangleNode.setAttributeNS(null, 'stroke-width', this.lineStrokeWeighty);
                    triangleNode.setAttributeNS(null, 'stroke-width', this.triangleStroke);
                    svgNode.appendChild(triangleNode);
                }

                // }

                // if high many polylines
                // if (this.noiseValue > 0) {
                //     for (var p = 0.5; p < 6; p++) {
                //         const polyNode = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                //         polyNode.setAttributeNS(null, 'points', polyLineString);
                //         polyNode.setAttributeNS(null, 'fill', 'none');
                //         // polyNode.setAttributeNS(null, 'stroke', color_d);
                //         polyNode.setAttributeNS(null, 'stroke', tinycolor(color_).desaturate(p * 30).toHexString());
                //         polyNode.setAttributeNS(null, 'stroke-width', this.lineStrokeWeighty);
                //         // polyNode.setAttributeNS(null, 'stroke-dasharray', "5, 5");
                //         svgNode.appendChild(polyNode);
                //     }
                // } else {
            }



            // DEBUG VIEW CENTER
            // const circleNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            // circleNode.setAttributeNS(null, 'cx', this.center.x);
            // circleNode.setAttributeNS(null, 'cy', this.center.y);
            // circleNode.setAttributeNS(null, 'r', 3);
            // circleNode.setAttributeNS(null, 'fill', 'none');
            // circleNode.setAttributeNS(null, 'fill', "red");
            // circleNode.setAttributeNS(null, 'stroke', "none");
            // svgNode.appendChild(circleNode);

        }
    }
}

