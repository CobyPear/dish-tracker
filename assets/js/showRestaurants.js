function showRestaurants(url) {
    const restaurantListFromStorage = JSON.parse(localStorage.getItem('restaurantList')) || null

    if (!restaurantListFromStorage) {
        console.log('trig')
        $.ajax({
            "url": url,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                "x-rapidapi-key": API_KEY
            }
        }).then(function (response) {
            console.log(response)
            var restaurantList = response.result.data
            console.log(restaurantList)
            localStorage.setItem('restaurantList', JSON.stringify(restaurantList))
    
            var restaurantListEl = $('<div>').addClass("container rest-list-div");
            for (let i = 0; i < restaurantList.length; i++) {
                var restaurantId = response.result.data[i].restaurant_id;
                
                var restaurantButtons = $("<button type='button' data-toggle='modal'>")
                    .text(restaurantList[i].restaurant_name)
                    .addClass("rest-button btn col btn-primary")
                    .attr({"data-target": "#restaurantModal" + i});
    
                // modal variables
                var restaurantAddress = response.result.data[i].address.formatted
                var restaurantPhone = response.result.data[i].restaurant_phone
                var restaurantPriceRange = response.result.data[i].price_range

                if (restaurantPriceRange === "") {
                    restaurantPriceRange="Unavailable"
                }
                var restaurantName = response.result.data[i].restaurant_name
                var modalDiv = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="restaurantModalLabel" aria-hidden="true">')
                    .attr("id", "restaurantModal" + i)
                var modalDialog = $('<div class="modal-dialog" role="document">')
                var modalContent = $('<div class="modal-content">')
                // modal header variables
                var modalHeader = $('<div class="modal-header">')
                var modalTitle = $('<h4 class="modal-title">')
                    .text(restaurantName)
    
                var modalCloseButton = $('<button class="modal-close btn btn-secondary" type="button" data-dismiss="modal" aria-label="Close">')
                    .add($('<span aria-hidden="true>'))
                    .text("X")

                // modal body variables
                var modalBody = $('<div class="modal-body">')
                var modalRestaurantAddress = $('<p class="modal-restaurant-address">')
                    .text(restaurantAddress)
                var modalRestaurantPhone = $('<p class="modal-restaurant-phone">')
                    .text(restaurantPhone)
                var modalRestaurantPriceRange = $('<p class="modal-restaurant-price-range">')
                    .text("Price range: " + restaurantPriceRange)

                // modal footer variables
                var modalFooter = $('<div class="modal modal-footer">')       
                var modalMenuButton = $('<button type="button" class="menu-button btn btn-primary modal-close" data-dismiss="modal">')
                    .text("Show me the menu!")
                    .attr({"value": restaurantId, "data-zomato": restaurantList[i].restaurant_name})
                    // .on('click', e => {
                    //     e.preventDefault()
                    //     window.open(zomatoMenuUrl(restaurantList[i].restaurant_name))
                    // })
    

                $('#restaurant-list').append(restaurantListEl);
                restaurantListEl.append(restaurantButtons, modalDiv);
                modalDiv.append(modalDialog);
                modalDialog.append(modalContent);
                modalBody.append(modalRestaurantAddress, modalRestaurantPhone, modalRestaurantPriceRange);
                modalHeader.append(modalTitle, modalCloseButton);
                modalFooter.append(modalMenuButton);
                modalContent.append(modalHeader, modalBody, modalFooter);
            };
            $('.menu-button').on('click', showDishes)
        });

    } else {

        var restaurantListEl = $('<div>').addClass("container rest-list-div");
        for (let i = 0; i < restaurantListFromStorage.length; i++) {
            var restaurantId = restaurantListFromStorage[i].restaurant_id;
            
            var restaurantButtons = $("<button type='button' data-toggle='modal'>")
                .text(restaurantListFromStorage[i].restaurant_name)
                .addClass("rest-button btn col btn-primary")
                .attr({"data-target": "#restaurantModal" + i});

            // modal variables
            var restaurantAddress = restaurantListFromStorage[i].address.formatted
            var restaurantPhone = restaurantListFromStorage[i].restaurant_phone
            var restaurantPriceRange = restaurantListFromStorage[i].price_range

            if (restaurantPriceRange === "") {
                restaurantPriceRange="Unavailable"
            }

            var restaurantName = restaurantListFromStorage[i].restaurant_name
            var modalDiv = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="restaurantModalLabel" aria-hidden="true">')
                .attr("id", "restaurantModal" + i)

            var modalDialog = $('<div class="modal-dialog" role="document">')
            var modalContent = $('<div class="modal-content">')
            // modal header variables
            var modalHeader = $('<div class="modal-header">')
            var modalTitle = $('<h4 class="modal-title">')
                .text(restaurantName)

            var modalCloseButton = $('<button class="modal-close btn btn-secondary" type="button" data-dismiss="modal" aria-label="Close">')
                .add($('<span aria-hidden="true>'))
                .text("X")

            // modal body variablesco
            var modalBody = $('<div class="modal-body">')
            var modalRestaurantAddress = $('<p class="modal-restaurant-address">')
                .text(restaurantAddress)
            var modalRestaurantPhone = $('<p class="modal-restaurant-phone">')
                .text(restaurantPhone)
            var modalRestaurantPriceRange = $('<p class="modal-restaurant-price-range">')
                .text("Price range: " + restaurantPriceRange)

            // modal footer variables
            var modalFooter = $('<div class="modal modal-footer">')       
            var modalMenuButton = $('<button type="button" class="menu-button btn btn-primary modal-close" data-dismiss="modal">')
                .text("Show me the menu!")
                .attr({"value": restaurantId, "data-zomato": restaurantListFromStorage[i].restaurant_name})
                // .on('click', e => {
                //     e.preventDefault()
                //     window.open(zomatoMenuUrl(restaurantListFromStorage[i].restaurant_name))
                // })


            $('#restaurant-list').append(restaurantListEl);
            restaurantListEl.append(restaurantButtons, modalDiv);
            modalDiv.append(modalDialog);
            modalDialog.append(modalContent);
            modalBody.append(modalRestaurantAddress, modalRestaurantPhone, modalRestaurantPriceRange);
            modalHeader.append(modalTitle, modalCloseButton);
            modalFooter.append(modalMenuButton);
            modalContent.append(modalHeader, modalBody, modalFooter);
        };
        $('.menu-button').on('click', showDishes)
    }
}