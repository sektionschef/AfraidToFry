// create a palette with 9 tones - 4 down 4 up and base color in the middel
class dynamicPalette {
    // constructor(drawing, baseColor, cChange, lChange, sChange) {
    constructor(baseColor, colorList, lightnessList, desaturateList) {

        // change in lightness and in saturation
        // this.cChange = cChange;
        // this.lChange = lChange;
        // this.sChange = sChange;

        // this.drawing = drawing;
        this.baseColor = tinycolor(baseColor);
        // let _color_beginning = tinycolor(baseColor);
        // let _color_end = tinycolor(baseColor);

        // this.length = 9;
        // this.upAndDown = 4;

        // this.palette = Array(this.length);

        // base color in the middle
        // this.palette[this.upAndDown] = this.baseColor.toHexString();

        // UP AND DOWN METHOD
        // for (var i = 1; i < (this.upAndDown + 1); i++) {
        //     _color_end.spin(this.cChange * i).lighten(this.lChange * i).desaturate(this.sChange * i);
        //     _color_beginning.spin(-this.cChange * i).darken(this.lChange * i).saturate(this.sChange * i);

        //     // _color_end.spin(this.cChange * i);
        //     // _color_end.lighten(this.lChange * i);
        //     // _color_beginning.darken(this.lChange * i);

        //     // _color_beginning.saturate(this.sChange * i);
        //     // _color_end.saturate(this.sChange * i);

        //     // _color_beginning.spin(-this.cChange * i);
        //     // _color_beginning.desaturate(this.sChange * i);
        //     // _color_end.desaturate(this.sChange * i);

        //     this.palette[this.upAndDown - i] = _color_beginning.toHexString();
        //     this.palette[(this.upAndDown + i)] = _color_end.toHexString();
        // }


        // DYNAMIC
        // this.length = 60;
        this.length = 160;
        this.palette = [];
        // this.palette = Array(this.length);
        // console.log(getNormallyDistributedRandomNumber(0, 10));



        for (var i = 0; i < this.length; i++) {
            // this.palette.push(this.baseColor.clone().spin(getNormallyDistributedRandomNumber(0, cSTD)).lighten(getNormallyDistributedRandomNumber(0, lSTD)).desaturate(getNormallyDistributedRandomNumber(0, sSTD)).toHexString());

            // MANUAL OVERWRITE OIDA
            this.palette.push(this.baseColor.clone().spin(getRandomFromList(colorList)).lighten(getRandomFromList(lightnessList)).desaturate(getRandomFromList(desaturateList)).toHexString());
        }

        // SORT BY BRIGHTNESS
        // this.palette.sort(function (a, b) { return tinycolor(a).getBrightness() - tinycolor(b).getBrightness() });
        // this.palette.sort(function (a, b) { return tinycolor(a).getLuminance() - tinycolor(b).getLuminance() });
        // SORT BY HUE
        // this.palette.sort(function (a, b) { return tinycolor(a).toHsl().h - tinycolor(b).toHsl().h });
        // SORT BY HUE AND LIGHTNESS
        // this.palette.sort(function (a, b) { return (tinycolor(a).toHsl().h - tinycolor(b).toHsl().h || tinycolor(a).getBrightness() - tinycolor(b).getBrightness()) });
        // SORT BY BRIGHTNESS AND HUE
        this.palette.sort(function (a, b) { return (tinycolor(a).getBrightness().h - tinycolor(b).getBrightness().h || tinycolor(a).toHsl() - tinycolor(b).toHsl()) });

        // console.log(this.palette);
    }

    show() {
        var boxWidth = 20;

        for (var i = 0; i < this.palette.length; i++) {
            // this.drawing.rect(50, 50).move(rescaling_width / 4 + 50 * i, 300).fill({ color: this.palette[i] });

            const svgNode = document.getElementById('svgNode');

            var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttributeNS(null, 'x', rescaling_width / 10 + boxWidth * i);
            rect.setAttributeNS(null, 'y', 300);
            rect.setAttributeNS(null, 'height', 50);
            rect.setAttributeNS(null, 'width', boxWidth);
            // rect.setAttributeNS(null, 'fill', '#' + Math.round(0xffffff * Math.random()).toString(16));
            rect.setAttributeNS(null, 'fill', this.palette[i]);

            svgNode.appendChild(rect);
        }
    }
}