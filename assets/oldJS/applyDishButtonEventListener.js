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