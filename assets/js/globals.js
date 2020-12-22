// Locally Stored info
let storedDishes = JSON.parse(localStorage.getItem("Dish")) || []
let dishesFromLocalStorage = JSON.parse(localStorage.getItem('restaurantDishes')) || []
let userFromLocalStorage = JSON.parse(localStorage.getItem('user')) || []
let restaurantsFromLocalStorage = JSON.parse(localStorage.getItem('restaurants')) || []
let menusFromLocalStorage = JSON.parse(localStorage.getItem('menus')) || []
let dishListFromLocalStorage = JSON.parse(localStorage.getItem('dishlist')) || []

// HTML elements
const restaurantDiv = document.getElementById('rest-list')
const menuDiv = document.getElementById('menu-list')
const dishListDiv = document.getElementById('dish-list')
const toListBtn = document.getElementById('to-dish-list')

// Page variables
let menuPage
let userPage
let currentRestMenu