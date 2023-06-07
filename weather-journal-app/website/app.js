// Personal API Key for OpenWeatherMap API
const apiKey = "b0bd6799dfdb83ce066b5ebca296e91e";
const unit = "metric";

/* Global Variables */
// Get date from Date function
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();


const generatebtn = document.querySelector("#generate");

//get information from api and using it to update html
generatebtn.addEventListener("click", async function () {
  try {
    // select api elements
    const content = document.querySelector("#feelings").value;
console.log(content)

    const zipCode = document.querySelector("#zip").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zipCode}&units=${unit}`;

    // fetching url to get data
    const theURL = await fetch(url);
    const jsonData = await asynJSON(theURL);

    const cityName = jsonData.name;

    const tempDeg = jsonData.main.temp;

    // sending data to the server 

    await fetch("/postData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: newDate,
        name: cityName,
        temp: tempDeg,
        content: content,
      }),
    });

    // showing the final data to the client
    const theDATA = await fetch("/getData");
    const theJSONdata = await asynJSON(theDATA);

      dynamic(theJSONdata);
  } catch (err) {
    console.log("Error", err);
  }
});


function asynJSON(element) {
  return element.json();
}
console.log("1")

// dynamically update elements


function dynamic(res) {
  console.log(res)
  try {
    document.getElementById("date").innerHTML = "Date: " + res.date + "   ⌛";

    document.getElementById("temp").innerHTML =
      "Temperature: " + Math.round(res.temp) + " degrees   🌡️";
      
      
      const theCity = document.createElement("div");
      theCity.setAttribute("id", "name");

      document.getElementById("content").innerHTML =
        "Feeling: " + res.content + "  ✔";

    document.getElementById("entryHolder").appendChild(theCity);

    document.querySelector("#name").innerHTML = "City: " + res.name + "  🌏";

  } catch (error) {
    console.log("Error", error);
  }
}
