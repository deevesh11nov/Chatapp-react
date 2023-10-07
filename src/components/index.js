export const userImage = (userData) => {
  if (userData.profilePic === "") {
    return "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-user-avatar-icon-profile-silhouette-png-image_5173766.png";
  }

  return userData.profilePic;
};

// Generate a Random Id between two given numbers
export const getRandomId = (minRange, maxRange) => {
  return Math.floor(
    Math.random() * (maxRange - minRange) + minRange
  ).toString();
};
