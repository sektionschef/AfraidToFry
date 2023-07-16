class digi {
    constructor(data) {
        this.center = { x: data.x, y: data.y };
        this.vertexLength = data.vertexLength;
        this.strokeWeighty = data.strokeWeighty;
        this.angleMin = data.angleMin;
        this.angleMax = data.angleMax;
        this.loopCount = data.loopCount;
        this.group = data.group;
        this.noiseAngle = data.noiseAngle;
        this.drawing = data.drawing;
        this.horizonRow = data.horizonRow;
        this.i = data.i;
        this.longBoxCount = data.longBoxCount;
        this.polyLineAngleDist = data.polyLineAngleDist;
        this.polyLineVLenMean = data.polyLineVLenMean;
        this.polyLineVLenStd = data.polyLineVLenStd;

        this.circle = data.circle;
        this.circleRadius = data.circleRadius;
        this.circleStroke = data.circleStroke;
        this.loopCircle = data.loopCircle;
        this.circlePosDistStd = data.circlePosDistStd;

        this.rect = data.rect;
        this.loopRect = data.loopRect;
        this.rectWidth = data.rectWidth;
        this.rectHeight = data.rectHeight;
        this.rectStroke = data.rectStroke;
        this.rectPosDistStd = data.rectPosDistStd;

        this.angle = 0;
        this.revert = data.revert;

        this.colorNoise = data.colorNoise;
        // this.colorNoiseMin = data.colorNoiseMin;
        // this.colorNoiseMax = data.colorNoiseMax;

        this.noiseValue = data.noiseValue;
        // this.noiseValueMin = data.noiseValueMin;
        // this.noiseValueMax = data.noiseValueMax;

        this.cutOutValue = data.cutOutValue;
        this.colorList = data.colorList;
        this.angleMean = data.angleMean;
        this.angleSTD = data.angleSTD;

        // this.noiseDistance = this.noiseValueMax - this.noiseValueMin;
        // this.colorStep = this.noiseDistance / this.colorList.length;

        // this.noiseDistance = this.colorNoiseMax - this.colorNoiseMin;
        this.noiseDistance = 2;// (1- -1);
        this.colorStep = this.noiseDistance / this.colorList.length;

        this.textureStepCount = 5
        this.noiseValueDistance = 2;//this.noiseValueMax - this.noiseValueMin;
        this.textureStep = this.noiseValueDistance / this.textureStepCount;

        // console.log(this.colorNoiseMax);
        // console.log(this.colorNoiseMin);
        // console.log(this.colorStep);
        // console.log(this.colorNoise);

        // console.log(this.colorList.length);

    }

    draw() {

        if (this.noiseValue > this.cutOutValue) {

            // let colorSelect = Math.round(map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, 0, (this.colorList.length - 1)));
            // let color_d = this.colorList[colorSelect];

            let colorSelect = 0
            let textureSelect = 0

            // for (var i = 1; i < (this.colorList.length + 1); i++) {
            //     // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
            //     if (this.noiseValue < this.noiseValueMin + this.colorStep * i) {
            //         colorSelect = i;
            //         break;
            //     }
            // }

            for (var i = 0; i < (this.colorList.length); i++) {
                // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
                if (this.colorNoise < -1 + this.colorStep * i) {
                    colorSelect = i;
                    break;
                }
            }
            // console.log(colorSelect);

            for (var i = 0; i <= this.textureStepCount; i++) {
                // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
                if (this.noiseValue < -1 + this.textureStep * i) {
                    textureSelect = i;
                    break;
                }
            }

            let color_d = this.colorList[colorSelect]
            // let color_d = tinycolor(colorList[colorSelect]).spin(getRandomFromInterval(-20, 20)).darken(getRandomFromInterval(-5, 5)).desaturate(getRandomFromInterval(-10, 10)).toHexString();

            // console.log(angleBetweenPoints(pointA, pointB));

            // point and add new point
            // var oldPoint = this.center;
            var oldPoint = {};
            Object.assign(oldPoint, this.center);
            // correct for offset of center
            oldPoint.x = oldPoint.x + this.vertexLength / 2
            // oldPoint.y = oldPoint.y + this.vertexLength / 2
            var newPoint = oldPoint;
            var polyLineString = createCoordString(oldPoint);

            for (var i = 0; i < this.loopCount; i++) {

                if (this.noiseAngle) {
                    // this.angle = map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, 0, 2 * Math.PI) + getRandomFromInterval(-0.5, 0.5);
                    this.angle = map(this.noiseValue, -1, 1, 0, 2 * Math.PI) + getNormallyDistributedRandomNumber(0, this.polyLineAngleDist);
                } else {
                    // this.angle = getRandomFromInterval(this.angleMin, this.angleMax);
                    this.angle = getNormallyDistributedRandomNumber(this.angleMean, this.angleSTD);
                }

                // make spots not lines
                if (this.revert) {
                    if (i % 2 != 0) {
                        this.angle = this.angle - Math.PI;
                    }
                }

                // var newPoint = vectorAdd(newPoint, vectorFromAngle(this.angle, this.vertexLength * getRandomFromInterval(0.9, 1.1)));
                var newPoint = vectorAdd(newPoint, vectorFromAngle(this.angle, this.vertexLength * getNormallyDistributedRandomNumber(this.polyLineVLenMean, this.polyLineVLenStd)));

                polyLineString = polyLineString.concat(" ", createCoordString(newPoint));
            }

            // which stroke cap?
            // with svg.js
            // this.drawing.polyline(polyLineString).fill('none').stroke({ width: this.strokeWeighty, color: color_d });

            // color_d = tinycolor(color_d);

            var h = Math.floor(this.i / this.longBoxCount);
            var distanceFromHorizon = Math.abs(this.horizonRow - h);

            var criticalDistance = 35;
            var darknessBoost = 25;
            var desaturationBoost = 20;

            if (distanceFromHorizon < criticalDistance) {
                var color_ = tinycolor(color_d).clone().darken(map(distanceFromHorizon, 0, criticalDistance, darknessBoost, 0)).desaturate(map(distanceFromHorizon, 0, criticalDistance, desaturationBoost, 0)).toHexString();
            } else {
                var color_ = color_d;
            }

            // without svg.js
            const svgNode = document.getElementById('svgNode');


            if (textureSelect == 2 && this.rect) {

                for (var i = 0; i < this.loopRect; i++) {
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
                    rectNode.setAttributeNS(null, 'stroke', color_);
                    // rectNode.setAttributeNS(null, 'stroke', "none");
                    rectNode.setAttributeNS(null, 'stroke-width', this.rectStroke);
                    svgNode.appendChild(rectNode);
                }

            } else if (textureSelect == 3 && this.circle) {

                for (var i = 0; i < this.loopCircle; i++) {

                    const circleNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circleNode.setAttributeNS(null, 'cx', this.center.x + getNormallyDistributedRandomNumber(0, this.circlePosDistStd));
                    circleNode.setAttributeNS(null, 'cy', this.center.y + getNormallyDistributedRandomNumber(0, this.circlePosDistStd));
                    circleNode.setAttributeNS(null, 'r', this.circleRadius);
                    circleNode.setAttributeNS(null, 'fill', 'none');
                    // circleNode.setAttributeNS(null, 'fill', color_);
                    circleNode.setAttributeNS(null, 'stroke', color_);
                    // circleNode.setAttributeNS(null, 'stroke', "none");
                    // circleNode.setAttributeNS(null, 'stroke-width', this.strokeWeighty);
                    circleNode.setAttributeNS(null, 'stroke-width', this.circleStroke);
                    svgNode.appendChild(circleNode);
                }

            } else {
                // skip loop if not polyline
                const polyNode = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                polyNode.setAttributeNS(null, 'points', polyLineString);
                polyNode.setAttributeNS(null, 'fill', 'none');
                // polyNode.setAttributeNS(null, 'stroke', color_d);
                polyNode.setAttributeNS(null, 'stroke', color_);
                polyNode.setAttributeNS(null, 'stroke-width', this.strokeWeighty);
                // polyNode.setAttributeNS(null, 'stroke-dasharray', "5, 5");
                svgNode.appendChild(polyNode);
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

