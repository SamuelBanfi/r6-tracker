var playerImage = document.querySelector('#playerImage');
var playerName = document.querySelector('#playerName');
var playerKills = document.querySelector('#playerKills');
var playerKDRatio = document.querySelector('#playerKDRatio');
var playerLevel = document.querySelector('#playerLevel');
var playerWin = document.querySelector('#playerWin');

/**
 * Set the data for the general stats.
 * @param {Object} data 
 */
function setGeneralData(data) {
    playerName.innerHTML = data.name;
    playerLevel.innerHTML = "Level " + data.level;

    playerImage.setAttribute('src', data.header);
    playerKills.innerHTML = data.kills;
    playerKDRatio.innerHTML = data.kd;
    playerWin.innerHTML = data.wins;
}