window.addEventListener('load', (e) => {
    console.log('loaded')
    showRestaurants(usRestaurantMenuURL)
    renderDishList()
})

toListBtn.addEventListener('click', () => {
    location.href = '#dish-list'
})