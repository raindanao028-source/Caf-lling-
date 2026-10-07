let cart = [];
let quantity = 0;
let total = 0;

let customMenu =
    JSON.parse(localStorage.getItem("cafellingMenu")) || {};
let totalOrders = 0;
let itemsSold = 0;
let totalSales = 0;

function addToCart(itemName = "") {

    let price = 0;

    if (itemName === "Americano") {
        price = 80;

    } else if (itemName === "Café Latte") {
        price = 90;

    } else if (itemName === "Ice coffee") {
        price = 85;

    } else if (itemName === "Chocolate Croissant") {
        price = 75;

    } else if (itemName === "Cheese Bread") {
        price = 60;

    } else if (itemName === "Cinnamon Roll") {
        price = 70;

    } else if (customMenu[itemName]) {

        if (!customMenu[itemName].stock) {
            alert(itemName + " is out of stock.");
            return;
        }

        price = customMenu[itemName].price;
    }

    let existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;

    } else {

        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(itemName + " added to cart!");
}




function addCafeLatte() {

    let sugar =
        document.querySelector('input[name="sugar"]:checked').value;

    let milk =
        document.querySelector('input[name="milk"]:checked').value;

    let extraEspresso =
        document.getElementById("extraEspresso").checked;

    let price = 90;

    if (extraEspresso) {
        price += 20;
    }

    let customization =
        " (" + sugar + ", " + milk;

    if (extraEspresso) {
        customization += ", Extra Espresso";
    }

    customization += ")";

    let itemName =
        "Café Latte" + customization;

    let existingItem =
        cart.find(item => item.name === itemName);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(itemName + " added to cart!");
}




function updateCart() {

    let cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    quantity = 0;
    total = 0;

    cart.forEach((item, index) => {

        quantity += item.quantity;

        total +=
            item.price * item.quantity;

        cartItems.innerHTML += `
            <p>
                <strong>${item.name}</strong>
                - ₱${item.price}

                <button onclick="decreaseItem(${index})">
                    −
                </button>

                ${item.quantity}

                <button onclick="increaseItem(${index})">
                    +
                </button>

                <button onclick="removeItem(${index})">
                    🗑️
                </button>
            </p>
        `;
    });

    document.getElementById("cartQuantity").innerText =
        "Quantity: " + quantity;

    document.getElementById("cartTotal").innerText =
        total;

    if (cart.length === 0) {

        document.getElementById("cartMessage").innerText =
            "Your cart is empty.";

    } else {

        document.getElementById("cartMessage").innerText =
            "";
    }
}




function increaseItem(index) {

    cart[index].quantity++;

    updateCart();
}


function decreaseItem(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}




function checkout() {

    let customerName =
        document.getElementById("customerName").value;

    if (customerName === "") {

        alert("Please enter your name.");
        return;
    }

    if (quantity === 0) {

        alert("Your cart is empty.");
        return;
    }

    alert(
        "Thank you, " +
        customerName +
        "! Your total is ₱" +
        total
    );
}



function placeOrder() {

    let customerName =
        document.getElementById("customerName").value.trim();

    if (customerName === "") {
        alert("Please enter your name.");
        return;
    }

    if (cart.length === 0) {
        alert("Please add an item to your cart.");
        return;
    }

    let orderData = {
        customer: customerName,
        items: cart,
        quantity: quantity,
        total: total,
        status: "New Order"
    };

    let orders =
        JSON.parse(localStorage.getItem("cafellingOrders")) || [];

    orders.push(orderData);

    localStorage.setItem(
        "cafellingOrders",
        JSON.stringify(orders)
    );

    let itemsList = "";

    cart.forEach(function(item) {

        itemsList +=
            "<p>" +
            item.name +
            " × " +
            item.quantity +
            " = ₱" +
            (item.price * item.quantity) +
            "</p>";
    });

    document.getElementById("orderSummary").innerHTML =

        "<h3>✅ Order Confirmed!</h3>" +

        "<p><strong>Customer:</strong> " +
        customerName +
        "</p>" +

        "<p><strong>Items:</strong></p>" +

        itemsList +

        "<p><strong>Total:</strong> ₱" +
        total +
        "</p>" +

        "<p>Thank you for ordering at Cafélling! ☕</p>";

    alert("Order placed successfully!");
}

            
function clearCart() {

    cart = [];

    quantity = 0;

    total = 0;

    document.getElementById("cartItems").innerHTML = "";

    document.getElementById("cartMessage").innerText =
        "Your cart is empty.";

    document.getElementById("cartQuantity").innerText =
        "Quantity: 0";

    document.getElementById("cartTotal").innerText =
        "0";

    document.getElementById("orderSummary").innerHTML = "";

    document.getElementById("customerName").value = "";

    alert("Cart cleared!");
}




function addMenuItem() {

    let name =
        document.getElementById("newItemName").value;

    let price =
        Number(
            document.getElementById("newItemPrice").value
        );

    if (name === "" || price <= 0) {

        alert("Please enter item name and price.");
        return;
    }

    customMenu[name] = {

        price: price,

        stock: true
    };
localStorage.setItem(
    "cafellingMenu",
    JSON.stringify(customMenu)
);
    displayMenuManagement();

    document.getElementById("newItemName").value = "";

    document.getElementById("newItemPrice").value = "";

    alert(name + " added to menu!");
}




function displayMenuManagement() {

    let menuList =
        document.getElementById("menuList");

    menuList.innerHTML = "";

    for (let name in customMenu) {

        let item =
            customMenu[name];

        menuList.innerHTML +=

            "<p>" +

            "<strong>" +
            name +
            "</strong> - ₱" +
            item.price +

            " | " +

            (
                item.stock
                ? "🟢 In Stock"
                : "🔴 Out of Stock"
            ) +

            "<br>" +

            "<button onclick=\"editMenuItem('" +
            name +
            "')\">" +

            "✏️ Edit" +

            "</button> " +

            "<button onclick=\"deleteMenuItem('" +
            name +
            "')\">" +

            "🗑️ Delete" +

            "</button> " +

            "<button onclick=\"toggleStock('" +
            name +
            "')\">" +

            (
                item.stock
                ? "🔴 Out of Stock"
                : "🟢 In Stock"
            ) +

            "</button>" +

            "</p>";
    }
}




function editMenuItem(name) {

    let newPrice =
        prompt(
            "Enter new price:",
            customMenu[name].price
        );

    if (
        newPrice !== null &&
        Number(newPrice) > 0
    ) {
customMenu[name].price =
    Number(newPrice);

localStorage.setItem(
    "cafellingMenu",
    JSON.stringify(customMenu)
);

displayMenuManagement();
        
    }
}




function deleteMenuItem(name) {

    if (confirm("Delete " + name + "?")) {
delete customMenu[name];

localStorage.setItem(
    "cafellingMenu",
    JSON.stringify(customMenu)
);

displayMenuManagement();
        
    }
}



function toggleStock(name) {
customMenu[name].stock =
    !customMenu[name].stock;

localStorage.setItem(
    "cafellingMenu",
    JSON.stringify(customMenu)
);

displayMenuManagement();
  
}
function generateQR() {

    let tableNumber =
        document.getElementById("tableNumber").value;

    if (tableNumber === "") {
        alert("Please enter a table number.");
        return;
    }

    let qrContainer =
        document.getElementById("qrcode");

    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: window.location.href + "?table=" +
              encodeURIComponent(tableNumber),
        width: 200,
        height: 200
    });
}


function downloadQR() {

    let qr =
        document.querySelector("#qrcode canvas");

    if (!qr) {
        alert("Please generate the QR code first.");
        return;
    }

    let link =
        document.createElement("a");

    link.download = "CafeLLing-QR.png";

    link.href =
        qr.toDataURL("image/png");

    link.click();
}
function printQR() {

    let qr =
        document.getElementById("qrcode");

    if (qr.innerHTML === "") {
        alert("Please generate the QR code first.");
        return;
    }

    let printWindow =
        window.open("", "", "width=600,height=600");

    printWindow.document.write(`
        <html>
        <head>
            <title>Cafélling QR Code</title>
        </head>
        <body style="text-align:center;">
            <h2>Cafélling</h2>
            <p>Scan to view our menu</p>
            ${qr.innerHTML}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}