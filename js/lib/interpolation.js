define('interpolation', function() {
    function Interpolation(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;

        p3 && (this.p3 = p3);
    }

    /**
     * Given 2 points (stored in the current object),
     * do an linear interpolation between them. This is purely
     * a theorical exemple put in practice because we could have
     * just used the canvas lineTo() method between the points drawn
     * to effectively draw the affine function between those 2 points (
     * this method does exactly that, but little step by little step)
     *
     * @return {void}
     */
    Interpolation.prototype.interpolateLinear = function() {
        var x1 = this.p1.x,
            x2 = this.p2.x,
            y1 = this.p1.y,
            y2 = this.p2.y,
            step = 1;

        this.points = [];

        var getPoint = function(x, x1, x2, y1, y2) {
            return y1 + (x - x1) * ((y2 - y1) / (x2 - x1));;
        }, x, y;

        if (x1 < x2) {
            for (x = x1; x <= x2; x+= step) {

                this.points.push({
                    x: x,
                    y: getPoint(x, x1, x2, y1, y2)
                });
            }
        } else if (x1 > x2) {
            for (x = x1; x >= x2; x-= step) {

                this.points.push({
                    x: x,
                    y: getPoint(x, x1, x2, y1, y2)
                });
            }
        } else if (y1 < y2) {
            for (y = y1; y <= y2; y+= step) {

                this.points.push({
                    x: getPoint(y, y1, y2, x1, x2),
                    y: y
                });
            }
        } else if (y1 > y2) {
            for (y = y1; y >= y2; y-= step) {

                this.points.push({
                    x: getPoint(y, y1, y2, x1, x2),
                    y: y
                });
            }
        }

    };

    /**
     * Given 3 points, do a interpolation between them. This is basic and
     * will always go from the minimum x to the maximum x (or min y to max y
     * if the x coordinates are equals).
     *
     * @return {void}
     */
    Interpolation.prototype.interpolateQuadratic = function() {
        var x1 = this.p1.x,
            x2 = this.p2.x,
            x3 = this.p3.x,
            y1 = this.p1.y,
            y2 = this.p2.y,
            y3 = this.p3.y,
            step = 1;

        this.points = [];

        // this method returns the y coordinate given x coordinate and
        // the other 3 points coordinates.
        // @todo generalise this function to work with a polynamial function
        // of n degree
        var getPoint = function(x, x1, x2, x3, y1, y2, y3) {
            return y1 * ((x - x2) * (x - x3)) / ((x1 - x2) * (x1 - x3))
                 + y2 * ((x - x3) * (x - x1)) / ((x2 - x3) * (x2 - x1))
                 + y3 * ((x - x1) * (x - x2)) / ((x3 - x1) * (x3 - x2));
        }, x, y;

        var xMin = Math.min(x1, x2, x3),
            xMax = Math.max(x1, x2, x3),
            yMin = Math.min(y1, y2, y3),
            yMax = Math.max(y1, y2, y3);

        if (xMax != xMin) {
            for (x = xMin; x <= xMax; x+= step) {
                this.points.push({
                    x: x,
                    y: getPoint(x, x1, x2, x3, y1, y2, y3)
                });
            }
        } else if (yMax != yMin) {
            for (y = yMin; y <= yMax; y+= step) {
                this.points.push({
                    x: getPoint(y, y1, y2, y3, x1, x2, x3),
                    y: x
                });
            }
        }

    };

    /**
     * Draw a point into the given Canvas context
     *
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
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
