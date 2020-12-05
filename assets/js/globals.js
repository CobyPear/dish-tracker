const API_KEY = config.KEY

let storedDishes = JSON.parse(localStorage.getItem("Dish")) || []
let dishesFromLocalStorage = JSON.parse(localStorage.getItem('restaurantDishes')) || []
let userLatLonFromLocalStorage = localStorage.getItem('latLon') || []
let userZipFromLocalStorage = localStorage.getItem('zip') || []
let restaurantsFromLocalStorage = JSON.parse(localStorage.getItem('restaurants')) || []
let menusFromLocalStorage = JSON.parse(localStorage.getItem('menus')) || []
let dishListFromLocalStorage = JSON.parse(localStorage.getItem('dishlist')) || []

let usRestaurantMenuURL = JSON.parse(userLatLonFromLocalStorage)[2] || ''
let menuURL
let menuPage
let userPage
let currentRestMenu

const restaurantDiv = document.getElementById('rest-list')
const menuDiv = document.getElementById('menu-list')