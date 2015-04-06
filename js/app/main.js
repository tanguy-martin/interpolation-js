define(
    'app/main',
    ['point', 'interpolation'],

    function(Point, Interpolation) {

        var canvas = document.getElementById('viewport'),
            ctx = canvas.getContext('2d');

        // set the canvas full width
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.lineCap = "round";

        var points = [],
            drawing = false,
            doInterpolate = true,
            interpolationType = 'linear',
            mode = 'points'; // default interpolation type

        // disable drawing on mouseup
        canvas.addEventListener('mouseup', function(e) {
            drawing = false;

            if (mode === 'lines') {
                points = [];
            }
        });

        // enable drawing on mousedown
        canvas.addEventListener('mousedown', function(e) {
            drawing = true;
        });

        // draw on mouse move is "lines" mode is enabled
        canvas.addEventListener('mousemove', function(e) {
            if (!drawing || mode !== 'lines') {
                return;
            }

            var lastPoint = drawPoint(e);
            interpolate(lastPoint);
        });

        // draw on mouse click if "points" mode is enabled
        canvas.addEventListener('click', function(e) {
            if (mode !== 'points') {
                return;
            }

            var lastPoint = drawPoint(e, 4);
            interpolate(lastPoint);
        });

        /**
         * Create a point, draws it into the canvas and returns it
         *
         * @param  {MouseEvent} e
         * @return {Point}
         */
        var drawPoint = function(e, pointSize) {
            // build the point where the mouse pointer is
            var p = new Point(e.clientX, e.clientY, pointSize);
            // draw the point
            p.draw(ctx);

            return p;
        };

        /**
         * If the interpolation is toggled on
         * we had the point created to our array and if we got 2 points
         * in the array we do the interpolation between those 2 points, and
         * draw the "interpolated" points.
         * then we remove the first point added in the array so that
         * we can continue with the latest point added the next time.
         *
         * @param  {Point} lastPoint
         * @return {void}
         */
        var interpolate = function(lastPoint) {

            if (doInterpolate) {
                points.unshift(lastPoint);

                if (interpolationType == 'linear' && points.length == 2) {
                    interpolation = new Interpolation(points[1], points[0]);
                    interpolation.interpolateLinear();
                    interpolation.draw(ctx);
                    points.pop();
                }

                if (interpolationType == 'quadratic' && points.length == 3) {
                    interpolation = new Interpolation(points[2], points[1], points[0]);
                    interpolation.interpolateQuadratic();
                    interpolation.draw(ctx);
                    points.pop();
                    points.pop();
                }
            }
        };


        /*
         * this part initialise the controls
         */
        
        var toggleInterpolationBtn = document.getElementById('toggleInterpolation');
        // toggle the interpolation on/off when clicking the associated button
        toggleInterpolationBtn.addEventListener('click', function(e) {
            doInterpolate = !doInterpolate;
            toggleInterpolationBtn.textContent = 'Interpolation ' + (doInterpolate ? 'ON' : 'OFF');
        });

        // toggle interpolation type (select dropdown)
        var interpolationTypeBtn = document.getElementById('interpolationType');
        interpolationType = interpolationTypeBtn.value;
        interpolationTypeBtn.addEventListener('change', function() {
            interpolationType = this.value;
        });

        // toggle mode (select dropdown)
        var modeBtn = document.getElementById('mode');
        mode = modeBtn.value;
        modeBtn.addEventListener('change', function() {
            mode = this.value;
            points = [];
        });

});
