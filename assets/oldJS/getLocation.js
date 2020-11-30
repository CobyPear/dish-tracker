// on load, ask for user's location data
window.addEventListener("load", getLocation);

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

