let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const discountCodes=["APPLY20"];

const checkoutItems= document.getElementById('checkout-items');
const priceAndGoToPaymentButton=document.getElementById('right-box');
const pricesBox=document.getElementById('price-box');
const price=document.getElementById('total-price');
const itemsPrice=document.getElementById('items-price');
const shippingPrice=document.getElementById('shipping-price');
const applyDiscountButton=document.getElementById('apply-discount-button');
const discountAmount=document.createElement('p');
applyDiscountButton.addEventListener("click", applyDiscount);
let totalPrice=0; 
let discountEntered=0;


printCheckoutItems();

document.addEventListener("DOMContentLoaded", function() {
    // Existing JavaScript code

    // PayPal Buttons Integration
    paypal.Buttons({
        style: {
            layout: 'vertical', // or 'horizontal'
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: totalPrice.toFixed(2), // Replace with the total amount of the cart
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: totalPrice.toFixed(2) // Replace with the total amount of items
                            },
                            shipping: {
                                currency_code: 'USD',
                                value: '0' // Replace with the shipping cost
                            },
                            tax_total: {
                                currency_code: 'USD',
                                value: '0.00' // Replace with the tax amount
                            }
                        }
                    },
                    items: cartItems.map(item => ({
                        name: item.name,
                        unit_amount: {
                            currency_code: 'USD',
                            value: item.price.toFixed(2) // Ensure this is a string
                        },
                        quantity: '1' // Ensure this is a string
                    }))
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                
                window.location.href = 'confirmation.html';
            });
        }
    }).render('#paypal-button-container');
});

function printCheckoutItems() {
    checkoutItems.innerHTML='';
    totalPrice=0;
    if(cartItems[0]==undefined){
        const noItemsText=document.createElement('p');
        noItemsText.innerHTML='Cart is empty.';
        checkoutItems.appendChild(noItemsText);
        price.innerHTML='';
        itemsPrice.innerHTML='';
        shippingPrice.innerHTML='';
        priceAndGoToPaymentButton.style.display='none';

    }
    else{
    
    cartItems.forEach(Item => {
        const checkoutItem = document.createElement('div');
        const checkoutItemInfoDiv=document.createElement('div');
        checkoutItemInfoDiv.classList.add('checkout-item-info-div');
        const checkoutItemInfo=document.createElement('p');
        const checkoutItemPrice=document.createElement('p');
        const partsText=document.createElement('h4');
        checkoutItemInfo.innerHTML= Item.name;
        checkoutItemPrice.innerHTML='$'+Item.price;
        const checkoutItemPicture=document.createElement('img');
        checkoutItemPicture.src=Item.img1_url;
        checkoutItem.classList.add('checkout-item');
        const removeFromCheckoutButton=document.createElement('i');
        removeFromCheckoutButton.classList.add("fa-regular", "fa-trash-can");
        removeFromCheckoutButton.id='removeFromCartButton';
        removeFromCheckoutButton.addEventListener("click", function() { removeFromCheckout(checkoutItem,Item); });
        totalPrice=totalPrice+Item.price;

        checkoutItemInfoDiv.appendChild(checkoutItemInfo);
        if (Item.name.includes('Custom')){
            
            Item.customizableParts.forEach((part) =>{
                part.subparts.forEach((subpart) =>{
                    if (!subpart.subPartName.includes('All')){
                        partsText.innerHTML+=subpart.subPartName + ' ' + part.name + ' - ' +subpart.pickedColor.name+ '<br>';
                    }
                })
            })
            checkoutItemInfoDiv.appendChild(partsText);
            checkoutItemInfoDiv.appendChild(checkoutItemPrice);
            console.log(Item);
        }
        else{
            checkoutItemInfoDiv.appendChild(checkoutItemPrice);
        }
        
        
        
        checkoutItem.appendChild(checkoutItemPicture);
        checkoutItem.appendChild(checkoutItemInfoDiv);
        checkoutItem.appendChild(removeFromCheckoutButton);

        
        checkoutItems.appendChild(checkoutItem);
        applyDiscount();
        
    });

    
    price.innerText='Total: ' + totalPrice + '$';
    itemsPrice.innerText=' Item total: ' + totalPrice + '$';
    shippingPrice.innerHTML='Shipping: 0$';

}
   
}

function removeFromCheckout(itemToRemove, product){
    const index = cartItems.findIndex(item => JSON.stringify(item) === JSON.stringify(product));
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    checkoutItems.removeChild(itemToRemove);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    totalPrice=totalPrice-product.price;
    printCheckoutItems();
}

function applyDiscount() {
    var inputElement = document.getElementById("discount-textbox");
    // Access the text entered into the input field using the value property
    var inputText = inputElement.value;
    // Display the text in the console (or do whatever you want with it)
    if(discountEntered==1){
        inputElement.placeholder="Discount already applied";
        inputElement.value = "";
        
    
        


    }
    
    else if ((discountCodes.includes(inputText) && discountAmount.innerHTML=='')){
        discountEntered=1;
        discountAmount.innerHTML="Discount: -" + (totalPrice*0.2) + "$";
        totalPrice=totalPrice-totalPrice*0.2;
        discountAmount.style.color="red";
        price.innerText="Total: " + (totalPrice) + "$";
        pricesBox.insertBefore(discountAmount,shippingPrice);
        inputElement.style.border="none";
        cartItems.forEach(Item => {
            Item.price=Item.price-Item.price*0.2;
        });
        
    }
    
    else if(discountCodes.includes(inputText)==false && inputText!=''){
        inputElement.placeholder="Invalid coupon";
        inputElement.value = "";
        inputElement.style.border="2px solid red";
    }
    
}
