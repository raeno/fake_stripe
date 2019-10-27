class Element {
  mount(el) {
    if (typeof el === "string") {
      el = document.querySelector(el);
    }

    el.innerHTML = `
      <input id="stripe-cardnumber" name="cardnumber" placeholder="cardnumber" size="16" type="text">
      <input placeholder="exp-date" name="exp-date" size="6" type="text">
      <input placeholder="cvc" name="cvc" size="3" type="text">
    `;
  }
}

window.Stripe = () => {
  const fetchLastFour = () => {
    return document.getElementById("stripe-cardnumber").value.substr(-4, 4);
  };

  return {
    elements: () => {
      return {
        create: (type, options) => new Element()
      };
    },

    createToken: card => {
      return new Promise(resolve => {
        resolve({ token: { id: "tok_123", card: { last4: fetchLastFour() } } });
      });
    },

    handleCardPayment: (token, card, paymentDetails) => {
      return new Promise(resolve => {
        resolve({ result: { paymentIntent: { id: 'payment_intent_123' } } });

      })
    }
  };
};
