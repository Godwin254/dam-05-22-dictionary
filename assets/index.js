const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}


const data = (res, text) => {
  console.log(res);

  if(res.title){
    return `Sorry, the definition of ${word} not available`
  }

  wrapper.classList.add("active");

  let definitions = res[0].meanings[0].definitions[0];
  let phonetics = `Commonly pronounced as: ${res[0].phonetics[0].text}`;

  document.querySelector(".word p").innerText = res[0].word;
  document.querySelector(".word span").innerText = phonetics;
  document.querySelector(".meaning span").innerText = definitions.definition;
  document.querySelector(".example span").innerText = definitions.example;

  if (definitions.synonyms[0] === undefined){
    synonyms.parentElement.style.display = "none";
  }else{
    synonyms.parentElement.style.display = "block";
    synonyms.innerHTML = "";

    for (let sn in synonyms){
      let tag = `<span onclick="search('${definitions.synonyms[sn]}')> ${definitions.synonyms[sn]}</span>`;

      synonyms.insertAdjacentHTML("beforeend", tag);
    }
  } 
}


//search function
const search = () => {
  
}
//when Enter key is pressed
searchInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13){
    e.preventDefault();

    console.log("pressed enter");
    fetchApi(searchInput.value);
  }
});

//when text is input
searchInput.addEventListener('change', function (e) {
  console.log(this.value);

  //set text value to the fetch api
  fetchApi(this.value);
});
