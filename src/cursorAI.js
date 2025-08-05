module.exports.generateResponse = function(input) {
    const reversed = input.split('').reverse().join('');
    return `Processed insight: ${reversed}`;
};
