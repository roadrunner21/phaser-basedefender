declare interface Number {
    between(a: number, b: number, inclusive?: boolean): boolean;
}

Number.prototype.between = function(a, b, inclusive = false) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return inclusive ? this >= min && this <= max : this > min && this < max;
};