class noiseArea {
    constructor(x, y) {

        noise.seed(fxrand());

        this.x = x;
        this.y = y;

        this.noiseValueMax = -1;
        this.noiseValueMin = 1;
    }

    // for use in loop
    createNoiseValue(w, h) {
        let noiseValue = noise.simplex2(w / this.x, h / this.y);

        // if (this.noiseValue > this.noiseValueMax) {
        //     this.noiseValueMax = this.noiseValue;
        // }
        // if (this.noiseValue < this.noiseValueMin) {
        //     this.noiseValueMin = this.noiseValue;
        // }

        return noiseValue
    }

    // trigger in a second loop, once Min and Max are defined
    createNormedNoiseValue() {

    }

    // for DEBUGGING Noise
    drawNoise(drawing, box_count) {

        for (var x = 0; x < box_count; x++) {
            for (var y = 0; y < box_count; y++) {

                var noiseValue = this.createNoiseValue(x, y)
                // console.log(noiseValue);

                var colory = tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(noiseValue, -1, 1, -50, 50)).toHexString()
                drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            }
        }

    }
}
