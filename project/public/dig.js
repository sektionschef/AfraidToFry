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

        this.angle = 0;
        this.revert = data.revert;
        this.noiseValue = data.noiseValue;
        this.cutOutValue = data.cutOutValue;
        this.colorList = data.colorList;
        this.angleMean = data.angleMean;
        this.angleSTD = data.angleSTD;
    }

    draw() {
        if (this.noiseValue > this.cutOutValue) {

            let colorSelect = Math.round(map(this.noiseValue, -1, 1, 0, (this.colorList.length - 1)));
            let color_d = this.colorList[colorSelect];
            // let color_d = tinycolor(colorList[colorSelect]).spin(getRandomFromInterval(-20, 20)).darken(getRandomFromInterval(-5, 5)).desaturate(getRandomFromInterval(-10, 10)).toHexString();

            // point and add new point
            var oldPoint = this.center;
            var newPoint = oldPoint;
            // console.log(angleBetweenPoints(pointA, pointB));
            var polyLineString = createCoordString(oldPoint);

            for (var i = 0; i < this.loopCount; i++) {

                if (this.noiseAngle) {
                    this.angle = map(this.noiseValue, -1, 1, 0, 2 * Math.PI) + getRandomFromInterval(-0.5, 0.5);
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
            this.drawing.polyline(polyLineString).fill('none').stroke({ width: this.strokeWeighty, color: color_d });
        }

    }
}