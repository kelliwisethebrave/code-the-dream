
const fetchButton = document.getElementById("fetchButton");

const dogContainer = document.getElementById("dogContainer");

const errorMessageElement = document.getElementById('error-message');

const fetchRandomDogPictureButton = document.getElementById("fetchRandomDogPictureButton");


// this function calls groups of breeds for the my_dogs page
async function fetchAndDisplayBreeds(breedNames, containerId) {

    const breedDiv = document.getElementById(containerId);
    

    //clears search results on next search - don't need this because no search
    //resultsDiv.innerHTML = "";
    //errorMessageElement.textContent = "";

    //div.innerHTML = "Loading...";

    
    for (const breed of breedNames) {

        try{
            const response = await fetch(`/searched-breed?q=${breed}`);
            
        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        
        console.log(data);

        


        if (data.length === 0) {
            resultsDiv.innerHTML = "No results found.";
            return;
        }
        //clear loading
        //div.innerHTML = "";
        //clears error on the next search - dont' need - no search here
        //const errorMessageElement = document.getElementById('error-message');
        



        //shows JSON info for first search element
        //dogContainer.innerHTML = `<pre>${JSON.stringify(data[0], null, 2)}</pre>`;
        
        
        data.forEach(groupBreed => {
            const card = document.createElement("div");
            card.classList.add("breed-info");

            const name = document.createElement("h2");
            name.textContent = groupBreed.name;

            const temperament = document.createElement("p");
            temperament.innerHTML = "<strong>Temperament:</strong> " + (groupBreed.temperament || "No temperament info");

            const bredFor = document.createElement("p");
            bredFor.innerHTML = "<strong>Bred for:</strong> " + (groupBreed.bred_for || "No bred for info");

            const image = document.createElement("img");
            image.src = groupBreed.image?.url || "No image available";

            const textBlock = document.createElement("div");
            textBlock.classList.add("text-block");
            
            textBlock.appendChild(temperament);
            textBlock.appendChild(bredFor);

            card.appendChild(name);
            card.appendChild(image);
            card.appendChild(textBlock);
            
            

            breedDiv.appendChild(card);


        });

        
        //const imageUrl = data[0].url;

        //dogContainer.innerHTML = `<img src="${imageUrl}" alt="Random Dog" style="max-width: 400px; border-radius: 8px;">`

    }
        
        catch(error){
            console.error(error);

            errorMessageElement.textContent = "Failed to load data. Please try again later.";
            errorMessageElement.style.color = "red";
        }
        


}

}

fetchAndDisplayBreeds(["alaskan husky", "siberian husky", "american eskimo", "schipperke"], "akkBreeds");
fetchAndDisplayBreeds(["rat terrier", "smooth fox terrier", "toy fox terrier", "wire fox terrier"], "jrtBreeds");



//this function is for searching a dog breed, used in the index.html search
async function fetchDog() {

    
    const resultsDiv = document.getElementById("results");
    //const errorMessageElement = document.getElementById('error-message');

    //clears search results on next search
    resultsDiv.innerHTML = "";
    errorMessageElement.textContent = "";

    resultsDiv.innerHTML = "Loading...";

    
    try{
        const searchedBreed = document.getElementById("searchedBreed").value.toLowerCase();
        const response = await fetch(`/searched-breed?q=${searchedBreed}`,);
        const data = await response.json();
    
        console.log(data);

        //clear loading

        resultsDiv.innerHTML = "";

        //if (!data || data.length === 0) {
        //resultsDiv.innerHTML = "No results found.";
        //return;
        //}

        if (!Array.isArray(data) || data.length === 0) {
            resultsDiv.innerHTML = "No results found.";
            return;
        }
        



        //shows JSON info for first search element
        //dogContainer.innerHTML = `<pre>${JSON.stringify(data[0], null, 2)}</pre>`;
        
        data.forEach(breed => {
            const card = document.createElement("div");
            card.classList.add("breed-info");

            const name = document.createElement("h3");
            name.textContent = breed.name;

            const temperament = document.createElement("p");
            temperament.textContent = breed.temperament || "No temperament info";

            const image = document.createElement("img");
            image.src = breed.image?.url || "No image available";

            card.appendChild(name);
            card.appendChild(temperament);
            card.appendChild(image);

            resultsDiv.appendChild(card);


        });

        
        //const imageUrl = data[0].url;

        //dogContainer.innerHTML = `<img src="${imageUrl}" alt="Random Dog" style="max-width: 400px; border-radius: 8px;">`

        } catch(error){
        console.error(error);


        errorMessageElement.textContent = "Failed to load data. Please try again later.";
        errorMessageElement.style.color = "red";
    }
        


}

    
    

fetchButton.addEventListener("click", fetchDog);


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
        randomDogPictureDiv.innerHTML = `<img src="${imageUrl}" alt="Random Dog" style="max-width: 400px; border-radius: 8px;">`

    } catch(error){
    console.error(error);


    errorMessageElement.textContent = "Failed to load data. Please try again later.";
    errorMessageElement.style.color = "red";
    }
    

}

fetchRandomDogPictureButton.addEventListener("click", randomDogImage);

//this function is used to display relevant breed information on the my_dogs.html page, first function is grab the info
/*
async function getBreedInfo(breedName) {
    const response = await fetch(`/searched-breed?q=${breedName}`);
    if (!response.ok) throw new Error("Failed to fetch breed");
    return response.json();
}
 */



/*
    catch(error){
        console.error(error);
        const errorMessageElement = document.getElementById("error-message");

        errorMessageElement.textContent = "Failed to load data. Please try again later.";
        errorMessageElement.style.color = "red";
    }
        


}
*/
/*getBreedInfo("beagle")
  .then(data => console.log(data))
  .catch(err => console.error(err));
*/ 
/*
async function sendBreedData() {
    try {
        const data = await getBreedInfo("husky");
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}  

sendBreedData();*/

/*async function fetchData(){

    try{


    }
}
    */

/*fetch("https://api.artic.edu/api/v1/artworks")
    .then(response => {

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        return response.json();
    })    
//.then(response => response.json())
    //.then(response => console.log(response)) will show in log
    .then(data => console.log(data))
    //.then(data => console.log(data)) // all data
    .catch(error => console.error(error));
    */