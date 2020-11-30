const API_KEY = config.KEY
let storedDishes = JSON.parse(localStorage.getItem("Dish")) || []
let dishesFromLocalStorage = JSON.parse(localStorage.getItem('restaurantDishes')) || []
let userLatLonFromLocalStorage = localStorage.getItem('latLon') || []
let userZipFromLocalStorage = localStorage.getItem('zip') || []
let url
let page = 1