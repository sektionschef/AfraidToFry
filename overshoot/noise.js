class noiseArea {
    constructor(x, y) {

        this.box_count = 80;

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


    // for DEBUGGING Noise
    drawNoise(drawing) {

        this.createBoxes();

        for (var i = 0; i < this.boxes.length; i++) {

            var x = this.boxes[i].x;
            var y = this.boxes[i].y;
            var noiseValue = this.boxes[i].noiseValue;

            var colory = tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(noiseValue, -1, 1, -50, 50)).toHexString()
            drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
        }
    }

    getStartingPoint(drawing) {

        var heart = 1480;
        this.chosen_one = [];

        for (var i = 0; i < this.boxes.length; i++) {

            var index = this.boxes[i].index;

            var x = this.boxes[i].x;
            var y = this.boxes[i].y;

            var noiseValue = this.boxes[i].noiseValue;

            // if (index == heart) {
            //     var colory = tinycolor("red").toHexString();// tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(noiseValue, -1, 1, -50, 50)).toHexString()
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }

            // // left
            // if (index == heart - this.box_count) {
            //     var colory = tinycolor("blue").toHexString();
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }

            // // right
            // if (index == heart + this.box_count) {
            //     var colory = tinycolor("purple").toHexString();
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }

            // // up
            // if (index == heart - 1) {
            //     var colory = tinycolor("green").toHexString();
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }

            // // down
            // if (index == heart + 1) {
            //     var colory = tinycolor("orange").toHexString();
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }

            if (this.boxes[i].noiseValue > 0.75) {

                this.boxes[i].spot = true;
                break;
            }
        }
    }

    getIsland(drawing) {

        for (var i = 0; i < this.boxes.length; i++) {

            var index = this.boxes[i].index;

            var x = this.boxes[i].x;
            var y = this.boxes[i].y;

            var noiseValue = this.boxes[i].noiseValue;
            var spot = this.boxes[i].spot;

            if (spot) {
                var colory = tinycolor("red").toHexString();
                drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");

                this.boxes[index].island = true;

                var right_index = index + this.box_count;
                var left_index = index - this.box_count;
                var left_up = index - 1;
                var left_down = index + 1;

                if (this.boxes[right_index].noiseValue > 0.5) {
                    this.boxes[right_index].island = true;
                }
                if (this.boxes[left_index].noiseValue > 0.5) {
                    this.boxes[left_index].island = true;
                }
                if (this.boxes[left_up].noiseValue > 0.5) {
                    this.boxes[left_up].island = true;
                }
                if (this.boxes[left_down].noiseValue > 0.5) {
                    this.boxes[left_down].island = true;
                }
            }

            // left
            // if (index == spot - this.box_count) {
            //     var colory = tinycolor("blue").toHexString();
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }

            // // right
            // if (index == spot + this.box_count) {
            //     var colory = tinycolor("purple").toHexString();
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }

            // // up
            // if (index == spot - 1) {
            //     var colory = tinycolor("green").toHexString();
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }

            // // down
            // if (index == spot + 1) {
            //     var colory = tinycolor("orange").toHexString();
            //     drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            // }
        }

    }

    drawIsland(drawing) {

        for (var i = 0; i < this.boxes.length; i++) {

            var x = this.boxes[i].x;
            var y = this.boxes[i].y;
            var noiseValue = this.boxes[i].noiseValue;

            if (this.boxes[i].island) {
                var colory = tinycolor({ h: 100, s: 50, l: 50 }).lighten(map(noiseValue, -1, 1, -50, 50)).toHexString()
                drawing.rect(10, 10).move(x * 10, y * 10).fill(colory).stroke("none");
            }
        }
    }
}
