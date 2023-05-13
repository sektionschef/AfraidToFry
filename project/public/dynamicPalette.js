// create a palette with 9 tones - 4 down 4 up and base color in the middel
class dynamicPalette {
    constructor(drawing, baseColor) {
        this.drawing = drawing;
        this.baseColor = tinycolor(baseColor);
        let _color_beginning = tinycolor(baseColor);
        let _color_end = tinycolor(baseColor);
        console.log(this.baseColor);

        this.length = 9;
        this.upAndDown = 4;

        // this.palette = [];
        this.palette = Array(this.length);

        // 4 down
        // for (var i = this.upAndDown - 1; i >= 0; i--) {
        // _color.darken(2 * i);
        // _color.desaturate(2 * i)
        // this.palette.push(_color.toHexString())
        // }

        // base color in the middle
        this.palette[this.upAndDown] = this.baseColor.toHexString();


        for (var i = 1; i < (this.upAndDown + 1); i++) {
            _color_beginning.darken(4 * i);
            // // _color_beginning.desaturate(4 * i);
            // console.log(this.upAndDown - 1 - i);
            this.palette[this.upAndDown - i] = _color_beginning.toHexString();
        }

        for (var i = 1; i < (this.upAndDown + 1); i++) {
            _color_end.lighten(4 * i);
            // _color_end.saturate(4 * i);
            this.palette[(this.upAndDown + i)] = _color_end.toHexString();
        }

        console.log(this.palette);
    }

    show() {
        for (var i = 0; i < this.palette.length; i++) {
            this.drawing.rect(50, 50).move(rescaling_width / 4 + 50 * i, 300).fill({ color: this.palette[i] });
        }
    }
}