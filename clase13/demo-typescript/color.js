var getNumber0to255 = function () { return Math.floor(Math.random() * 256); };
var Color = /** @class */ (function () {
    function Color() {
    }
    Color.prototype.get = function () {
        var color = "rgb(".concat(getNumber0to255(), ", ").concat(getNumber0to255(), ", ").concat(getNumber0to255(), ")");
        return color;
    };
    return Color;
}());
var color = new Color();
console.log(color.get());
