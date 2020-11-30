function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    latlongUrl = "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?page=" + page + "&lon=" + lon + "&lat=" + lat + "&distance=5"
    localStorage.setItem('latLon', JSON.stringify(userLocationInfo))
};