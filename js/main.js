document.addEventListener("DOMContentLoaded", function() {
    
    //Finally got promises down. This bit grabs the URL and defines the program
    function myPromise(movieTitle) {
        const url = `http://www.omdbapi.com/?t=${movieTitle}&plot=full&apikey=92a79aed`;
        const theInfoSpot = document.getElementById("infoSpot");
        const newParagraph = document.createElement("p");
        const newH1 = document.createElement("h1");
        const newH2 = document.createElement("h2");

        const newFigure = document.createElement("figure");

        // Ugggggggh fetch requests
        fetch(url, { method: "GET" })
            .then(response => response.json())
            .then(giveResult => {
                console.log(giveResult);

                if (giveResult.Response === "True") {
                    const poster = document.createElement("img");
                    poster.src = giveResult.Poster

                    // This should add movie information to page
                    newH1.innerHTML = `${giveResult.Title}`;
                    newH2.innerHTML = `Release Year: ${giveResult.Year}`;
                    newParagraph.innerHTML = `${giveResult.Plot}`;


                    // I want this to append the poster and paragraph to the figure and infoSpot
                    newFigure.appendChild(poster);
                    newFigure.appendChild(newH1);
                    theInfoSpot.appendChild(newFigure);
                    theInfoSpot.appendChild(newParagraph);
                    theInfoSpot.appendChild(newH2);
                    for (x=0; x<giveResult.Ratings.length; x++) {
                        const newH3 = document.createElement("h3");
                        newH3.innerHTML = `${giveResult.Ratings[x].Source}: ${giveResult.Ratings[x].Value}`
                        theInfoSpot.appendChild(newH3);
                    }

                } else {
                    newParagraph.textContent = "No dragons flying this area.";
                    theInfoSpot.appendChild(newParagraph);
                }
            })
            .catch(error => {
                console.error("Fetch Error: ", error);
                newParagraph.textContent = "An error occurred while fetching the data.";
                theInfoSpot.appendChild(newParagraph);
            });
    }
    
    // This should execute the function, hopefully, probably
    const form = document.getElementById("movieLookup");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        for (const [key, value] of formData.entries()) {
            myPromise(value);
        }
        form.reset();
    });
});