class dynamicPalette {
    constructor(drawing, baseColor) {
        this.drawing = drawing;
        this.baseColor = baseColor;
        console.log(this.baseColor);

        this.palette = [];

        for (var i = 0; i < 5; i++) {
            this.palette.push(this.baseColor.lighten(10 * i).toHexString());
        }
        console.log(this.palette);
    }

    show() {
        for (var i = 0; i < this.palette.length; i++) {
            this.drawing.rect(50, 50).move(50 * i, 300).fill({ color: this.palette[i] });
        }
        // this.drawing.rect(50, 50).fill({ color: this.baseColor })
    }
}