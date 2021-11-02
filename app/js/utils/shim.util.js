Array.prototype.equals = function (array) {
    if (!array) {
			return false;
		}

    if (this.length != array.length) {
			return false;
		}

    for (let i = 0, l = this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i])) {
							return false;
						}
        }
        else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
}

Object.defineProperty(Array.prototype, "equals", { enumerable: false });

Math.randomRange = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
