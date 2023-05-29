class noiseAggregator {
    constructor() {

        this.box_count = 80; // check if correct - global variable for all noises

        this.noise1 = new noiseArea(105, 50);
        this.noise2 = new noiseArea(70, 10);
        this.noise3 = new noiseArea(30, 40);
        this.noise4 = new noiseArea(8, 8);
    }

    drawNoise1(drawing) {
        this.noise1.drawNoise(drawing);
    }

    drawNoise2(drawing) {
        this.noise2.drawNoise(drawing);
    }

    drawNoise3(drawing) {
        this.noise3.drawNoise(drawing);
    }

    drawNoise4(drawing) {
        this.noise4.drawNoise(drawing);
    }

    combineNoises() {
        this.boxes = [];

        for (var i = 0; i < this.noise1.boxes.length; i++) {
            this.boxes.push({
                "index": i,
                "x": this.noise1.boxes[i].x,
                "y": this.noise1.boxes[i].y,
                "noiseValue": this.noise1.boxes[i].noiseValue / 4 + this.noise2.boxes[i].noiseValue / 4 + this.noise3.boxes[i].noiseValue / 4 + this.noise4.boxes[i].noiseValue / 4,
            });
            // console.log(this.boxes[i]);
        }
    }

    // for DEBUGGING Noise
    drawAgg(drawing) {

        for (var i = 0; i < this.boxes.length; i++) {

            var x = this.boxes[i].x;
            var y = this.boxes[i].y;
            var noiseValue = this.boxes[i].noiseValue;

            var colory = tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(noiseValue, -1, 1, -50, 50)).toHexString()
            drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
        }
    }
}
