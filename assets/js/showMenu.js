async function showMenu(data) {
    try {
        // if (!data) return (console.log('No Menus found, please try again'))
        if (!data) return
        location.href = '#menu-list'
        const menuList = document.createElement('ul')
        menuList.textContent = ''
        menuDiv.innerHTML = ''
        
        // resolution of promise to menuData
        const menuData = await data

        // destructure menuData
        let { menu, page, totalPages } = menuData


        await menu.forEach((menuItem, i) => {
            const menuEl = document.createElement('li')
            const menuBtn = document.createElement('button')
            menuBtn.setAttribute('data-toggle', 'modal')
            menuBtn.setAttribute('data-target', '#modal' + i + 'menu')
            menuBtn.classList = 'btn btn-success btn-block my-3 py-4'
            menuBtn.id = menuItem.menu_item_name
            menuBtn.dataset.restaurant = menuItem.restaurant_name
            menuBtn.dataset.description = menuItem.menu_item_description
            menuBtn.innerText = menuItem.menu_item_name
            menuBtn.addEventListener('click', e => {
                renderModal(menuItem, i, 'menu')
            })
            menuEl.append(menuBtn)
            menuList.append(menuEl)
        })

        showPages(page, totalPages, 'menu')

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