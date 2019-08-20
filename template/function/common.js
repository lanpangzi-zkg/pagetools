const deleteBlankLine = (str) => {
    return str.replace(/^\n\s\S\n$/, '');
};

module.exports = deleteBlankLine;

