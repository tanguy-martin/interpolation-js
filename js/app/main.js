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
            doInterpolate = false;

        // disable drawing on mouseup
        canvas.addEventListener('mouseup', function(e) {
            drawing = false;
            points = [];
        });

        // enable drawing on mousedown
        canvas.addEventListener('mousedown', function(e) {
            drawing = true;
        });

        // draw on mouse move
        canvas.addEventListener('mousemove', function(e) {
            if (!drawing) {
                return;
            }

            // build the point where the mouse pointer is
            var p = new Point(e.clientX, e.clientY);
            // draw the point
            p.draw(ctx);

            // if the interpolation is toggled on
            // we had the point created to our array and if we got 2 points
            // in the array we do the interpolation between those 2 points, and
            // draw the "interpolated" points.
            // then we remove the first point added in the array so that
            // we can continue with the latest point added the next time.
            if (doInterpolate) {
                points.unshift(p);

                if (points.length == 2) {
                    interpolation = new Interpolation(points[1], points[0]);
                    interpolation.interpolateLinear();
                    interpolation.draw(ctx);
                    points.pop();
                }
            }
        });


        var toggleInterpolationBtn = document.getElementById('toggleInterpolation');
        
        // toggle the interpolation on/off when clicking the associated button
        toggleInterpolationBtn.addEventListener('click', function(e) {
            doInterpolate = !doInterpolate;
            toggleInterpolationBtn.textContent = 'Interpolation ' + (doInterpolate ? 'ON' : 'OFF');
        });

});
