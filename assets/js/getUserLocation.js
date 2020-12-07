const formEl = document.getElementById('zip-form')
let zip = document.getElementById('zip')

// grab zipcode from form and set url, then callAPI
formEl.addEventListener('submit', e => {
    e.preventDefault()
    usRestaurantMenuURL = `https://api.documenu.com/v2/restaurants/zip_code/${zip.value}?page=1`
    console.log(usRestaurantMenuURL)
    let userInfo = {
        zip: zip.value,
        url: usRestaurantMenuURL
    }

    localStorage.setItem('user', JSON.stringify(userInfo))
    showRestaurants()

})

// IF USER CLICKS USE MY LOCATION, GET LOCATION AND SET URL, THEN callAPI
const useMyLocationBtn = document.getElementById('use-my-loc')

useMyLocationBtn.addEventListener('click', () => {
    console.log(usRestaurantMenuURL)

    if (userFromLocalStorage.lat) {
        usRestaurantMenuURL = userFromLocalStorage.url
        showRestaurants()
    } else if (!userFromLocalStorage.lat) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude

                usRestaurantMenuURL = `https://api.documenu.com/v2/restaurants/search/geo?lat=${lat}&lon=${lon}&distance=1&page=1`

                let userInfo = {
                    lat: lat,
                    lon: lon,
                    url: usRestaurantMenuURL
                }

                localStorage.setItem('user', JSON.stringify(userInfo))
                showRestaurants()
            })
        } else {
            alert('Your browser does not support geolocation. Please search by Zip code')
        }
    } else {
        if (dishesFromLocalStorage.url) {
            console.log('test')
            showRestaurants()
        }
    }
})