export function generateRandomString() {
  const allowedChars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // semua karakter diizinkan kecuali 1, I, 0, dan O
  let randomString = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    randomString += allowedChars[randomIndex];
  }
  return randomString;
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
