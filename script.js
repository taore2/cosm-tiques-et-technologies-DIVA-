const products = [
    {
        id: 1,
        name: "Robe Élégance Noire",
        price: 25000,
        category: "vetement",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Sac à Main Luxe",
        price: 18000,
        category: "accessoire",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Escarpins Chics",
        price: 22000,
        category: "chaussure",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Ensemble Tailleur",
        price: 35000,
        category: "vetement",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Montre Dorée",
        price: 30000,
        category: "accessoire",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Sandales d'Été",
        price: 15000,
        category: "chaussure",
        image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Robe Rose Chic",
        price: 28000,
        category: "vetement",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Lunettes Élégantes",
        price: 12000,
        category: "accessoire",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Baskets Fashion",
        price: 20000,
        category: "chaussure",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "Chemise Blanche",
        price: 17000,
        category: "vetement",
        image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        name: "Sac à Main Noir",
        price: 22000,
        category: "accessoire",
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        name: "Talons Élégants",
        price: 25000,
        category: "chaussure",
        image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

function displayProducts(list) {
    const grid = document.getElementById("products");
    if (!grid) return;

    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = "<p style='text-align:center;grid-column:1/-1;'>Aucun produit trouvé.</p>";
        return;
    }

    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">

            <div class="product-info">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">
                        ${product.price.toLocaleString("fr-FR")} FCFA
                    </p>
                </div>

                <button class="btn-add" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

function filterCategory(category) {
    document.querySelectorAll(".cat-btn").forEach(button => {
        button.classList.remove("active");
    });

    if (event && event.target) {
        event.target.classList.add("active");
    }

    if (category === "all") {
        displayProducts(products);
    } else {
        displayProducts(
            products.filter(product => product.category === category)
        );
    }
}

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const text = this.value.toLowerCase().trim();

        displayProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(text)
            )
        );
    });
}

function toggleCart() {
    const sidebar = document.getElementById("cartSidebar");

    if (sidebar) {
        sidebar.classList.toggle("active");
    }
}

function addToCart(productId) {
    const product = products.find(product => product.id === productId);

    if (!product) return;

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();

    document.getElementById("cartSidebar").classList.add("active");
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById("cartItems");
    const count = document.getElementById("cartCount");
    const totalElement = document.getElementById("cartTotal");

    if (!container || !count || !totalElement) return;

    container.innerHTML = "";

    let total = 0;
    let quantityTotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <p style="text-align:center;padding:20px;">
                Votre panier est vide.
            </p>
        `;
    }

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;

        total += subtotal;
        quantityTotal += item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <h4>${item.name}</h4>

                <p>
                    ${item.price.toLocaleString("fr-FR")} FCFA
                </p>

                <div style="margin-top:8px;">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>

                    <strong style="margin:0 10px;">
                        ${item.quantity}
                    </strong>

                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>

                <p style="margin-top:5px;">
                    Sous-total :
                    ${subtotal.toLocaleString("fr-FR")} FCFA
                </p>
            </div>

            <button
                onclick="removeFromCart(${item.id})"
                style="background:none;border:none;color:red;cursor:pointer;"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        container.appendChild(div);
    });

    count.textContent = quantityTotal;
    totalElement.textContent = total.toLocaleString("fr-FR");
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    document.getElementById("cartSidebar").classList.remove("active");
    document.getElementById("checkoutModal").classList.add("active");
}

function closeCheckout() {
    document.getElementById("checkoutModal").classList.remove("active");
}

function submitOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    let message = "*NOUVELLE COMMANDE - DIVA*\n\n";

    message += `*Nom :* ${name}\n`;
    message += `*Téléphone :* ${phone}\n`;
    message += `*Adresse :* ${address}\n\n`;

    message += "*PRODUITS COMMANDÉS :*\n";

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        message += `• ${item.name}\n`;
        message += `  Quantité : ${item.quantity}\n`;
        message += `  Prix : ${subtotal.toLocaleString("fr-FR")} FCFA\n\n`;
    });

    message += `*TOTAL : ${total.toLocaleString("fr-FR")} FCFA*`;

    const whatsappNumber = "2250707307811";

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    closeCheckout();
}

displayProducts(products);
updateCartUI();
