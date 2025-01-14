// Load cart items from localStorage and display them
let cart_items = JSON.parse(localStorage.getItem("cart")) || [];

let cartContainer = document.querySelector("#cart_items");

if (cart_items.length > 0) {
    cart_items.forEach((item, index) => { // Use index here
        let item_container = document.createElement("div");
        item_container.setAttribute("class", "item");

        let img = document.createElement("img");
        img.setAttribute("src", item.image);

        let category = document.createElement("p");
        category.innerText = item.category;

        let title = document.createElement("p");
        title.innerText = item.title;

        let brand = document.createElement("p");
        brand.innerText = item.brand;

        let price = document.createElement("h4");
        price.innerText = item.price;

        let btn = document.createElement("button");
        btn.setAttribute("class", "remove-cart");
        btn.innerText = "Remove from Cart";
        
        // Updated delete button logic to remove based on index
        btn.addEventListener("click", () => {
            cart_items.splice(index, 1); // Remove item at the given index
            localStorage.setItem("cart", JSON.stringify(cart_items)); // Update localStorage
            window.location.reload(); // Reload to reflect the change
        });

        item_container.append(img, category, title, brand, price, btn);
        cartContainer.append(item_container);
    });
} else {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
}

// Checkout button logic
document.querySelector("#checkout").addEventListener("click", () => {
    let name = document.querySelector("#name").value;
    let address = document.querySelector("#address").value;

    if (name !== "" && address !== "") {
        alert(`${name}, your order is successful`);
        localStorage.removeItem("cart"); // Clear the cart
        window.location.href = "index.html"; // Redirect back to homepage
    } else {
        alert("Please fill in your name and address.");
    }
});
