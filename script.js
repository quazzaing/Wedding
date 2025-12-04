document.getElementById("rsvp-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const rsvpBool = document.querySelector(
    'input[name="rsvp-bool"]:checked'
  )?.value;
  formData.append("rsvpBool", rsvpBool);
  const url =
    "https://script.google.com/macros/s/AKfycbzGkK1DLXTvlutQ3mXHpwUzcH1iFGc49D43TqM0w4S9d_Nvw7asYPuVnwiDSOFFM23_nA/exec";
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (response.ok) alert("Message sent!");
  else alert("Error sending message");
});

const tourismImageDiv = document.getElementById("visit-places");

// const mapDiv = getElementById("visit-map");
var map = L.map("visit-map").setView(
  [45.95659118864282, -0.6728437072001472],
  9
);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var houseIcon = L.icon({
  iconUrl: "Others/map-icons/house-solid-full.svg",
  iconSize: [38, 95],
});
var churchIcon = L.icon({
  iconUrl: "Others/map-icons/church-solid-full.svg",
  iconSize: [38, 95],
});

L.marker([45.95659118864282, -0.6728437072001472], { icon: houseIcon }).addTo(
  map
).bindPopup("<h3>Poursay</h3>");
L.marker([45.96617036696422, -0.7057373995208559], { icon: churchIcon }).addTo(
  map
).bindPopup("<h3>Tonnay Boutonne Church</h3>");

const colorLookup = {
  "Adventurous/Sporty": "#03c700ff",
  "History & Culture": "#3547ebff",
  Foody: "#c02121ff",
  Relaxing: "#8fe7ffff",
};

async function loadTourism() {
  const csvFile = "Others/updated_photos_with_ids.csv";

  let data = await d3.csv(csvFile);

  data = data.map((d) => {
    [d.lat, d.lon] = d.Coordinates.split(",").map(Number);
    return d;
  });
  console.log(data);

  data.forEach((element) => {
    // const container = document.createElement("div");
    // const elementid = `element-${element.title}`
    // container.id = elementid
    // container.className = "tourism-item";

    // const title = document.createElement("h3");
    // title.textContent = element.Title;

    // const department = document.createElement("p");
    // department.textContent = element.Department;

    // const img = document.createElement("img");
    // img.src = "Others/FrenchTourismPhotos/" + element.photoName;
    // img.alt = element.Title || "Tourism Image";
    // img.className = "tourism-image";

    // container.appendChild(title);
    // container.appendChild(department);
    // container.appendChild(img);

    // tourismImageDiv.appendChild(container);
    const mapstring = `<div class='tourism-item'><h3><a href=${element.Link} target='_blank'>${element.Title}</h3><p>${element.Description}</p><img class='tourism-image' src="${'Others/FrenchTourismPhotos/' + element.photoName}"/> </a></div>`;

    let marker = L.circleMarker([element.lat, element.lon], {
      fillColor: colorLookup[element.Category],
      fillOpacity: 0.7,
      color: "grey", // or a colour if you want a border
      opacity: 0.5, // stroke opacity)
    })
      .addTo(map)
      .bindPopup(mapstring)
      .on("click", e=>{
          const el = document.querySelector(elementid);
          if (el) el.scrollIntoView({ behavior: "smooth" });
      });

    
  });
}
loadTourism();
