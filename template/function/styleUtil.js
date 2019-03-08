function getStyle(extraData, i) {
    const { hasExpand, expandCount } = extraData;
    if (hasExpand && expandCount > 0) {
        return `this.getColDisplay(${i})`;
    }
    return {};
}
function hasStyle(style) {
    return style && Object.keys(style).length > 0;
}
module.exports = {
    getStyle,
    hasStyle,
};