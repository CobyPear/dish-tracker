const formEl = document.getElementById('zip-form')
let zip = document.getElementById('zip')

// grab zipcode from form and set url, then callAPI
formEl.addEventListener('submit', e => {
    e.preventDefault()
    url = `https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${zip.value}?page=${page}`
    let userZip = [zip.value, url]

    localStorage.setItem('zip', JSON.stringify(userZip))

    callAPI()

})

// IF USER CLICKS USE MY LOCATION, GET LOCATION AND SET URL, THEN callAPI
const useMyLocationBtn = document.getElementById('use-my-loc')

useMyLocationBtn.addEventListener('click', () => {

    if (userLatLonFromLocalStorage.length > 0) {
        url = JSON.parse(userLatLonFromLocalStorage)[2]
        callAPI()
    } else if (userLatLonFromLocalStorage.length === 0) {
        if (navigator.geolocation) {
            console.log('else if, if')
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude

                url = `https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?lon=${lon}&lat=${lat}&distance=1&page=${page}`

                let userLocationInfo = [lat, lon, url]

                localStorage.setItem('latLon', JSON.stringify(userLocationInfo))
                callAPI()
            })
        } else {
            var modalDiv = $("<div>").addClass("open-moal show-modal").attr("id", 'modal1').text("Your browser does not support Geolocation data :(");
            $('body').append(modalDiv);
            modalDiv.toggle(".show-modal");
        }
    } else {
        if (userLatLonFromLocalStorage[2]) {
            console.log('test')
            callAPI()
        }
    }
})