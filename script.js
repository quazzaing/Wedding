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
  var map = L.map("visit-map").setView([45.95659118864282, -0.6728437072001472], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var houseIcon = L.icon({
    iconUrl: 'Others/map-icons/house-solid-full.svg',
    iconSize: [38, 95],
});
  var churchIcon = L.icon({
    iconUrl: 'Others/map-icons/church-solid-full.svg',
    iconSize: [38, 95],
});

  L.marker([45.95659118864282, -0.6728437072001472], {icon: houseIcon}).addTo(map);
  L.marker([45.96617036696422, -0.7057373995208559], {icon: churchIcon}).addTo(map);



async function loadTourism() {
  const csvFile = "Others/updated_photos_with_ids.csv";

  const data = await d3.csv(csvFile);

  console.log(data);

  data.forEach((element) => {

    const container = document.createElement("div");
    container.className = "tourism-item";

    const title = document.createElement("h3");
    title.textContent = element.Title;

    const department = document.createElement("p");
    department.textContent = element.Department;

    const img = document.createElement("img");
    img.src = "Others/FrenchTourismPhotos/" + element.photoName;
    img.alt = element.Title || "Tourism Image";
    img.className = "tourism-image";

    container.appendChild(title);
    container.appendChild(department);
    container.appendChild(img);


    
    tourismImageDiv.appendChild(container);
  });


}
loadTourism();
