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

        canvas.addEventListener('mousemove', function(e) {
            if (!drawing) {
                return;
            }

            var p = new Point(e.clientX, e.clientY);
            p.draw(ctx);

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
