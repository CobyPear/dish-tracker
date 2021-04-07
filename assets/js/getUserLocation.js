const useMyLocationBtn = document.getElementById('use-my-loc')
const formEl = document.getElementById('zip-form')
let zip = document.getElementById('zip')

// When user clicks 'Use My Location', the API is called with the user's location data.
useMyLocationBtn.addEventListener('click',() => {
    if (navigator.geolocation) {
        if (!userFromLocalStorage.lat) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude
    
                let userLoc = {
                    lat: lat,
                    lon: lon,
                }
                localStorage.setItem('user', JSON.stringify(userLoc))
                userFromLocalStorage = JSON.parse(localStorage.getItem('user'))

                
                let data = API.getRestaurantsByGeo(lat, lon, 1)
                showRestaurants(data)
            })
        } else {
            let data = API.getRestaurantsByGeo(userFromLocalStorage.lat, userFromLocalStorage.lon, 1)
            showRestaurants(data)
        }
    } else {
        alert('Your browser does not support geolocation. \n\n Please search by zip code')
    }
})

// grab zipcode from form and set url, then callAPI
formEl.addEventListener('submit', e => {
    e.preventDefault()
    let zip = e.target[0].value
    let userZip = { zip: zip }
    localStorage.setItem('user', JSON.stringify(userZip))
    let data = API.getRestaurantsByZip(zip, 1)
    showRestaurants(data)
})
