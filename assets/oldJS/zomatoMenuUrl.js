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