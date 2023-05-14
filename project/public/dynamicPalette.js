// create a palette with 9 tones - 4 down 4 up and base color in the middel
class dynamicPalette {
    constructor(drawing, baseColor, lChange, sChange) {

        // change in lightness and in saturation
        this.lChange = lChange;
        this.sChange = sChange;

        this.drawing = drawing;
        this.baseColor = tinycolor(baseColor);
        let _color_beginning = tinycolor(baseColor);
        let _color_end = tinycolor(baseColor);

        this.length = 9;
        this.upAndDown = 4;

        this.palette = Array(this.length);

        // base color in the middle
        this.palette[this.upAndDown] = this.baseColor.toHexString();

        for (var i = 1; i < (this.upAndDown + 1); i++) {
            _color_end.lighten(this.lChange * i);
            _color_beginning.darken(this.lChange * i);

            // _color_beginning.saturate(this.sChange * i);
            // _color_end.saturate(this.sChange * i);

            _color_beginning.desaturate(this.sChange * i);
            _color_end.desaturate(this.sChange * i);

            this.palette[this.upAndDown - i] = _color_beginning.toHexString();
            this.palette[(this.upAndDown + i)] = _color_end.toHexString();
        }

        // console.log(this.palette);
    }

    show() {
        for (var i = 0; i < this.palette.length; i++) {
            this.drawing.rect(50, 50).move(rescaling_width / 4 + 50 * i, 300).fill({ color: this.palette[i] });
        }
    }
}