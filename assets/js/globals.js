const API_KEY = config.KEY

let storedDishes = JSON.parse(localStorage.getItem("Dish")) || []
let dishesFromLocalStorage = JSON.parse(localStorage.getItem('restaurantDishes')) || []
let userLatLonFromLocalStorage = localStorage.getItem('latLon') || []
let userZipFromLocalStorage = localStorage.getItem('zip') || []
let restaurantsFromLocalStorage = JSON.parse(localStorage.getItem('restaurants')) || []

let usRestaurantMenuURL = JSON.parse(userLatLonFromLocalStorage)[2] || ''
let userPage

const restaurantDiv = document.getElementById('rest-list')