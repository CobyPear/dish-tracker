// on load, ask for user's location data
window.addEventListener("load", getLocation);

const userLocationFromLocalStorage = localStorage.getItem('location') || []
let latlongUrl

if (userLocationFromLocalStorage.length > 0) {
    latlongUrl = JSON.parse(userLocationFromLocalStorage)[2] || ''
}
// get user's location data
function getLocation() {
    if (userLocationFromLocalStorage.length === 0) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition)
        } else {
            console.log('working')
            var modalDiv = $("<div>").addClass("open-moal show-modal").attr("id", 'modal1').text("Your browser does not support Geolocation data :(");
            $('body').append(modalDiv);
            modalDiv.toggle(".show-modal");
        }
    } else {
        if (latlongUrl) {
            showRestaurants(latlongUrl)
        }
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    latlongUrl = "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=1&lon=" + lon + "&lat=" + lat + "&distance=5"
    let userLocationInfo = [lat, lon, latlongUrl]
    localStorage.setItem('location', JSON.stringify(userLocationInfo))
};