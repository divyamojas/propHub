export const daysLeft = (deadline) => {
  const diff = deadline * 1000 - new Date();
  const remainingDays = diff / (1000 * 3600 * 24);
  return remainingDays.toFixed(5);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const propertyBids = (bids, propertyId) => {
  const bidsProperty = [];
  bids.forEach(bid => {
    if (bid.propertyId === propertyId) {
      bidsProperty.push(bid);
    }
  });


  return bidsProperty;

}
