// only light colors
export const generateRandomColorVal = () => Math.floor(Math.random() * 100) + 146;
export const generateRandomRgbStyle = () => `rgb(${generateRandomColorVal()}, ${generateRandomColorVal()}, ${generateRandomColorVal()})`;
