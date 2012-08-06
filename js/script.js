(function() {
    var b = document.body,
    	animationListener = function(e) {
    		b.style.backgroundColor = 'hsl(' + Math.ceil((Math.random()*360)) + ', 100%, 50%)';
    	};

    b.addEventListener("oAnimationIteration", animationListener, false);
    b.addEventListener("webkitAnimationIteration", animationListener, false);
    b.addEventListener("mozAnimationIteration", animationListener, false);
    b.addEventListener("msAnimationIteration", animationListener, false);
    b.addEventListener("animationiteration", animationListener, false);

    document.getElementById('changeSpeed').addEventListener('change', function(e) {
		b.style.webkitAnimationDuration = '' + 1/e.target.value + 's';
		b.style.mozAnimationDuration = '' + 1/e.target.value + 's';
		b.style.oAnimationDuration = '' + 1/e.target.value + 's';
		b.style.animationduration = '' + 1/e.target.value + 's';
    }, false);
}());