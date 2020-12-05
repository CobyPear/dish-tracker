function renderMenuModal(data, i, type) {

    const modal = document.createElement('div')
    modal.classList = 'modal fade'
    modal.id = 'modal' + i
    modal.setAttribute('tabindex', -1)
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-labeldby', 'menuModalLabel')
    modal.setAttribute('aria-hidden', 'true')

    const modalDialog = document.createElement('div')
    modalDialog.classList = 'modal-dialog'
    modal.setAttribute('role', 'document')

    const modalContent = document.createElement('div')
    modalContent.classList = 'modal-content'

    const modalHeader = document.createElement('div')
    modalHeader.classList = 'modal-header'
    const modalTitle = document.createElement('h1')
    modalTitle.classList = 'modal-title'
    if (type === 'menu') modalTitle.innerText = data.restaurant_name
    if (type === 'dishlist') modalTitle.innerText = data.restaurant

    const modalCloseBtn = document.createElement('div')
    modalCloseBtn.classList = 'modal-close btn btn-secondary'
    modalCloseBtn.setAttribute('type', 'button')
    modalCloseBtn.setAttribute('aria-label', 'Close')
    modalCloseBtn.dataset.dismiss = 'modal'
    modalCloseBtn.innerText = 'X'

    const modalBody = document.createElement('div')
    modalBody.classList = 'modal-body'

    const modalMenuItemName = document.createElement('h2')
    modalMenuItemName.innerText = data.menu_item_name
    if (type === 'menu') modalMenuItemName.innerText = data.menu_item_name
    if (type === 'dishlist') modalMenuItemName.innerText = data.dish
    const modalMenuItemDescription = document.createElement('p')
    modalMenuItemDescription.classList = 'p-1 my-2'
    if (type === 'menu') modalMenuItemDescription.innerText = data.menu_item_description
    if (type === 'dishlist') modalMenuItemDescription.innerText = data.description

    let modalBtn
    if (type === 'menu') {
        modalBtn = document.createElement('button')
        modalBtn.classList = 'btn btn-info btn-block py-2 mt-2'
        modalBtn.textContent = 'Add this to my Dish List!'
        modalBtn.dataset.dismiss = 'modal'
        modalBtn.addEventListener('click', () => {
            const newDish = {
                restaurant: data.restaurant_name,
                dish: data.menu_item_name,
                description: data.menu_item_description,
                dateAdded: new Date()
            }
            dishListFromLocalStorage.push(newDish)
            localStorage.setItem('dishlist', JSON.stringify(dishListFromLocalStorage))
            alert(`${data.menu_item_name} successfully added to your Dish List!`)
            renderDishList()
            location.href = '#dish-list'
        })
    }
    
    if (type === 'dishlist') {
        modalBtn = document.createElement('button')
        modalBtn.classList = 'btn btn-warning btn-block py-2 mt-2'
        modalBtn.id = data.dish
        modalBtn.textContent = 'Remove from my Dish List'
        modalBtn.dataset.dismiss = 'modal'
        modalBtn.addEventListener('click', e => {
            let foundDish = dishListFromLocalStorage.findIndex(x => x.dish === e.target.id)
            dishListFromLocalStorage.splice(foundDish, 1)
            
            localStorage.setItem('dishlist', JSON.stringify(dishListFromLocalStorage))
            alert(`${data.dish} successfully Removed to your Dish List!`)
            renderDishList()
            location.href = '#dish-list'
        })
    }

    modal.append(modalDialog)
    modalDialog.append(modalContent)
    modalBody.append(modalMenuItemName, modalMenuItemDescription, modalBtn)
    modalHeader.append(modalTitle, modalCloseBtn)
    modalContent.append(modalHeader, modalBody)
    menuDiv.append(modal)
}