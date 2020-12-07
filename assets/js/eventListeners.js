window.addEventListener('load', (e) => {
    console.log('loaded')
    // if (usRestaurantMenuURL !== undefined) {
    //     showRestaurants(usRestaurantMenuURL)
    // }
    renderDishList()
})

toListBtn.addEventListener('click', () => {
    location.href = '#dish-list'
})