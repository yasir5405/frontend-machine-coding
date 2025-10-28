function capitalizeWords(sentence) {
  // Your implementation
  let wordsArray = sentence?.trim().split(" ");
  let result = wordsArray.map((word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });
  return result.join(" ");
}

//For the purpose of user debugging.
const res = capitalizeWords("hello WORLD");
console.log(res);
