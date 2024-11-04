const get = (url) => import(url);
const productsContainer = document.getElementById("products");
const checkoutButton = document.getElementById("checkout");
let cart = [];
var apiToken = "Domo1302@?";

document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const checkoutButton = document.getElementById("checkout");
    let cart = [];

    
    fetch("http://localhost:8000/api/products", {
         method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiToken
    }}) .then(response => {
          // DID API CALL SUCCEED?
            if (!response.ok) {
             throw new Error('Network response was not ok');           
             }
            return response.json();
        }).then(products => {
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("col-md-4", "mb-4");
                productCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description || "No description available."}</p>
                            <p class="card-text"><strong>Price: $${product.price}</strong></p>
                            <button class="btn btn-primary add-to-cart" data-id="${product._id}">Add to Cart</button>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });
            // CATCH BLOCK

            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", () => {
                    const productId = button.getAttribute("data-id");
                    const product = products.find(p => p._id === productId);
                    cart.push(product);
                    checkoutButton.disabled = false;
                });
            });
        })
        


    checkoutButton.addEventListener("click", () => {
        const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
        checkoutModal.show();
    });

  
    document.getElementById("orderForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiToken
            },
            body: JSON.stringify({ name, email, cart })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            cart = [];
            checkoutButton.disabled = true;
            document.getElementById("checkoutModal").querySelector(".btn-close").click();
        })
        .catch(error => console.error("Greška prilikom slanja narudžbe:", error));
    });
});

function displayProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "mb-4");
        productCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description || "No description available."}</p>
                    <p class="card-text"><strong>Price: $${product.price}</strong></p>
                    <button class="btn btn-primary add-to-cart" data-id="${product._id}">Add to Cart</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            const product = products.find(p => p._id === productId);
            cart.push(product);
            checkoutButton.disabled = false;
        });
    });
}

checkoutButton.addEventListener("click", () => {
    const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
    checkoutModal.show();
});

document.getElementById("orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiToken
        },
        body: JSON.stringify({ name, email, cart })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Greška prilikom slanja narudžbe");
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        cart = [];
        checkoutButton.disabled = true;
        document.getElementById("checkoutModal").querySelector(".btn-close").click();
    })
    .catch(error => console.error("Greška prilikom slanja narudžbe:", error));
});