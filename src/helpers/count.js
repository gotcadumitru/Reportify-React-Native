export function getDeepNumber(obj, word = 'text') {
  let string = JSON.stringify(obj);
  return string.split(word).length - 1;
}
