const RandomColor = () => {
  const letters = "0123456789ABCDEF";
  const getRandomDarkColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      // Generate a random number between 0 and 8 to ensure darker colors
      color += letters[Math.floor(Math.random() * 9)];
    }
    return color;
  };

  return getRandomDarkColor();
};

export default RandomColor;
