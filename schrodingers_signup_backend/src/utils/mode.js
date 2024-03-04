let isOnline = true;

const offlineMode = () => {
  isOnline = false;
};

const onlineMode = () => {
  isOnline = true;
};

module.exports = { offlineMode, onlineMode, isOnline };
