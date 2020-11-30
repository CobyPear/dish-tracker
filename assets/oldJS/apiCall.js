async function apiCall() {
    $.ajax({
        "url": latlongUrl,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        }
    })
    console.log(data)
    return 
}