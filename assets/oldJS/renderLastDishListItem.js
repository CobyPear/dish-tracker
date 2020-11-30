function renderLastDishListItem() {

    var lastItem = storedDishes.slice(-1)[0]
    console.log(lastItem)
    var dishListItem = $("<li>")
        .text(lastItem.rest + ": " + lastItem.dish)
        .addClass("dish-style");

    $("#dishlist").append(dishListItem);
};