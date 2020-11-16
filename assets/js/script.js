const API_KEY = config.KEY
var storedDishes = JSON.parse(localStorage.getItem("Dish")) || []
let dishesFromLocalStorage = JSON.parse(localStorage.getItem('restaurantDishes')) || []


function showDishes() {
    var q = $(this).attr("data-zomato");
    console.log(q)
    zomatoMenuUrl(q);
    let cached = false
    dishesFromLocalStorage.forEach(x => x.restaurant === q ? cached = true : cached = false)
    console.log(cached)
    // toggles Restaurant accordion to close and then Men accordion opens
    $("#collapseOne").toggle();
    $("#collapseThree").toggle();
    var urlId = $(this).val();

    var dishesUrl = "https://us-restaurant-menus.p.rapidapi.com/restaurant/" + urlId + "/menuitems?page=1"

    if (dishesFromLocalStorage.length === 0 || !cached) {
        $.ajax({
            url: dishesUrl,
            method: "GET",
            "headers": {
                "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
                "x-rapidapi-key": API_KEY
            }
        }).then(function(response) {
            console.log(response);
            var dishesList = response.result.data;
            // clears page to make way for menu items
            // $(".rest-button").remove();
            var dishesListEl = $("<div>").addClass("container menu-container");

            for (let i = 0; i < dishesList.length; i++) {
                var dishName = dishesList[i].menu_item_name;
                var restName = dishesList[i].restaurant_name;

                let obj = {
                    dish: dishName,
                    restaurant: restName
                }
                if (!dishesFromLocalStorage.includes(obj)) {
                    dishesFromLocalStorage.push(obj)
                    localStorage.setItem('restaurantDishes', JSON.stringify(dishesFromLocalStorage))
                }

                var dishButtons = $("<button>")
                    .text(dishName)
                    .addClass("row dish-button btn btn-primary btn-block")
                    .attr({ "value": dishName, "data-name": restName })
                    .click(applyDishButtonEventListener);

                $("#menu-section").append(dishesListEl);
                dishesListEl.append(dishButtons);

            };
        });
    } else {
        // clears page to make way for menu items
        // $(".rest-button").remove();
        var dishesListEl = $("<div>").addClass("container menu-container");

        let menu = dishesFromLocalStorage.filter(x => x.restaurant === q)
        console.log({menu})
        for (let i = 0; i < menu.length; i++) {
            var dishName = menu[i].dish;
            var restName = menu[i].restaurant;

            var dishButtons = $("<button>")
                .text(dishName)
                .addClass("row dish-button btn btn-primary btn-block")
                .attr({ "value": dishName, "data-name": restName })
                .click(applyDishButtonEventListener);

            $("#menu-section").append(dishesListEl);
            dishesListEl.append(dishButtons);

        }
    }
}

function zomatoMenuUrl(qname) {
    var zomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=826&entity_type=city&q=" + qname;

    $.ajax({
        url: zomatoUrl,
        method: "GET",
        "headers": {
            "user-key": "fd3179f7aa74b386fbac5aec3f13b934"
        }

    }).then(function(response) {
        var menuUrlLink = $("<a>")
            .addClass("zomato-link row text-center")
            .attr("href", response.restaurants[0].restaurant.menu_url)
            .text(qname + " " + "Menu via Zomato");

        // // appending menu url div to body
        $(".menu-container").prepend(menuUrlLink);
    });
};

function applyDishButtonEventListener() {

    var obj = {
        dish: $(this).val(),
        rest: $(this).attr("data-name")
    };

    console.log(storedDishes);
    storedDishes.push(obj);
    localStorage.setItem("Dish", JSON.stringify(storedDishes));
    renderLastDishListItem();
};

function renderLastDishListItem() {

    var lastItem = storedDishes.slice(-1)[0]
    console.log(lastItem)
    var dishListItem = $("<li>")
        .text(lastItem.rest + ": " + lastItem.dish)
        .addClass("dish-style");

    $("#dishlist").append(dishListItem);
};