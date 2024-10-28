
const cart = [];

// sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('translate-x-full');
}

// cart count
function updateCartCount() {
    const count = cart.length;
    document.getElementById('cart-count').textContent = `${count}`;
    document.getElementById('cart-count-sidebar').textContent = `${count} Item`;
}

// total price
function calculateTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// cart items in sidebar
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 
    console.log(cart);
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('flex', 'justify-between', 'items-start','rounded-md', 'shadow-sm',  'bg-gray-50','px-2', 'pb-2', 'mb-2', 'relative', 'pt-4');

        cartItem.innerHTML = `
    <div class="flex items-start">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md mr-4 object-cover">
        <div class="flex flex-col justify-between space-y-1">
            <p class="font-semibold">${item.name}</p>
            <p class="">${item.eachPrice}</p>
            
            <div class="flex items-center space-x-2 mt-2">
                <button onclick="decreaseQuantity(${index})" class="px-2 py-1 text-lg font-bold text-orange-600 border border-orange-600 rounded-md hover:bg-orange-600 hover:text-white">-</button>
                <p class="font-semibold">${item.quantity}</p>
                <button onclick="increaseQuantity(${index})" class="px-2 py-1 text-lg font-bold text-orange-600 border border-orange-600 rounded-md hover:bg-orange-600 hover:text-white">+</button>
            </div>
        </div>
        <p class="text-lg font-semibold absolute bottom-0 right-0 p-2"><span>${item.price * item.quantity}</span>$</p>
    <button onclick="removeFromCart(${index})" class="absolute -top-3 -right-2 "><i class="fa-solid fa-trash bg-gray-100 rounded-md text-red-600 hover:bg-gray-300 p-2"></i></button>
    </div>
    
`;
        cartItemsContainer.appendChild(cartItem);
    });

    // display total price 
    const totalPrice = calculateTotalPrice();
    const totalPriceContainer = document.getElementById('total-price');
    totalPriceContainer.textContent = `Place Order: ${totalPrice}   $`;
}

// Add in the cart
function addToCart(name, price, eachPrice, image, button) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, eachPrice, image, quantity: 1 });
    }
    updateCartCount();
    renderCart();
    button.disabled = true; 
    button.classList.add('bg-gray-500'); 
    if (cart.length === 1) {
        toggleCart();
    } 
}

// delete item from cart
function removeFromCart(index) {
    const itemName = cart[index].name; 
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
   
    const button = document.getElementById(`add-to-cart-${itemName.toLowerCase().replace(/\s+/g, '-')}`);
    if (button) {
        button.disabled = false;
        button.classList.remove('bg-gray-500');
    }
    if (cart.length === 0) {
        toggleCart();
    }
}

//  item quantity plus
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCartCount();
    renderCart();
}

// item quantity quantity minus
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        updateCartCount();
        renderCart();
    } else {
        removeFromCart(index);
    }
}

