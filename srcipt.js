const form = document.querySelector(".ip-form");

const mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(mymap);

/* L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap); */

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let input = e.target.elements[0].value;
    document.querySelector(".ip-address").textContent = input;
    ipLocation(input);
});

async function ipLocation (ip) {
    let local = await fetch(`http://ipwhois.app/json/${ip}`);
    let res = await local.json();
    geoLocation(res)
}


function geoLocation(geo) {
    let coords = [geo.latitude,geo.longitude];
    console.log(geo);
    L.marker(coords).addTo(mymap)
    mymap.flyTo(coords, 12);

    document.querySelector(".location").textContent = geo.region;
    document.querySelector(".timezone").textContent = geo.timezone_gmt;
    document.querySelector(".isp").textContent = geo.isp;
}