define('point', function() {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    Point.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
    }

    return Point;
});
