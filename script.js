const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "_dZLOenxF3E6yTnwEETrGG73NwDBpUv2H77i8p6gJbo"; 

const searchQuery = document.getElementById("searchQuery");
const imageResults = document.getElementById("imageResults");


function clearResults() {
  imageResults.innerHTML = "";
}


function displayImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.description || "Unsplash Image";
    imageResults.appendChild(imgElement);
  });
}


document.getElementById("searchXHR").addEventListener("click", () => {
  const query = searchQuery.value;
  if (!query) return;

  clearResults();

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${API_URL}?query=${query}&client_id=${ACCESS_KEY}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayImages(data.results);
    } else {
      console.error("Error fetching data with XHR");
    }
  };
  xhr.send();
});


document.getElementById("searchFetchPromise").addEventListener("click", () => {
  const query = searchQuery.value;
  if (!query) return;

  clearResults();

  fetch(`${API_URL}?query=${query}&client_id=${ACCESS_KEY}`)
    .then((response) => response.json())
    .then((data) => displayImages(data.results))
    .catch((error) => console.error("Error fetching data with Fetch (Promises):", error));
});


document.getElementById("searchFetchAsync").addEventListener("click", async () => {
  const query = searchQuery.value;
  if (!query) return;

  clearResults();

  try {
    const response = await fetch(`${API_URL}?query=${query}&client_id=${ACCESS_KEY}`);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error("Error fetching data with Fetch (Async/Await):", error);
  }
});