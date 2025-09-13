# code-the-dream
This project pulls data from the Dog API (https://thedogapi.com/).
On the **index** page you can search for dog breeds, and if the breed that is searched is in the API, you can view cards that show a picture of the breed, the temperament of the breed, and information about why the breed was created. On the **my dogs** pages, you can view information and photos of the breeds I have owned, along with information and photos of breeds from the API that are either similar breeds or were used to create the breed in question. On the **random** page, you can fetch a random photo from the API, and you can fetch a random breed from the API.


# how to view

To view in **any web browser**, you can visit https://paw-finder.up.railway.app/ where both the frontend and backend files are hosted and can be viewed **without any other steps**.

To view the project locally, follow these steps:

    1. Download the project from github at https://github.com/kelliwisethebrave/code-the-dream by clicking on the green Code button, and selecting "Download Zip."
    
    2. Unzip the files.
    
    3. Add a .env file to the main level of the folder, with the following:
    DOG_API_KEY=
    live_ugA9mhWiEbdiznzfflCkzpDIeiuzIUunr6BKMFo2PswXMuzu0PavOyLiYUnvJprZ

    Remove the line break between = and live.

    4. If you don't have Node.js installed already, install it by following the instructions here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
    
    5. Open your terminal, whether that is the terminal you use as a separate app or in a code editor/IDE like Visual Studio Code.

    6. In your terminal, navigate to the first level of the downloaded folder, where the file backend.js is located (for example, by using the command "cd code-the-dream" if your current location is the same folder that the downloaded and unzipped folder is). Depending on your operating system, you may be able to drag and drop the full file location.
    
    7. In your terminal, enter:
        node backend.js

        As a response, you should see something similar to the following in the terminal:
        [dotenv@17.2.2] injecting env (1) from .env -- tip: 📡 version env with Radar: https://dotenvx.com/radar
        Server running at http://localhost:3000

    8. In your web browser, go to localhost:3000, and you should be able to view the PawFinder website.



