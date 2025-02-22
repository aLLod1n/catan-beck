let activeBrothels = {};

const addBrothel = (brothelId, playerId, socketId) => {
  if (activeBrothels.hasOwnProperty(brothelId)) {
    activeBrothels[brothelId][playerId] = socketId;
  } else {
    activeBrothels[brothelId] = {
      [playerId]: socketId
    };
  }
};

const findPlayerById = (playerId, socketId) => {
  for (const brothelId in activeBrothels) {
    if (activeBrothels.hasOwnProperty(brothelId)) {
      const brothelPlayers = activeBrothels[brothelId];

      if (brothelPlayers.hasOwnProperty(playerId)) {
        activeBrothels[brothelId][playerId] = socketId;
        
        return brothelId;
      }
    }
  }

  return null;
};

const removeBrothel = (brothelId) => {
  if (activeBrothels.hasOwnProperty(brothelId)) {
    delete activeBrothels[brothelId];
  }
};

const getActiveBrothels = () => {
  return activeBrothels;
};

module.exports = {
  getActiveBrothels,
  removeBrothel,
  addBrothel,
  findPlayerById
}