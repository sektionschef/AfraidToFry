class digRect {
    constructor(data) {
        this.A = { x: data.x, y: data.y };
        this.width = data.width;
        this.height = data.height;
        // this.vertexLength = data.vertexLength;
        // this.strokeWeighty = data.strokeWeighty;
        // this.angleMin = data.angleMin;
        // this.angleMax = data.angleMax;
        // this.loopCount = data.loopCount;
        // this.group = data.group;
        this.noiseValue = data.noiseValue;
        this.noiseValueMin = data.noiseValueMin;
        this.noiseValueMax = data.noiseValueMax;
        this.colorList = data.colorList;
        // this.angle = 0;

        this.noiseDistance = this.noiseValueMax - this.noiseValueMin;
        // console.log(this.noiseDistance);
        this.colorStep = this.noiseDistance / this.colorList.length;
        // console.log(this.colorStep);

    }

    draw() {

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

        // var color_d = tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(this.noiseValue, this.noiseValueMin, this.noiseValueMax, -50, 50)).toHexString()

        // without svg.js
        const svgNode = document.getElementById('svgNode');

        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttributeNS(null, 'x', this.A.x);
        rect.setAttributeNS(null, 'y', this.A.y);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'width', this.width);
        // rect.setAttributeNS(null, 'fill', '#' + Math.round(0xffffff * Math.random()).toString(16));
        rect.setAttributeNS(null, 'fill', color_d);
        // rect.setAttributeNS(null, 'stroke', "none");
        rect.setAttributeNS(null, 'stroke', "black");
        rect.setAttributeNS(null, 'stroke-width', "0.001");

        svgNode.appendChild(rect);
    }
}