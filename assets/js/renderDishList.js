function renderDishList() {
    const dishListUL = document.createElement('ul')
    dishListUL.innerHTML = ''
    dishListDiv.innerHTML = ''

    if (dishListFromLocalStorage.length === 0) {
        return
    }


    dishListFromLocalStorage.forEach((dish, i) => {
        const dishListEl = document.createElement('li')
        const dishBtn = document.createElement('button')
        dishBtn.classList = 'btn btn-info btn-block my-3 py-4'
        dishBtn.innerText = `${dish.restaurant}: ${dish.dish}`
        dishBtn.setAttribute('data-toggle', 'modal')
        dishBtn.setAttribute('data-target', '#modal' + i)
        dishBtn.addEventListener('click', () => {
            renderMenuModal(dish, i, 'dishlist')
        })

        dishListEl.append(dishBtn)
        dishListUL.append(dishListEl)
    })
    dishListDiv.append(dishListUL)
}