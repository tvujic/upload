const wallet = { 
    name: 'Custom Handmade Buttero Wallet',
    price: 400,
    img1_url: "/pictures/product-images/wallet1.jpg",
    img2_url: "/pictures/product-images/wallet2.jpg"
};

const purse = {
    name: 'Purse',
    price: 800,
    img1_url: "/pictures/product-images/purse1.png",
    img2_url: "/pictures/product-images/purse2.png"
};

const keychain = {
    name: 'Keychain',
    price: 50,
    img1_url: "/pictures/product-images/keychain1.png",
    img2_url: "/pictures/product-images/keychain2.png"
};

const cardholder = {
    name: 'Cardholder',
    price: 80,
    img1_url: "/pictures/product-images/cardholder1.png",
    img2_url: "/pictures/product-images/cardholder2.png"
};

const cartItemsBox = document.getElementById('cart-items');


const cartButton=document.getElementById('cartIcon');   
cartButton.addEventListener("click", toggleCart);

const checkoutButton=document.getElementById('checkout-button');

//localStorage.clear();
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//console.log(localStorage)
if (window.location.href.includes('customazationPage')) {
    document.getElementById('add-to-cart-button').addEventListener('click', function() {
        //console.log(customProduct);
        
        addProductToCart(customProduct);
    });
}



const productsArray = [wallet, purse, keychain, cardholder];

const productsFrame=document.getElementById('productsFrame');
productsArray.forEach((productObject) =>{
    const product = document.getElementById('productBox').cloneNode(true);
    
    product.querySelector('#productName').textContent = productObject.name;
    product.querySelector('#productPrice').textContent = "$" + productObject.price;

    product.img1_url=productObject.img1_url;
    product.img2_url=productObject.img2_url;
    product.style.backgroundImage='url('+ product.img1_url + ')';
    
    product.addEventListener("mouseover", function() { changeProductImage(product); });
    product.addEventListener("mouseleave", function() { revertProductImage(product); });
    product.addEventListener("click", function() { addProductToCart(productObject); });
    productsFrame.appendChild(product);
    });

    
   

    function addProductToCart(product){
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        //console.log(JSON.parse(localStorage.getItem('cartItems')));
        displayCartItems();
    }

    function displayCartItems() {
        const price=document.getElementById('totalPrice');
        cartItemsBox.innerHTML = '';
        if(cartItems[0]==undefined){
            console.log('tu');
            const emptyCartText=document.createElement('p');
            emptyCartText.innerHTML='Cart is empty';
            cartItemsBox.appendChild(emptyCartText);
            price.innerHTML='';
            checkoutButton.innerHTML='Continue shopping';
            checkoutButton.href='';
            
        }
        else{
        let totalPrice=0; 
        checkoutButton.href='checkout.html'; 
        checkoutButton.innerHTML='Checkout';  
        cartItems.forEach(Item => {
            const cartItem = document.createElement('div');
            const cartItemPicture=document.createElement('img');
            const cartItemText=document.createElement('p');
            cartItemText.innerHTML = Item.name + ' - $' + Item.price;
            cartItemPicture.src=Item.img1_url;
            cartItem.classList.add('cartItem');
            
            const removeItemFromCartButton=document.createElement('i');
            removeItemFromCartButton.classList.add("fa-regular", "fa-trash-can");
            removeItemFromCartButton.id='removeFromCartButton';
            removeItemFromCartButton.addEventListener("click", function() { removeItemFromCart(cartItem,Item); });
            totalPrice=totalPrice+Item.price;

            cartItem.appendChild(cartItemPicture);
            cartItem.appendChild(cartItemText);
            cartItem.appendChild(removeItemFromCartButton);
            
            cartItemsBox.appendChild(cartItem);
            

        });
        
        price.innerHTML='Total: ' + totalPrice + '$';
    }
        const cart=document.getElementById('cart');
        cart.classList.remove('invisible');
        cart.classList.add('visible');
    }

    function removeItemFromCart(itemToRemove, product){
        const index = cartItems.findIndex(item => JSON.stringify(item) === JSON.stringify(product));
        if (index !== -1) {
            cartItems.splice(index, 1);
        }
        cartItemsBox.removeChild(itemToRemove);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
    }

    function toggleCart(){

        if (cart.classList.contains("visible")){
            const cart=document.getElementById('cart');
            cart.classList.remove('visible');
            cart.classList.add('invisible');
        }
        else {
            displayCartItems();
        }
        
        
    }

    function changeProductImage(product) {
        product.style.transition = "background-image 0.2s ease, transform 0.3s ease";
        product.style.transform = "scale(1.02)";
    
        setTimeout(function() {
            product.style.backgroundImage = 'url('+ product.img2_url + ')'; 
            product.style.transform = "scale(1)"; 
        }, 80);
    }

    function revertProductImage(product) {
        product.style.transition = "background-image 0.2s ease";
    
        setTimeout(function() {
            product.style.backgroundImage = 'url('+ product.img1_url +')'; 
        }, 80);
    }

    


