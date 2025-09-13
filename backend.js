import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/searched-breed", async (req, res) => {
  const searchedBreed = req.query.q;
  try {
    const response = await fetch(
      `https://api.thedogapi.com/v1/breeds/search?q=${searchedBreed}`,
      {
        headers: { "x-api-key": process.env.DOG_API_KEY }
      }
    );
    const data = await response.json();

    if (data.length === 0) {
      return res.status(404).json({ error: "No breed found" });
    }

    // Map breeds and enrich only when needed
    const enrichedData = await Promise.all(
      data.map(async (breed) => {
        if (breed.image?.url) {
          // already has an image, so no need to fetch
          return breed;
        } else if (breed.reference_image_id) {
          // fetch image details only if missing
          try {
            const imageResponse = await fetch(
              `https://api.thedogapi.com/v1/images/${breed.reference_image_id}`,
              {
                headers: { "x-api-key": process.env.DOG_API_KEY }
              }
            );
            const imageData = await imageResponse.json();
            breed.image = imageData; // add full image info
          } catch (err) {
            console.warn(
              `Failed to fetch image for ${breed.name}: ${err.message}`
            );
          }
        }
        return breed;
      })
    );

    res.json(enrichedData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dog breed" });
  }
});



app.get("/random-breed", async (req, res) => {
  try {
    const response = await fetch("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api-key": process.env.DOG_API_KEY }
    });
    const data = await response.json();
     //the above returns all dog breeds -> to choose one, use Math.floor and
    //Math.random with data.length to choose a random breed

    const randomBreed = data[Math.floor(Math.random() * data.length)];
  
    res.json(randomBreed);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dog breed" });
  }
});  

/*random dog facts is a premium feature!
app.get("/random-facts", async (req, res) => {
  try {
    const response = await fetch("https://api.thedogapi.com/v1/facts?limit=1", {
      headers: { "x-api-key": process.env.DOG_API_KEY }
    });
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: "No facts found" });
    }

    res.json(data[0]);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dog facts" });
  }
});  
*/


app.get("/random-dog-picture", async (req, res) => {
  try {
    const response = await fetch("https://api.thedogapi.com/v1/images/search", {
      headers: { "x-api-key": process.env.DOG_API_KEY }
    });
    const data = await response.json();

  
    res.json(data);
    
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dog image" });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

