const formEl = document.getElementById('zip-form')
let zip = document.getElementById('zip')

// grab zipcode from form and set url, then callAPI
formEl.addEventListener('submit', e => {
    e.preventDefault()
    usRestaurantMenuURL = `https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${zip.value}?page=1`
    let userZip = [zip.value, usRestaurantMenuURL]

    localStorage.setItem('zip', JSON.stringify(userZip))
    showRestaurants()

})

// IF USER CLICKS USE MY LOCATION, GET LOCATION AND SET URL, THEN callAPI
const useMyLocationBtn = document.getElementById('use-my-loc')

useMyLocationBtn.addEventListener('click', () => {

    if (userLatLonFromLocalStorage.length > 0) {
        usRestaurantMenuURL = JSON.parse(userLatLonFromLocalStorage)[2]
        showRestaurants()
    } else if (userLatLonFromLocalStorage.length === 0) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude

                usRestaurantMenuURL = `https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?lon=${lon}&lat=${lat}&distance=1&page=1`

                let userLocationInfo = [lat, lon, usRestaurantMenuURL]

                localStorage.setItem('latLon', JSON.stringify(userLocationInfo))
                showRestaurants()
            })
        } else {
            var modalDiv = $("<div>").addClass("open-moal show-modal").attr("id", 'modal1').text("Your browser does not support Geolocation data :(");
            $('body').append(modalDiv);
            modalDiv.toggle(".show-modal");
        }
    } else {
        if (userLatLonFromLocalStorage[2]) {
            console.log('test')
            showRestaurants()
        }
    }
})