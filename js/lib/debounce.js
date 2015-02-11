function Debounce() {
	var timeoutReference;
	var isTimeoutDone = true;

	this.go = function(cb, delay) {
		delay = delay || 5000;

		if(isTimeoutDone) {
			isTimeoutDone = false;
			timeoutReference = window.setTimeout(function() {
				if(cb) {
					cb();
				}
				isTimeoutDone = true;
			}, delay);
		}
	};

	this.clear = function() {
		window.clearTimeout(timeoutReference);
	};
}

module.exports = Debounce;