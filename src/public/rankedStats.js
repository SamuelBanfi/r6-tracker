var playerRankMMR = document.querySelector('#playerRankMMR');
var playerRank = document.querySelector('#playerRank');
var rankIcon = document.querySelector('#rankIcon');
var playerRankedMatches = document.querySelector('#playerRankedMatches');

/**
 * Set the data for the ranked stats.
 * @param {Object} data 
 */
function setRankData(data) {
    rankIcon.setAttribute('src', data.rank_img);
    playerRank.innerHTML = data.rank;
    playerRankMMR.innerHTML = data.mmr;
    playerRankedMatches.innerHTML = data.matches;
}