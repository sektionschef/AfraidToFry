// create a palette with 9 tones - 4 down 4 up and base color in the middel
class dynamicPalette {
    constructor(drawing, baseColor) {
        this.drawing = drawing;
        this.baseColor = tinycolor(baseColor);
        let _color = tinycolor(baseColor);
        console.log(this.baseColor);

        this.upAndDown = 4;

        // this.palette = [];
        this.palette = Array(9);

        // 4 down
        for (var i = this.upAndDown - 1; i >= 0; i--) {
            // _color.darken(2 * i);
            _color.desaturate(2 * i)
            this.palette.push(_color.toHexString())
        }

        // base color in the middle
        this.palette.push(this.baseColor.toHexString());

        for (var i = 0; i < this.upAndDown; i++) {
            // this.palette.push(this.baseColor.lighten(3 * i).toHexString());
            // this.palette.push(this.baseColor.saturate(3 * i).toHexString());
        }

        // console.log(this.baseColor);
        console.log(this.palette);
    }

    show() {
        for (var i = 0; i < this.palette.length; i++) {
            this.drawing.rect(50, 50).move(rescaling_width / 4 + 50 * i, 300).fill({ color: this.palette[i] });
        }
    }
}