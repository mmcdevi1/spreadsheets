export const genCharArray = (charA, charZ) => {
  var arr = [], 
  		i = charA.charCodeAt(0), 
  		j = charZ.charCodeAt(0);

  for (; i <= j; ++i) {
     arr.push(String.fromCharCode(i));
  }

  return arr;
}

export const header = (idx) => {
  if (idx < 26) {
    return genCharArray('a', 'z')[idx]
  } else {
    return genCharArray('a', 'z')[Math.floor(idx / 26) - 1] + genCharArray('a', 'z')[idx % 26]
  }
}