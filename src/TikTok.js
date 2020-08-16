const Util = require("./Structures/Util.js");

/**
 * Validates tiktok url
 * @param {string} url Url to validate
 */
function validateURL(url) {
    return Util.validate(url);
}

/**
 * Parses TikTok video info
 * @param {string} url TikTok video url
 */
async function getInfo(url) {
    if (!validateURL(url)) throw new Error("Invalid url");
    const html = await Util.html(url);
    if (!html) return null;
    const $ = Util.getDocument(html);
    const rawJSON = $("#__NEXT_DATA__")[0].children[0].data;
    return Util.parseVideoData(rawJSON);
}

/**
 * Parses TikTok user data
 * @param {string} username Username of a TikToker
 */
async function getUser(username) {
    const html = await Util.html(`https://www.tiktok.com/@${username}`);
    if (!html) return null;
    const $ = Util.getDocument(html);
    const rawJSON = $("#__NEXT_DATA__")[0].children[0].data;
    return Util.parseUserData(rawJSON);
}

/**
 * Fetches embed
 * @param {string} url Embed url to fetch
 */
async function getEmbed(url) {
    if (!url) throw new Error("Invalid url");
    return await Util.parseEmbed(url);
}

module.exports = {
    validateURL,
    getInfo,
    getUser,
    getEmbed
};