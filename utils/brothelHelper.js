const Brothel = require("../models/Brothel");

const findAndSwitchPlayer = (players, revert) => {
  let findNextIndex =
    (players?.findIndex((value) => value.active === true) + 1) % players.length;

  if (revert) {
    findNextIndex =
      (players?.findIndex((value) => value.active === true) -
        1 +
        players.length) %
      players.length;
  }

  const updateSwitchedPlayer = players.map((obj, i) => {
    if (i === findNextIndex) {
      return {...obj, active: true};
    } else {
      return {...obj, active: false};
    }
  });

  return updateSwitchedPlayer;
};

const findAndUpgradeSettlment = (slotIndex, setIndex, playerId, brothel) => {
  let settlments = brothel?.gameState?.settlments;
  const activePlayer = brothel?.players?.find((p) => p._id === playerId);
  let set1 = activePlayer.set1.status;
  let set2 = activePlayer.set2.status;
  let road1 = activePlayer.road1.status;
  let road2 = activePlayer.road2.status;
  let checkSet = settlments[slotIndex][setIndex];

  if (checkSet.active) {
    if (activePlayer.color === checkSet.color) {
      settlments[slotIndex][setIndex].upgrade = true;
      activePlayer.mat.upgrade = activePlayer.mat.upgrade - 1;

      if (set1 && set2 && road1 && road2) {
        brothel?.players?.filter((p) => {
          if (p._id === playerId) {
            if (p.cards["prostitute"] > 2 && p.cards["alcohol"] > 1) {
              p.cards["prostitute"] = p.cards["prostitute"] - 3;
              p.cards["alcohol"] = p.cards["alcohol"] - 2;
              brothel.gameState.cards["prostitute"] =
                brothel.gameState.cards["prostitute"] + 3;
              brothel.gameState.cards["alcohol"] =
                brothel.gameState.cards["alcohol"] + 2;
            }
          }

          return p;
        });
      }

      brothel?.players?.filter((p) => {
        if (p._id === playerId) {
          p = activePlayer;
        }

        return p;
      });
    }
  }

  brothel.gameState.settlments = settlments;

  return brothel;
};

const findAndActiveSettlment = (slotIndex, setIndex, playerId, brothel) => {
  let settlments = brothel?.gameState?.settlments;
  let activePlayer = brothel?.players?.find((p) => p._id === playerId);

  const init = brothel?.gameState?.settlments.some((set) => {
    let have = set.some((s) => s.active && activePlayer.id === playerId);
    return have;
  });

  if (!init) {
    settlments[slotIndex][setIndex].active = true;
    settlments[slotIndex][setIndex].color = activePlayer.color;
    brothel.gameState.settlments = settlments;

    let set1 = activePlayer.set1.status;
    let set2 = activePlayer.set2.status;

    if (set1 && set2) {
      brothel?.players?.filter((p) => {
        if (p._id === playerId) {
          if (
            p.cards["drugs"] > 0 &&
            p.cards["weapon"] > 0 &&
            p.cards["alcohol"] > 0 &&
            p.cards["slaves"] > 0
          ) {
            p.cards["drugs"] = p.cards["drugs"] - 1;
            p.cards["weapon"] = p.cards["weapon"] - 1;
            p.cards["alcohol"] = p.cards["alcohol"] - 1;
            p.cards["slaves"] = p.cards["slaves"] - 1;
            brothel.gameState.cards["drugs"] =
              brothel.gameState.cards["drugs"] + 1;
            brothel.gameState.cards["weapon"] =
              brothel.gameState.cards["weapon"] + 1;
            brothel.gameState.cards["alcohol"] =
              brothel.gameState.cards["alcohol"] + 1;
            brothel.gameState.cards["slaves"] =
              brothel.gameState.cards["slaves"] + 1;
          }
        }

        return p;
      });
    }

    if (!set1) {
      activePlayer.set1.object = settlments[slotIndex][setIndex];
      activePlayer.set1.status = true;
    }

    if (set1 && !set2) {
      activePlayer.set2.object = settlments[slotIndex][setIndex];
      activePlayer.set2.status = true;
    }

    activePlayer.mat.settlment = activePlayer.mat.settlment - 1;
    activePlayer.movesCounter = activePlayer.movesCounter + 1;

    brothel?.players?.filter((p) => {
      if (p._id === playerId) {
        p = activePlayer;
      }

      return p;
    });
  }

  return brothel;
};

const checkLongestRoad = (
  color,
  roads,
  roadToCheck,
  longest,
  slotIndex,
  roadIndex
) => {
  let connector = (slot, index, lon) => {
    let curRoad = roads[parseInt(slot)][parseInt(index)];
    let connected = false;
    let connArr = [];

    if (lon.length > 1) {
      for (let i = 0; i < lon.length; i++) {
        const variant = lon[i];

        for (let j = 0; j < variant.length; j++) {
          let varRoad = variant[j];

          if (curRoad === varRoad) {
            connArr.push(variant);
          }
        }
      }

      if (connArr.length > 1) {
        let v1 = connArr[0];
        let v2 = connArr[1];

        let f1 = v1.some((vi, i) => vi === curRoad && i === 0);
        let l1 = v1.some((vi, i) => vi === curRoad && i === v1.length - 1);
        let f2 = v2.some((vi, i) => vi === curRoad && i === 0);
        let l2 = v2.some((vi, i) => vi === curRoad && i === v2.length - 1);

        // const removeDuplicates = array => {
        //   return [...new Set(array.map(JSON.stringify))].map(JSON.parse);
        // };

        if (
          (f1 && l1) ||
          (f2 && l2) ||
          (f1 && l2) ||
          (f2 && l1) ||
          (l1 && l2)
        ) {
          let dup = v1.concat(v2);
          let nodup = removeDuplicates(dup);
          lon = [nodup];
          connected = true;
        }
      }
    }

    return {
      connected,
      conLongest: lon,
    };
  };

  let activated = [];

  roads.filter((slot, i) => {
    slot.filter((road, j) => {
      if (road.color === color && road.active) {
        road.slot = i;
        road.index = j;
        activated.push(road);
      }

      return;
    });
    return;
  });

  if (activated.length === 2) {
    for (let i = 0; i < activated.length; i++) {
      longest.push([activated[i]]);
    }
  }

  if (activated.length > 2) {
    for (let i = 0; i < longest.length; i++) {
      let variants = longest[i];
      let newVariant = [];

      for (let j = 0; j < variants.length; j++) {
        let variant = variants[j];
        let prev = parseInt(variant.index) - 1;
        let next = parseInt(variant.index) + 1;
        let first = variants[0].collisions;
        let last = variants[variants.length - 1].collisions;

        if (parseInt(variant.slot) === parseInt(slotIndex)) {
          if (parseInt(roadIndex) === prev) {
            roadToCheck.slot = parseInt(slotIndex);
            roadToCheck.index = parseInt(roadIndex);
            newVariant = [roadToCheck, ...variants];
            longest[i] = newVariant;
          }

          if (parseInt(roadIndex) === next) {
            roadToCheck.slot = parseInt(slotIndex);
            roadToCheck.index = parseInt(roadIndex);
            newVariant = [...variants, roadToCheck];
            longest[i] = newVariant;
          }
        } else {
          for (let keyf of Object.keys(first)) {
            if (parseInt(keyf) === parseInt(slotIndex)) {
              let inxsf = first[keyf];

              for (let f = 0; f < inxsf.length; f++) {
                if (parseInt(inxsf[f]) === parseInt(roadIndex)) {
                  roadToCheck.slot = parseInt(slotIndex);
                  roadToCheck.index = parseInt(roadIndex);
                  newVariant = [roadToCheck, ...variants];
                  longest[i] = newVariant;
                }
              }
            }
          }

          for (let keyl of Object.keys(last)) {
            if (parseInt(keyl) === parseInt(slotIndex)) {
              let inxsl = last[keyl];

              for (let l = 0; l < inxsl.length; l++) {
                if (parseInt(inxsl[l]) === parseInt(roadIndex)) {
                  roadToCheck.slot = parseInt(slotIndex);
                  roadToCheck.index = parseInt(roadIndex);
                  newVariant = [...variants, roadToCheck];
                  longest[i] = newVariant;
                }
              }
            }
          }
        }
      }
    }
  }

  let {connected, conLongest} = connector(slotIndex, roadIndex, longest);

  return connected ? conLongest : longest;
};

const findAndActiveRoad = (roadIndex, slotIndex, playerId, brothel) => {
  let roads = brothel?.gameState?.roads;
  let activePlayer = brothel?.players?.find((p) => p._id === playerId);
  let road1 = activePlayer.road1.status;
  let road2 = activePlayer.road2.status;

  roads[slotIndex][roadIndex].active = true;
  roads[slotIndex][roadIndex].color = activePlayer.color;
  brothel.gameState.roads = roads;

  // let longest = checkLongestRoad(
  //   activePlayer.color,
  //   roads,
  //   roads[slotIndex][roadIndex],
  //   activePlayer.longestRoad,
  //   slotIndex,
  //   roadIndex
  // );

  if (road1 && road2) {
    brothel?.players.filter((p) => {
      if (p._id === activePlayer._id) {
        if (p.cards["drugs"] > 0 && p.cards["weapon"] > 0) {
          p.cards["drugs"] = p.cards["drugs"] - 1;
          p.cards["weapon"] = p.cards["weapon"] - 1;
          brothel.gameState.cards["drugs"] =
            brothel.gameState.cards["drugs"] + 1;
          brothel.gameState.cards["weapon"] =
            brothel.gameState.cards["weapon"] + 1;
        }
      }

      return p;
    });
  }

  if (!road1) {
    activePlayer.road1.object = roads[slotIndex][roadIndex];
    activePlayer.road1.status = true;
  }

  if (road1 && !road2) {
    activePlayer.road2.object = roads[slotIndex][roadIndex];
    activePlayer.road2.status = true;
  }

  activePlayer.mat.road = activePlayer.mat.road - 1;
  activePlayer.movesCounter = activePlayer.movesCounter + 1;

  brothel?.players.filter((p) => {
    if (p._id === activePlayer._id) {
      p = activePlayer;
      //p.longestRoad = longest;
    }

    return p;
  });

  return brothel;
};

const exchangeResourceWithPlayers = (
  tradedResource,
  receivedResource,
  senderOwnResource,
  clientOwnResource
) => {
  console.log(senderOwnResource, "senderOwnResource");
  console.log(tradedResource, "tradedResource");
  console.log(receivedResource, "receivedResource");

  for (const resource in tradedResource) {
    if (tradedResource[resource] > 0 && tradedResource[resource] !== 0) {
      senderOwnResource[resource] -= tradedResource[resource];
    }
  }
  console.log(senderOwnResource, "after trade");

  for (const resource in receivedResource) {
    if (receivedResource[resource] > 0) {
      senderOwnResource[resource] += receivedResource[resource];
    }
  }

  for (const resource in clientOwnResource) {
    if (tradedResource[resource] > 0) {
      clientOwnResource[resource] += tradedResource[resource];
    }
  }

  for (const resource in clientOwnResource) {
    if (receivedResource[resource] > 0) {
      clientOwnResource[resource] -= receivedResource[resource];
    }
  }

  return {senderOwnResource, clientOwnResource};
};

const exchangeResourceCounterOffer = (
  tradedResource,
  receivedResource,
  senderOwnResource,
  clientOwnResource
) => {
  for (const resource in tradedResource) {
    if (tradedResource[resource] > 0) {
      senderOwnResource[resource] += tradedResource[resource];
    }
  }
  for (const resource in receivedResource) {
    if (receivedResource[resource] > 0) {
      senderOwnResource[resource] -= receivedResource[resource];
    }
  }
  for (const resource in clientOwnResource) {
    if (tradedResource[resource] > 0) {
      clientOwnResource[resource] -= tradedResource[resource];
    }
  }
  for (const resource in clientOwnResource) {
    if (receivedResource[resource] > 0) {
      clientOwnResource[resource] += receivedResource[resource];
    }
  }

  return {senderOwnResource, clientOwnResource};
};

const exchangeResourceWithBank = (
  tradedResources,
  receivedResource,
  senderOwnResource,
  resoursesInBank
) => {
  for (const resource in tradedResources) {
    if (tradedResources[resource] > 0) {
      senderOwnResource[resource] -= tradedResources[resource];
    }
  }
  for (const resource in receivedResource) {
    if (receivedResource[resource] > 0) {
      senderOwnResource[resource] += receivedResource[resource];
    }
  }
  for (const resource in resoursesInBank) {
    if (tradedResources[resource] > 0) {
      resoursesInBank[resource] += tradedResources[resource];
    }
  }
  for (const resource in resoursesInBank) {
    if (receivedResource[resource] > 0) {
      resoursesInBank[resource] -= receivedResource[resource];
    }
  }

  return {senderOwnResource, resoursesInBank};
};

const getResourceCards = (broth) => {
  let diceNumber1 = broth?.gameState?.diceNumber1;
  let diceNumber2 = broth?.gameState?.diceNumber2;
  let slots = broth?.gameState?.slots;
  let sets = broth?.gameState?.settlments;
  let players = broth?.players;
  let newPlayers = [];
  let resources = [];

  sets.filter((slot) => {
    slot.filter((s) => {
      if (s.active) {
        let res = s.res;

        res.filter((r) => {
          if (
            parseInt(diceNumber1) + parseInt(diceNumber2) !== 7 &&
            parseInt(slots[r].number) ===
              parseInt(diceNumber1) + parseInt(diceNumber2)
          ) {
            resources.push({
              color: s.color,
              type: slots[r].type,
              upgrade: s.upgrade,
            });
          }

          return;
        });
      }

      return;
    });

    return;
  });

  resources.filter((r) => {
    newPlayers = players.filter((p) => {
      let bcards = broth?.gameState?.cards;

      if (p.color === r.color) {
        if (r.upgrade) {
          if (bcards[r.type] === 1) {
            bcards[r.type]--;
            p.cards[r.type]++;
          }

          if (bcards[r.type] > 1) {
            bcards[r.type] - 2;
            p.cards[r.type] + 2;
          }
        } else {
          if (bcards[r.type] > 0) {
            bcards[r.type]--;
            p.cards[r.type]++;
          }
        }

        broth.gameState.cards = bcards;
        return p;
      }

      return p;
    });

    return;
  });

  if (
    parseInt(diceNumber1) + parseInt(diceNumber2) !== 7 &&
    newPlayers.length > 0
  )
    broth.players = newPlayers;

  return broth;
};

const buyDevCard = (brothel, playerId) => {
  let devCards = brothel.gameState.devCards;
  let cardToBuy = devCards[devCards.length - 1];

  brothel?.players?.filter((p) => {
    if (p._id === playerId) {
      let cards = p.cards;

      if (cards.slaves > 0 && cards.prostitute > 0 && cards.alcohol > 0) {
        p.cards.slaves = cards.slaves - 1;
        p.cards.prostitute = cards.prostitute - 1;
        p.cards.alcohol = cards.alcohol - 1;
        brothel.gameState.cards.slaves = brothel.gameState.cards.slaves + 1;
        brothel.gameState.cards.prostitute =
          brothel.gameState.cards.prostitute + 1;
        brothel.gameState.cards.alcohol = brothel.gameState.cards.alcohol + 1;
        brothel.gameState.cards[cardToBuy]--;
        p.cards[cardToBuy]++;

        if (
          cardToBuy === "police" ||
          cardToBuy === "victory" ||
          cardToBuy === "monopoly" ||
          cardToBuy === "resources" ||
          cardToBuy === "roadBuilding"
        ) {
          p.playedCards[cardToBuy].push(false);
        }
      }
    }

    return p;
  });

  brothel.gameState.devCards.pop();

  return brothel;
};

const synchronizeBrothel = async (brothel) => {
  let players = brothel.players;
  let gameState = brothel.gameState;

  const updatedBrothel = await Brothel.findByIdAndUpdate(
    brothel._id,
    {
      gameState,
      players,
    },
    {new: true}
  );

  if (!updatedBrothel) {
    return {
      updated: false,
      brothelId: brothel._id,
    };
  } else {
    return {
      updated: true,
      brothelId: brothel._id,
    };
  }
};

module.exports = {
  findAndSwitchPlayer,
  findAndActiveRoad,
  findAndActiveSettlment,
  findAndUpgradeSettlment,
  exchangeResourceWithPlayers,
  exchangeResourceCounterOffer,
  buyDevCard,
  exchangeResourceWithBank,
  getResourceCards,
  synchronizeBrothel,
};
