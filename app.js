// showing navbar when click menu on mobile view

const mobile = document.querySelector(".menu-toggle");
const mobilelink = document.querySelector(".sidebar"); 

mobile.addEventListener("click", function(){
    console.log("button clicked");
    
    mobile.classList.toggle("is-active");
    mobilelink.classList.toggle("active")
})


// close menu when click

mobilelink.addEventListener("click", function() {
    const menuBar = document.querySelector(".is-active");
    if(window.innerWidth <= 768 && menuBar){
        mobile.classList.toggle("is-active");
        mobilelink.classList.toggle("active");
    }
    
})

// move the menu to right and lwft when click back and next

var step = 100;
var stepFilter = 60;
var scrolling = true;

$(".back").bind ("click", function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "-=" + step + "px"
    },300);
});
$(".next").bind ("click", function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "+=" + step + "px"
    },300);
});

// when click on  back and next menus

$(".back-menus").bind ("click", function(e){
    e.preventDefault();
    $(".filter-wrapper").animate({
        scrollLeft: "-=" + step + "px"
    },300);
});
$(".next-menus").bind ("click", function(e){
    e.preventDefault();
    $(".filter-wrapper").animate({
        scrollLeft: "+=" + step + "px"
    },300);
});


// for shopping cart popup

function toggleCartPopup() {

    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.toggle('active');
    
}

// for shoping cart close

function closeCart() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.remove('active');
    
}

// add to the cart button

// function addToCart(itemName, itemPrice){

//     const cartItems = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
//     const existingItem = Array.from(cartItems.getElementsByTagName('tr')).find(item=>cells[0].textContent===itemName);
//     if(existingItem){
//         const itemCount = parseFloat(existingItem.querySelector('.item-count').textContent)+1;
//         existingItem.querySelector('.item-count').textContent = itemCount;

//         const itemTotal = parseFloat(existingItem.querySelector('.item-total').textContent) + parseFloat(itemprice);
//         exixtingItem.querySelector('.item-total').textContent=itemTotal.toFixed(2);
//     }
//     else{

//         const newRow = carItems.insertRow();
//         newRow.innerHTML = `
//         <td>$(itemName)<td>
//          <td class = 'item-count'>1<td>
//           <td class = 'item-price'>$(itemPrice)<td>
//            <td class = 'item-total'>$(itemPrice)<td>
//         `;
//     }
// }

function addToCart(itemName, itemPrice) {
    const cartItems = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    const existingItem = Array.from(cartItems.getElementsByTagName('tr')).find(item => 
        item.cells[0].textContent === itemName
    );

    if (existingItem) {
        const itemCount = parseFloat(existingItem.querySelector('.item-count').textContent) + 1;
        existingItem.querySelector('.item-count').textContent = itemCount;

        const itemTotal = parseFloat(existingItem.querySelector('.item-total').textContent) + parseFloat(itemPrice);
        existingItem.querySelector('.item-total').textContent = itemTotal.toFixed(2);
    } else {
        const newRow = cartItems.insertRow();
        newRow.innerHTML = `
            <td>${itemName}</td>
            <td class='item-count'>1</td>
            <td class='item-price'>${itemPrice}</td>
            <td class='item-total'>${itemPrice}</td>
            <td><button class='delete-btn'>Delete</button></td>
        `;
    }
    updateCartCountAndTotal()  
    attachDeleteButtons();
}

// update cart count and total


function updateCartCountAndTotal() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.querySelectorAll('#cart-items tbody tr');

    let totalCount = 0;
    let total = 0;

    cartItems.forEach(item => {
        const itemCount = parseFloat(item.querySelector('.item-count').textContent) || 0;
        const itemTotal = parseFloat(item.querySelector('.item-total').textContent) || 0;

        totalCount += itemCount;
        total += itemTotal;
    });

    cartCount.textContent = totalCount;
    cartTotal.textContent = total.toFixed(2);
}

function attachDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.onclick = function () {
            const row = button.closest('tr'); // Get the row containing the button
            row.remove(); // Remove the row from the table
            updateCartCountAndTotal(); // Update cart count and total
        };
    });
}