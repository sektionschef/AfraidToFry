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
        this.noiseValueMin = data.noiseValueMin;
        this.noiseValueMax = data.noiseValueMax;
        this.horizonRow = data.horizonRow;
        this.i = data.i;
        this.longBoxCount = data.longBoxCount;

        this.angle = 0;
        this.revert = data.revert;
        this.noiseValue = data.noiseValue;
        this.cutOutValue = data.cutOutValue;
        this.colorList = data.colorList;
        this.angleMean = data.angleMean;
        this.angleSTD = data.angleSTD;

        this.noiseDistance = this.noiseValueMax - this.noiseValueMin;
        // console.log(this.noiseDistance);
        this.colorStep = this.noiseDistance / this.colorList.length;
        // console.log(this.colorStep);
    }

    draw() {

        if (this.noiseValue > this.cutOutValue) {

            // let colorSelect = Math.round(map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, 0, (this.colorList.length - 1)));
            // let color_d = this.colorList[colorSelect];

            let colorSelect = 0

            // console.log("noisevalue:" + this.noiseValue);
            for (var i = 1; i < (this.colorList.length + 1); i++) {
                // console.log("step: " + (this.noiseValueMin + this.colorStep * i))
                if (this.noiseValue < this.noiseValueMin + this.colorStep * i) {
                    colorSelect = i;
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
                    this.angle = map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, 0, 2 * Math.PI) + getRandomFromInterval(-0.5, 0.5);
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