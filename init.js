window.onload = function() {

    const global = document.querySelector("#global");
    global.innerHTML = "";
    fetch(`https://corona.lmao.ninja/v2/all`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })

    // if we get a successful response
    .then(globalData => {
            const heading = document.createElement("h2");
            heading.textContent = "Live Global Covid-19 Stat";
            const cases = document.createElement("h3");
            cases.textContent = "Total Cases:" + globalData.cases;
            cases.style.color = "#0000FF";
            const todayCases = document.createElement("h4");
            todayCases.textContent = "Today Cases:" + globalData.todayCases;
            const deaths = document.createElement("h4");
            deaths.textContent = "Total Deaths:" + globalData.deaths;
            deaths.style.color = "#F5081E";
            const todayDeaths = document.createElement("h4");
            todayDeaths.textContent = "Today Deaths:" + globalData.todayDeaths;
            todayDeaths.style.color = "#F5081E";
            const recovered = document.createElement("h4");
            recovered.textContent = "Recovered:" + globalData.recovered;
            recovered.style.color = "#008000";
            const active = document.createElement("h4");
            active.textContent = "Active Cases:" + globalData.active;
            const critical = document.createElement("h4");
            critical.textContent = "Total Critical:" + globalData.critical;
            critical.style.color = "#FF5733";
            global.appendChild(heading);
            global.appendChild(cases);
            global.appendChild(todayCases);
            global.appendChild(deaths);
            global.appendChild(todayDeaths);
            global.appendChild(recovered);
            global.appendChild(active);
            global.appendChild(critical);

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



};