function signed(num) {
  return num > 0 ? `+${num}` : `${num}`;
}

function signedSpaced(num) {
  if (num > 0) {
    return `+ ${num}`;
  } else if (num < 0) {
    return `- ${Math.abs(num)}`;
  }
  return '';
}

export {
  signed,
  signedSpaced,
};
