const API_KEY = config.KEY

let storedDishes = JSON.parse(localStorage.getItem("Dish")) || []
let dishesFromLocalStorage = JSON.parse(localStorage.getItem('restaurantDishes')) || []
let userFromLocalStorage = JSON.parse(localStorage.getItem('user')) || []
let restaurantsFromLocalStorage = JSON.parse(localStorage.getItem('restaurants')) || []
let menusFromLocalStorage = JSON.parse(localStorage.getItem('menus')) || []
let dishListFromLocalStorage = JSON.parse(localStorage.getItem('dishlist')) || []

let usRestaurantMenuURL = userFromLocalStorage.url && userFromLocalStorage.url || ''
let menuURL
let menuPage
let userPage
let currentRestMenu

const restaurantDiv = document.getElementById('rest-list')
const menuDiv = document.getElementById('menu-list')
const dishListDiv = document.getElementById('dish-list')
const toListBtn = document.getElementById('to-dish-list')