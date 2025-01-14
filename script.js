// This script handles the display and interaction with product data on the webpage

// When the page loads, hide the preloader 
window.addEventListener("load", function () {
    const loader = document.getElementById("preloader"); // Get the preloader element by ID
    loader.style.display = "none"; // Hide the preloader once the page is fully loaded
});


const mockData = {
    data: [
        { id: 1, image: "images/gym.webp", category: "Gymnastic", title: "Rings", brand: "Nike", price: "$129" },
        { id: 2, image: "images/gym2.webp", category: "Gymnastic", title: "Foam Mats", brand: "Nike", price: "$129" },
        { id: 3, image: "images/gym3.webp", category: "Gymnastic", title: "Ground Bars", brand: "Nike", price: "$129" },
        { id: 4, image: "images/gym6.jpg", category: "Calisthenic", title: "Dumbbells (Pair)", brand: "Rogue", price: "$69" },
        { id: 5, image: "images/gym4.webp", category: "Gymnastic", title: "Fit Square", brand: "Nike", price: "$129" },
        { id: 6, image: "images/gym7.png", category: "Calisthenic", title: "Parallel Bars", brand: "Adidas", price: "$99" },
    ]
};

// This function renders the product data to the page
let renderData = (data) => {
    const main_items_container = document.querySelector("#main_items"); // Select the container where products will be shown
    main_items_container.innerHTML = ""; // Clear previous product items

    // Loop through each product and create HTML elements to display it
    data.data.forEach(item => {
        let item_container = document.createElement("div"); // Create a container for each item
        item_container.setAttribute("class", "item card"); // Add class for styling

        // Create an image element and set its source
        let img = document.createElement("img");
        img.setAttribute("src", item.image);

        // Create paragraphs for category, title, and brand
        let category = document.createElement("p");
        category.innerText = item.category;

        let title = document.createElement("p");
        title.innerText = item.title;

        let brand = document.createElement("p");
        brand.innerText = item.brand;

        // Create a heading for the price
        let price = document.createElement("h4");
        price.innerText = item.price;

        // Create a button for adding the product to the cart
        let btn = document.createElement("button");
        btn.innerText = "Add to Cart"; // Button text
        btn.setAttribute("class", "add-to-cart"); // Add class for styling

        // Add event listener to the button to handle the cart interaction
        btn.addEventListener("click", () => {
            let cart_items = JSON.parse(localStorage.getItem("cart")) || []; // Get current cart from localStorage (or empty array if none)
            cart_items.push(item); // Add the selected product to the cart
            localStorage.setItem("cart", JSON.stringify(cart_items)); // Store the updated cart back to localStorage
            counter(); // Update the cart count displayed in the navbar
            window.alert(`${item.title} is added to cart`); // Show an alert confirming the product was added
        });

        // Append the created elements to the item container
        item_container.append(img, category, title, brand, price, btn);

        // Finally, append the item container to the main container
        main_items_container.append(item_container);
    });
};

// This function updates the cart count in the navbar
let counter = () => {
    let cart_count_container = document.querySelector("#cart_count"); // Select the element to display the cart count
    cart_count_container.innerText = JSON.parse(localStorage.getItem("cart"))?.length || 0; // Get the cart length from localStorage, or show 0 if empty
};

// This function filters the products based on the selected category
const filterProducts = (category) => {
    if (category === "All") {
        renderData(mockData); // Show all products if the 'All' category is selected
    } else {
        const filteredData = { data: mockData.data.filter(item => item.category === category) }; // Filter products by category
        renderData(filteredData); // Render the filtered products
    }
};

// Event listeners for the filter buttons that allow users to choose a category
document.getElementById("show-all").addEventListener("click", () => filterProducts("All"));
document.getElementById("gymnastic-btn").addEventListener("click", () => filterProducts("Gymnastic"));
document.getElementById("calisthenic-btn").addEventListener("click", () => filterProducts("Calisthenic"));

// Initial render of all products and update the cart count on page load
renderData(mockData);
counter();
