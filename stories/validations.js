export const isNumber = val => typeof val === 'number';

export const isString = val => typeof val === 'string';

export const lengthGreaterThan = min => val => val.length > min;

export const greaterThan = min => val => val > min;

export const greaterOrEqualThan = min => val => val >= min;

export const lessThan = min => val => val < min;

export const lessOrEqualThan = max => val => val <= max;
