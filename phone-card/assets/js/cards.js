/**
 * cards.js
 * 
 * Everything related to the card management will be done here. 
 * All the arrays, event listeners and functions shall be created here as long as 
 * they are realted to the the card management.
 * 
 * @author Practical IT
 * @author [Hanim, Million And Seble]
 */
let cards = {
  wallia: {
    title: 'Wallia',
    price: 25,
    minutes: 130,
    refillable: true
  },
  chellada: {
    title: 'Chellada',
    price: 20,
    minutes: 120,
    refillable: true
  },
  kebero: {
    title: 'Key Kebero',
    price: 10,
    minutes: 100,
    refillable: false
  }
};

let checkout = []; //array for checkedout cards.
let purchased = []; //array for the purchased cards
let email_subscribers = []; //array for the subscribers
let members = []; //array for the members

const buy_chellada_card = document.querySelector('#chellada');
const buy_wallia_card = document.querySelector('#wallia');
const buy_kebero_card = document.querySelector('#kebero');
const buy_button = document.querySelector('#buy_button');
let balance = 0;
const checkout_list = document.querySelector('#checkout_list');
const addBalance = document.querySelector('#add_balance');
const addMinutes = () => {
  const balance_addtion = document.querySelector('#add_balance_value').value;
  balance = parseInt(balance_addtion)+ parseInt(balance)
  document.querySelector('#balance_amount').innerHTML = balance;
}
const updateAddMinutes = () => {
  let markup = "<select class='form-control' id='add_balance_type'>";
  if (checkout.length > 0) {
    checkout.forEach(card => {
      if (cards[card.type].refillable) {
        markup += `<option value=${card.type}>${cards[card.type].title}</option>`
      }
    });
    markup += "</select>";
    markup += "<input type='number' min=1 value=1  id='add_balance_value'/><br/><br/>"
    markup += "<button type='button' onclick='addMinutes()' class='btn-submit'>Add Minutes</button>"
    addBalance.style.display = 'block';
    addBalance.innerHTML = markup;
  }
}
const updateCheckout = () => {
  //create a list to be shown on the checkout list.
  let checkout_table = "";
  let grand_total = 0;
  balance = 0;
  if (checkout.length > 0) {
    checkout.forEach(card => {
      let total = parseInt(cards[card.type].price) * parseInt(card.quantity);
      balance += parseInt(cards[card.type].minutes) * parseInt(card.quantity);
      grand_total += total;

      checkout_table += `<tr>
      <td>${card.type}</td>
      <td>${card.quantity}</td>
      <td>${cards[card.type].price}</td>
      <td>${total}</td>
    </tr>`;
    });
    checkout_table += `<tr>
      <td>Grand Total</td>
      <td></td>
      <td></td>
      <td>${grand_total}</td>
    </tr>`;
    checkout_list.innerHTML = checkout_table;
    document.querySelector('#checkout_count').innerHTML = checkout.length;
    document.querySelector('#balance_amount').innerHTML = balance;
  }
}

const chellada_quantity = document.querySelector('#chellada_quantity');
const wallia_quantity = document.querySelector('#wallia_quantity');
const kebero_quantity = document.querySelector('#kebero_quantity');

//initially the buttons are disabled. They will be back to active when the user selects quantity.
const quantitySelected = (event) => {
  //get the type of the card from the id itself

  let card_type = event.target.id.split('_')[0];//gives the "type_quantity" as an id
  document.querySelector(`#${card_type}`).disabled = true;

  const quantity = event.target.value;
  if (quantity) { //meaning the user has seleted the quantity of the card to be purchased.

    //now the user has selected the quantity, activate the button.
    console.log(document.querySelector(`#${card_type}`));
    document.querySelector(`#${card_type}`).disabled = false;
  }
}
chellada_quantity.addEventListener('change', (event) => quantitySelected(event));
wallia_quantity.addEventListener('change', (event) => quantitySelected(event));
kebero_quantity.addEventListener('change', (event) => quantitySelected(event));

//purchased object example {type: 'chellada', quantity: 2 }
const subscribe = () => {
  const email = document.querySelector("#subscriber_email").value;
  if (email.length)
    email_subscribers.push(email);
  console.log(email_subscribers);
}
const register = () => {
  const first_name = document.querySelector('#first_name').value;
  const last_name = document.querySelector('#last_name').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  members.push({ first_name, last_name, email, phone });
  console.log(members);

}

const addToCheckout = (type, quantity) => {
  console.log(this);
  //get valid card types
  let valid_types = Object.keys(cards);
  if (valid_types.includes(type)) {
    let card_value = quantity ? quantity : document.querySelector(`#${type}` + "_quantity").value;
    console.log(card_value);
    let other_items = checkout.filter((e) => e.type != type);
    //create the object for checkout here.
    let checkout_card = { type: type, quantity: card_value };
    checkout = [checkout_card, ...other_items]
    updateCheckout();
    updateAddMinutes();
  }
}
const addToCheckoutFromBuySection = () => {
  const card_type = document.querySelector('#buy_type').value;
  const quantity = document.querySelector('#buy_quantity').value;
  addToCheckout(card_type, quantity)
}
buy_chellada_card.addEventListener('click', () => addToCheckout('chellada'));
buy_wallia_card.addEventListener('click', () => addToCheckout('wallia'));
buy_kebero_card.addEventListener('click', () => addToCheckout('kebero'));
buy_button.addEventListener('click', () => addToCheckoutFromBuySection());
