module.exports.encode = function(input) {
    return input.split('').filter((_, i) => (i + 1) % 3 !== 0).join('');
};
