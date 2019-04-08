class Rectangle {
    constructor(x1, y1, x2, y2) {
        this.x1 = parseFloat(x1);
        this.x2 = parseFloat(x2);
        this.y1 = parseFloat(y1);
        this.y2 = parseFloat(y2);

        if (isNaN(this.x1)
            || isNaN(this.x2)
            || isNaN(this.y1)
            || isNaN(this.y2)) {
            throw new Error('[Rectangle]: Разрешены только числа');
        }

        if (this.x1 === this.x2 && this.y1 === this.y2) {
            throw new Error('[Rectangle]: Точки совпадают');
        }
    }

    width() { return Math.abs(this.x1 - this.x2); }
    height() { return Math.abs(this.y1 - this.y2); }
    isSquare() {return this.width() === this.height(); }
}

module.exports = Rectangle;