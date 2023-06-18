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

        this.angle = 0;
        this.revert = data.revert;

        this.colorNoise = data.colorNoise;
        this.colorNoiseMin = data.colorNoiseMin;
        this.colorNoiseMax = data.colorNoiseMax;

        this.noiseValue = data.noiseValue;
        this.noiseValueMin = data.noiseValueMin;
        this.noiseValueMax = data.noiseValueMax;

        this.cutOutValue = data.cutOutValue;
        this.colorList = data.colorList;
        this.angleMean = data.angleMean;
        this.angleSTD = data.angleSTD;

        // this.noiseDistance = this.noiseValueMax - this.noiseValueMin;
        // this.colorStep = this.noiseDistance / this.colorList.length;

        this.noiseDistance = this.colorNoiseMax - this.colorNoiseMin;
        this.colorStep = this.noiseDistance / this.colorList.length;

        this.noiseValueDistance = this.noiseValueMax - this.noiseValueMin;
        this.textureStep = this.noiseValueDistance / 3;

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

            for (var i = 1; i < (this.colorList.length + 1); i++) {
                // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
                if (this.colorNoise < this.colorNoiseMin + this.colorStep * i) {
                    colorSelect = i;
                    break;
                }
            }
            // console.log(colorSelect);

            for (var i = 1; i <= 3; i++) {
                // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
                if (this.noiseValue < this.noiseValueMin + this.textureStep * i) {
                    textureSelect = i;
                    break;
                }
            }

            let color_d = this.colorList[colorSelect]
            // let color_d = tinycolor(colorList[colorSelect]).spin(getRandomFromInterval(-20, 20)).darken(getRandomFromInterval(-5, 5)).desaturate(getRandomFromInterval(-10, 10)).toHexString();

            // point and add new point
            var oldPoint = this.center;
            var newPoint = oldPoint;
            // console.log(angleBetweenPoints(pointA, pointB));
            var polyLineString = createCoordString(oldPoint);

            for (var i = 0; i < this.loopCount; i++) {

                if (this.noiseAngle) {
                    // this.angle = map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, 0, 2 * Math.PI) + getRandomFromInterval(-0.5, 0.5);
                    this.angle = map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, 0, 2 * Math.PI) + getNormallyDistributedRandomNumber(0, 0.3);
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
                var newPoint = vectorAdd(newPoint, vectorFromAngle(this.angle, this.vertexLength * getNormallyDistributedRandomNumber(0.9, 0.05)));

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


            // var loopRect = map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, 0, 5);

            // var loopCircle = map(this.noiseValue, this.noiseValueMax, this.noiseValueMin, 0, 5);
            var loopRect = 5;
            var loopCircle = 5;

            if (textureSelect == 1) {

                for (var i = 0; i < loopRect; i++) {
                    const rectNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    rectNode.setAttributeNS(null, 'x', this.center.x + getNormallyDistributedRandomNumber(0, 5));
                    rectNode.setAttributeNS(null, 'y', this.center.y + getNormallyDistributedRandomNumber(0, 5));
                    rectNode.setAttributeNS(null, 'width', 4);
                    rectNode.setAttributeNS(null, 'height', 4);
                    rectNode.setAttributeNS(null, 'fill', 'none');
                    rectNode.setAttributeNS(null, 'fill', color_);
                    // rectNode.setAttributeNS(null, 'stroke', color_);
                    rectNode.setAttributeNS(null, 'stroke', "none");
                    // circleNode.setAttributeNS(null, 'stroke-width', this.strokeWeighty);
                    // rectNode.setAttributeNS(null, 'stroke-width', 0.1);
                    svgNode.appendChild(rectNode);
                    // }
                }
            } else if (textureSelect == 2) {
                for (var i = 0; i < loopCircle; i++) {
                    // for (var i = 0; i < this.loopCount; i++) {
                    const circleNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circleNode.setAttributeNS(null, 'cx', this.center.x + getNormallyDistributedRandomNumber(0, 5));
                    circleNode.setAttributeNS(null, 'cy', this.center.y + getNormallyDistributedRandomNumber(0, 5));
                    circleNode.setAttributeNS(null, 'r', 4);
                    // circleNode.setAttributeNS(null, 'fill', 'none');
                    circleNode.setAttributeNS(null, 'fill', color_);
                    // circleNode.setAttributeNS(null, 'stroke', color_);
                    circleNode.setAttributeNS(null, 'stroke', "none");
                    // circleNode.setAttributeNS(null, 'stroke-width', this.strokeWeighty);
                    // circleNode.setAttributeNS(null, 'stroke-width', 0.1);
                    svgNode.appendChild(circleNode);
                    // <circle cx="50" cy="50" r="50" />
                    //     }
                    // } else {
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

        }
    }
}