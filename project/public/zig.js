class zigi {
    constructor(data) {
        this.center = { x: data.x, y: data.y };
        this.vertexLength = data.vertexLength;
        this.strokeWeighty = data.strokeWeighty;
        this.angleMin = data.angleMin;
        this.angleMax = data.angleMax;
        this.loopCount = data.loopCount;
        this.group = data.group;
        this.noiseValue = data.noiseValue;
        this.colorList = data.colorList;
        this.angle = 0;

        // this.noiseAngle = data.noiseAngle;
        // this.drawing = data.drawing;
        // this.noiseValueMin = data.noiseValueMin;
        // this.noiseValueMax = data.noiseValueMax;

        // this.revert = data.revert;


        // this.cutOutValue = data.cutOutValue;
        // this.angleMean = data.angleMean;
        // this.angleSTD = data.angleSTD;
    }

    draw() {

        // if (this.noiseValue > this.cutOutValue) {

        let colorSelect = 0;
        // for (var i = 0; i < this.colorList.length; i++) {
        //     if (this.noiseValue < (this.noiseValueMax - this.noiseValueMin) / this.colorList.length * i + this.noiseValueMin) {
        //         colorSelect = i;
        //         break;
        //     }
        // }
        let color_d = this.colorList[colorSelect]

        var polyLineString = createCoordString(this.center);

        for (var i = 0; i < this.loopCount; i++) {

            this.angle = getRandomFromInterval(this.angleMin, this.angleMax);

            var newPoint = vectorAdd(this.center, vectorFromAngle(this.angle, this.vertexLength * getRandomFromInterval(0.9, 1.1)));
            polyLineString = polyLineString.concat(" ", createCoordString(newPoint));
        }

        // this.drawing.polyline(polyLineString).fill('none').stroke({ width: strokeWeighty, color: colorList[colorSelect] });

        // without svg.js
        const svgNode = document.getElementById('svgNode');
        const polyNode = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyNode.setAttributeNS(null, 'points', polyLineString);
        polyNode.setAttributeNS(null, 'fill', 'none');
        // polyNode.setAttributeNS(null, 'stroke', color_d);
        polyNode.setAttributeNS(null, 'stroke', "black");
        polyNode.setAttributeNS(null, 'stroke-width', this.strokeWeighty);
        // polyNode.setAttributeNS(null, 'stroke-dasharray', "5, 5");
        svgNode.appendChild(polyNode);
    }
    // }
}