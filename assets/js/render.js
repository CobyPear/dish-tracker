async function showRestaurants() {
    try {
        const restaurantList = document.createElement('ul')
        restaurantList.text = ''
        restaurantDiv.innerHTML = ''

        let data, pages, page

        const response = await getRestaurants()
        console.log(response)
        data = await response.data
        pages = await response.pages
        page = await response.page


        await data.forEach(async restaurant => {
            const restEl = document.createElement('li')
            const restBtn = document.createElement('button')
            restBtn.classList = 'btn btn-primary btn-block my-3 py-4'
            restBtn.innerText = restaurant.restaurant_name
            restBtn.id = restaurant.restaurant_id.toString()
            restBtn.addEventListener('click', e => {
                currentRestMenu = e.target.id
                menuURL = `https://us-restaurant-menus.p.rapidapi.com/restaurant/${e.target.id}/menuitems?page=1`
                menuPage = 1
                showMenu()
                // var scrollDiv = document.getElementById("menu-list").offsetTop
                // window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
                location.href = '#menu-list'
            })
            restEl.append(restBtn)
            restaurantList.append(restEl)
        })

        showPageButtons(pages, page, 'restaurant')

        const backToTop = document.createElement('button')
        backToTop.addEventListener('click', () => {
            window.scrollTo(0, 0)
        })
        backToTop.classList = 'btn btn-warning py-3'
        backToTop.innerText = 'back to top'
        restaurantDiv.append(restaurantList, backToTop)

    } catch (error) {
        throw new Error(error.stack)
    }

}

async function showMenu() {
    try {
        const menuList = document.createElement('ul')
        menuList.text = ''
        menuDiv.innerHTML = ''

        let data, pages, page

        const response = await getMenu()
        console.log(response)
        data = await response.data
        pages = await response.pages
        page = await response.page

        await data.forEach(menuItem => {
            const menuEl = document.createElement('li')
            const menuBtn = document.createElement('button')
            menuBtn.classList = 'btn btn-success btn-block my-3 py-4'
            menuBtn.id = menuItem.menu_item_name
            menuBtn.dataset.restaurant = menuItem.restaurant_name
            menuBtn.innerText = menuItem.menu_item_name
            menuBtn.addEventListener('click', e => {
                console.log(e.target.id)
                console.log(e.target.dataset.restaurant)
                const newDish = {
                    restaurant: e.target.dataset.restaurant,
                    dish: e.target.id
                }
                dishListFromLocalStorage.push(newDish)

            })
            menuEl.append(menuBtn)
            menuList.append(menuEl)
        })

        showPageButtons(pages, page, 'menu')

        const backToTop = document.createElement('button')
        backToTop.addEventListener('click', () => {
            location.href = '#menu-list'
        })
        backToTop.classList = 'btn btn-warning py-3'
        backToTop.innerText = 'back to top of menu'
        menuDiv.append(menuList, backToTop)
    } catch (error) {
        throw new Error(error.stack)
    }
}