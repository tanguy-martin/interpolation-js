define('point', function() {
    function Point(x, y, radius) {
        this.x = x;
        this.y = y;
        // default radius is 1
        this.radius = radius || 1;
    }

    Point.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
    }

    Point.prototype.setRadius = function(radius) {
        this.radius = radius;
    }

    return Point;
});
