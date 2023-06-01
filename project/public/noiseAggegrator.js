class noiseAggregator {
    constructor(x1, y1, x2, y2, x3, y3) {

        this.box_count = 80; // check if correct - global variable for all noises

        this.noise1 = new noiseArea(x1, y1); // good
        this.noise2 = new noiseArea(x2, y2);
        this.noise3 = new noiseArea(x3, y3); // 22, 5
    }

    // for use in loop
    createNoiseValue(w, h) {
        // let noiseValue = (
        //     this.noise1.createNoiseValue(w, h) +
        //     this.noise2.createNoiseValue(w, h) +
        //     this.noise3.createNoiseValue(w, h)
        // ) / 3;

        var amplitude1 = 1;
        var amplitude2 = 0.75;
        var amplitude3 = 0.25;

        let noiseValue = (
            this.noise1.createNoiseValue(w, h) * amplitude1 +
            this.noise2.createNoiseValue(w, h) * amplitude2 +
            this.noise3.createNoiseValue(w, h) * amplitude3
        ) / (amplitude1 + amplitude2 + amplitude3);

        // noiseValue = Math.pow(noiseValue, 2);

        return noiseValue
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

    createBoxes() {

        var index = 0;
        this.boxes = [];

        for (var x = 0; x < this.box_count; x++) {
            for (var y = 0; y < this.box_count; y++) {

                this.boxes.push({
                    "index": index,
                    "x": x,
                    "y": y,
                    "noiseValue": this.createNoiseValue(x, y),
                });
                index += 1;
            }
        }

    }

    // combineNoises() {
    //     this.boxes = [];

    //     for (var i = 0; i < this.noise1.boxes.length; i++) {
    //         this.boxes.push({
    //             "index": i,
    //             "x": this.noise1.boxes[i].x,
    //             "y": this.noise1.boxes[i].y,
    //             "noiseValue": (this.noise1.boxes[i].noiseValue + this.noise2.boxes[i].noiseValue + this.noise3.boxes[i].noiseValue + this.noise4.boxes[i].noiseValue) / 4,
    //         });
    //         // console.log(this.boxes[i]);
    //     }
    // }

    // for DEBUGGING Noise
    drawAgg(drawing) {

        this.createBoxes();

        for (var i = 0; i < this.boxes.length; i++) {

            var x = this.boxes[i].x;
            var y = this.boxes[i].y;
            var noiseValue = this.boxes[i].noiseValue;

            // var colory = tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(noiseValue, -1, 1, -50, 50)).toHexString()
            var colory = tinycolor("#A0E7E5").spin(map(noiseValue, -1, 1, -350, 350)).lighten(map(noiseValue, -1, 1, 0, 0)).saturate(map(noiseValue, -1, 1, 0, 0)).toHexString()
            drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
        }
    }
}
