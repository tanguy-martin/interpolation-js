define('interpolation', function() {
    function Interpolation(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    Interpolation.prototype.interpolateLinear = function() {
        var x1 = this.p1.x,
            x2 = this.p2.x,
            y1 = this.p1.y,
            y2 = this.p2.y,
            step = 1;

        this.points = [];

        var getPoint = function(x, x1, x2, y1, y2) {
            y = y1 + (x - x1) * ((y2 - y1) / (x2 - x1));
            return y;
        };

        if (x1 < x2) {
            for (var x = x1; x <= x2; x+= step) {

                this.points.push({
                    x: x,
                    y: getPoint(x, x1, x2, y1, y2)
                });
            }
        } else {
            for (var x = x1; x >= x2; x-= step) {

                this.points.push({
                    x: x,
                    y: getPoint(x, x1, x2, y1, y2)
                });
            }
        }

    };

    Interpolation.prototype.draw = function(ctx) {
        if (!this.points.length) {
            return;
        }

        ctx.beginPath();

        var points = this.points,
            numPoints = points.length,
            i = 1;

        var step = function() {
            for (var j = 0; j < 10; j++) {

                if (points[i-1] && points[i]) {
                    ctx.moveTo(points[i-1].x, points[i-1].y);
                    ctx.lineTo(points[i].x, points[i].y);
                    ctx.stroke();
                }

                i++;

                if (i >= numPoints - 1) {
                    break;
                }
            }

            if (i < numPoints) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);

        ctx.closePath();
    }

    return Interpolation;
});
