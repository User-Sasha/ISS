//Initialisation des données
let nom = "iss";
let infos;
let altitude = 0;
let vitesse = 0;
let latitude = 48.85808672815468;
let longitude = 2.2948842885382748;
let textNaute = $("#textNaute");
let astronaute = $("#austronautes");

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


/*
 *  Recuperation et affichage de la latitude et longtiude
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
            //marker.bindTooltip(personnePresente).openTooltip();
            //marker.bindTooltip(peopleInISS.toString()).openTooltip();
        })


    }, 1000);


/*
 *Recupération et affichage des infos de l'iss
 */
$.ajax({
    url: "https://api.wheretheiss.at/v1/satellites/25544",
    method: "GET",
}).done((donnees) => {
    nom = donnees.name;
    altitude = donnees.altitude;
    vitesse = donnees.velocity;
    map.panTo([latitude, longitude]);
    marker.setLatLng([latitude, longitude]);
    infos = "-Vaisseau : "+nom +"</br>-l'altitude est de : "+altitude + "</br>-la vitesse est de : "+vitesse+" km/h";
    marker.bindTooltip(infos, {
        interactive: true,
        permanent: false});
})


//affichage du text de naute
function hideText() {
    if (textNaute) {
        for (var x = 0; x < textNaute.length; x++) {
            textNaute[x].style.visibility = "hidden";
        }
    }
};
function showText(){
    if (textNaute) {
        textNaute[0].style.visibility = "visible";

    }
}

function textPopup() {
    $.ajax({
        url: "http://api.open-notify.org/astros.json",
        method: "GET",
    }).done((donnees) => {
        let peopleInSpace = donnees.people;
        let peopleInISS = [];
        for (let i = 0; i <peopleInSpace.length; i++) {
            if (peopleInSpace[i].craft === 'ISS'){
                peopleInISS.push(peopleInSpace[i].name);
            }
        }



        let string = peopleInISS.toString()
        //let inside = string.replaceAll(',', ' \n')
        let personnePresente = `Bonjour, je suis naute, les personnes présentes dans l'iss actuellement sont : ${string} et Naute`;
        textNaute.text(personnePresente);
        console.log(personnePresente);

    })
}

astronaute[0].addEventListener('click', () => {
    textNaute[0].style.visibility === 'visible' ? hideText() : showText();
})


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
