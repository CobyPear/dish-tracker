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
            restEl.append(restBtn)
            restaurantList.append(restEl)
        })

        showPageButtons(pages, page)

        const backToTop = document.createElement('button')
        backToTop.addEventListener('click', ()=> {
            window.scrollTo(0, 0)
        })
        backToTop.classList = 'btn btn-warning py-3'
        backToTop.innerText = 'back to top'
        restaurantDiv.append(restaurantList, backToTop)

    } catch (error) {
        throw new Error(error.stack)
    }

}