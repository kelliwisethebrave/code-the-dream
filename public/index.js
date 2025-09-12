
const fetchButton = document.getElementById("fetchButton");

const dogContainer = document.getElementById("dogContainer");

const errorMessageElement = document.getElementById('error-message');


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
        
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("breed-cards");

        data.forEach(breed => {
            const card = document.createElement("div");
            card.classList.add("breed-info");

            const name = document.createElement("h3");
            name.textContent = breed.name;

            const temperament = document.createElement("p");
            temperament.textContent = "Temperament: " + breed.temperament || "No temperament info";

            const image = document.createElement("img");
            image.src = breed.image?.url || "No image available";
            image.alt = breed.name;

            card.appendChild(name);
            card.appendChild(temperament);
            card.appendChild(image);

            cardsContainer.appendChild(card);

            


        });

        resultsDiv.appendChild(cardsContainer); //needs to be outside of the above

        //const imageUrl = data[0].url;

        //dogContainer.innerHTML = `<img src="${imageUrl}" alt="Random Dog" style="max-width: 400px; border-radius: 8px;">`

        } catch(error){
        console.error(error);


        errorMessageElement.textContent = "Failed to load data. Please try again later.";
        errorMessageElement.style.color = "red";
    }
        


}

    
    

fetchButton.addEventListener("click", fetchDog);


