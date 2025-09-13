


const dogContainer = document.getElementById("dogContainer");

const errorMessageElement = document.getElementById('error-message');

const fetchRandomDogPictureButton = document.getElementById("fetchRandomDogPictureButton");

const fetchRandomDogBreedButton = document.getElementById("fetchRandomDogBreedButton");
const fetchRandomDogFactsButton = document.getElementById("fetchRandomDogFactsButton");

//this function is for random dog images

async function randomDogImage() {

    const randomDogPictureDiv = document.getElementById('randomDogPictureDiv');

    randomDogPictureDiv.innerHTML = "Loading...";

    try {
        const response = await fetch("/random-dog-picture");
    
        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        console.log(data);
        const imageUrl = data[0].url;
        randomDogPictureDiv.innerHTML = `<img src="${imageUrl}" alt="Random Dog" style="max-width: 800px; border-radius: 24px;">`

    } catch(error){
    console.error(error);


    errorMessageElement.textContent = "Failed to load data. Please try again later.";
    errorMessageElement.style.color = "red";
    }
    

}


async function randomDogBreed() {
    const randomDogBreedDiv = document.getElementById("randomDogBreedDiv");
    
    randomDogBreedDiv.innerHTML = "Loading...";

    try {
        const response = await fetch("/random-breed");
    
        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        console.log(data);

        randomDogBreedDiv.innerHTML = `
        <div class="breed-info">
        <h2>${data.name}</h2>
        <img src="https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg"
        alt="${data.name}"
        style="max-width: 800px; border-radius: 24px;">
        <div class="text-block"><p><strong>Temperament:</strong> ${data.temperament || "No temperament info available"}</p>
        <p><strong>Bred for:</strong> ${data.bred_for || "No bred for info available"}</p>
        </div></div>
        
        
        `;
        
    } catch(error){
    console.error(error);


    errorMessageElement.textContent = "Failed to load data. Please try again later.";
    errorMessageElement.style.color = "red";
    }
    

}

/* random dog facts are only available with the premium version, oh well!
async function randomDogFacts() {
    const randomDogFactsDiv = document.getElementById("randomDogFactsDiv");
    
    randomDogFactsDiv.innerHTML = "Loading...";

    try {
        const response = await fetch("/random-facts");
    
        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        console.log(data);

        randomDogFactsDiv.innerHTML = `<p>${data.fact}</p>`;

    } catch(error){
    console.error(error);


    errorMessageElement.textContent = "Failed to load data. Please try again later.";
    errorMessageElement.style.color = "red";
    }
    

}*/

fetchRandomDogPictureButton.addEventListener("click", randomDogImage);
fetchRandomDogBreedButton.addEventListener("click", randomDogBreed);
//fetchRandomDogFactsButton.addEventListener("click", randomDogFacts);

