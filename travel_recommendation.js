let travelData = null;


// Chargement des données JSON
fetch("travel_recommendation_api.json")
    .then(function(response) {
        if (!response.ok) {
            throw new Error(
                "Erreur lors du chargement du fichier JSON."
            );
        }

        return response.json();
    })
    .then(function(data) {
        travelData = data;

        console.log("Données récupérées :", travelData);
    })
    .catch(function(error) {
        console.error("Erreur :", error);
    });


// Normalise le mot recherché
function normalizeKeyword(keyword) {
    return keyword.toLowerCase().trim();
}


// Renvoie les recommandations correspondant au mot-clé
function getRecommendations(keyword) {
    const normalizedKeyword = normalizeKeyword(keyword);

    if (
        normalizedKeyword === "beach" ||
        normalizedKeyword === "beaches" ||
        normalizedKeyword === "plage" ||
        normalizedKeyword === "plages"
    ) {
        return travelData.beaches || [];
    }

    if (
        normalizedKeyword === "temple" ||
        normalizedKeyword === "temples"
    ) {
        return travelData.temples || [];
    }

    if (
        normalizedKeyword === "country" ||
        normalizedKeyword === "countries" ||
        normalizedKeyword === "pays"
    ) {
        return travelData.countries || [];
    }

    return [];
}


// Affiche les recommandations
function displayRecommendations(recommendations) {
    const resultsContainer = document.getElementById(
        "recommendationResults"
    );

    resultsContainer.innerHTML = "";

    if (recommendations.length === 0) {
        resultsContainer.innerHTML = `
            <p>
                Aucun résultat trouvé.
                Essayez : plage, temple ou pays.
            </p>
        `;

        return;
    }

    recommendations.forEach(function(place) {
        const card = document.createElement("article");
        card.className = "recommendation-card";

        const image = document.createElement("img");
        image.src = place.imageUrl;
        image.alt = place.name;

        const content = document.createElement("div");
        content.className = "recommendation-card-content";

        const title = document.createElement("h3");
        title.textContent = place.name;

        const description = document.createElement("p");
        description.textContent = place.description;

        content.appendChild(title);
        content.appendChild(description);

        card.appendChild(image);
        card.appendChild(content);

        resultsContainer.appendChild(card);
    });
}


// Recherche après le clic sur le bouton Search
document
    .getElementById("searchForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        if (!travelData) {
            alert("Les recommandations sont encore en cours de chargement.");
            return;
        }

        const keyword = document.getElementById("searchInput").value;

        const recommendations = getRecommendations(keyword);

        displayRecommendations(recommendations);
    });


// Bouton Reset
document
    .getElementById("resetButton")
    .addEventListener("click", function() {
        document.getElementById("searchInput").value = "";

        document.getElementById(
            "recommendationResults"
        ).innerHTML = `
            <p>
                Recherchez une plage, un temple ou un pays pour afficher
                les recommandations.
            </p>
        `;
    });


// Formulaire de contact
document
    .getElementById("contactForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        alert("Merci pour votre message !");

        document.getElementById("contactForm").reset();
    });
