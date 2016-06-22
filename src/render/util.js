module.exports = {
    cleanString: function (string) {
        return string.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&gt;/g,'>');
    }
}