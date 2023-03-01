//Initialisation des variables Latitude et Longitude
let latitude = 48.85808672815468;
let longitude = 2.2948842885382748;

/*
 *  Initalisation de la map
 */
let map = L.map('map')
    .setView([latitude, longitude], 10,);
map.attributionControl=false;
map.zoomControl=false;

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}\'', {
    maxZoom: 5,
    minZoom: 5,
    attribution: '&copy; <a href="http://www.eni-ecole.fr">ENI ECOLE</a>'
}).addTo(map);

/*
 *  Initalisation du marker
 */
let myIcon = L.icon({
    iconUrl: 'image/iss.png',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [-3, -76]
});

let marker = L.marker([48.85808672815468, 2.2948842885382748], {icon: myIcon});
marker.addTo(map);
marker.dragging.disable();
marker.bindTooltip("my tooltip text").openTooltip();


/*
 *  Recuperation des données
 */
setInterval(

    ()=>{
        $.ajax({
            url: "http://api.open-notify.org/iss-now.json",
            method: "GET",
        }).done((donnees) => {
            latitude = donnees.iss_position.latitude;
            longitude = donnees.iss_position.longitude;
            $("#issPosition").text("Latitude = "+latitude + " | " + "Longitude = " + longitude);
            map.panTo([latitude, longitude]);
            marker.setLatLng([latitude, longitude]);
        })
/*
        $.ajax({
            url: "http://api.open-notify.org/astros.json",
            method: "GET",
        }).done((donnees) => {
            let people = donnees.people;
            for (let i = 0; i <people.length; i++) {
                $("#issPeople").text(people[i].craft);
            }
        })
*/
    }, 1000);


/*
 * Initalisation des particules
 */
window.onload = function () {
    Particles.init
    ({
        selector:
            '.background',
        color: ['#FFFFFF'],
        maxParticles: 1000,
        speed: 0.1
        //responsive: true
    });
};
