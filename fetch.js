const form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", event => {
    // stop the form submitting and reloading the page
    event.preventDefault();
    // clear out any previous results
    output.innerHTML = "";

    // get the value of the field with name="form_input"
    const formData = new FormData(event.target);
    const name = formData.get("form_input");

    // request data from corona.lmao API

    fetch(`https://corona.lmao.ninja/v2/countries/${name}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        // if we get a successful response
        .then(covid19Data => {
            const heading = document.createElement("h2");
            heading.textContent = covid19Data.country;

            const heading2 = document.createElement("h3");
            heading2.textContent = "Total Cases: " + covid19Data.cases;
            heading2.style.color = "#0000FF";
            const todayCases = document.createElement("h4");
            todayCases.textContent = "Today Cases:" + covid19Data.todayCases;
            const heading3 = document.createElement("h4");
            heading3.textContent = "Total Deaths:" + covid19Data.deaths;
            heading3.style.color = "#F5081E";
            const todayDeaths = document.createElement("h4");
            todayDeaths.textContent = "Today Deaths:" + covid19Data.todayDeaths;
            const recovered = document.createElement("h4");
            recovered.textContent = "Recovered:" + covid19Data.recovered;
            const critical = document.createElement("h4");
            critical.textContent = "Critical:" + " " + covid19Data.critical;


            const image = document.createElement("IMG");
            image.src = covid19Data.countryInfo.flag;
            //image.alt = "";

            output.appendChild(heading);
            output.appendChild(image);
            output.appendChild(heading2);
            output.appendChild(todayCases);
            output.appendChild(heading3);
            output.appendChild(todayDeaths);
            output.appendChild(recovered);
            output.appendChild(critical);

            //
        })
        // if the request is unsuccessful
        .catch(error => {
            console.log(error);
            if (error.message === "404") {
                output.textContent = `⚠️ Couldn't find "${name}"`;
            } else {
                output.textContent = "⚠️ Something went wrong";
            }
        });
});