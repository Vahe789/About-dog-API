const BASE_URL = "https://dog.ceo/api/breeds";
const RANDOM_IMAGES_URL = `${BASE_URL}/image/random`;
const ALL_BREEDS_URL = `${BASE_URL}/list/all`;
const button = document.getElementById("button");
const image = document.getElementById("img");
const showBreeds = document.getElementById("showBreeds");
const breedsList = document.getElementById("list");
const breedImageList = document.getElementById("image-list");

button.addEventListener("click", function () {
  const request = new XMLHttpRequest();
  request.open("GET", RANDOM_IMAGES_URL);
  request.send();
  request.addEventListener("load", function () {
    image.src = JSON.parse(request.response).message;
  });
});

function onBreedClick(breed) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://dog.ceo/api/breed/${breed}/images`);
  request.send();
  request.addEventListener("load", function () {
    const breedsImagesArr = JSON.parse(request.response).message;
    breedsImagesArr.slice(0, 10).forEach(function (breedImageSrc) {
      const img = document.createElement("img");
      img.src = breedImageSrc;
      const li = document.createElement("li");
      li.append(img);
      breedImageList.append(li);
    });
  });
}

function makeBreedList() {
  const xml = new XMLHttpRequest();
  xml.open("GET", ALL_BREEDS_URL);
  xml.send();
  xml.addEventListener("load", function () {
    const breedsObj = JSON.parse(xml.response).message;
    for (let breed in breedsObj) {
      const li = document.createElement("li");
      li.append(breed);
      breedsList.append(li);
      li.addEventListener("click", function () {
        onBreedClick(breed);
      });
    }
  });
}
showBreeds.addEventListener("click", makeBreedList);
