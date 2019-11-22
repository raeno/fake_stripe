class Element {
  mount(el) {
    let elementName = null;

    if (typeof el === "string") {
      elementName = el;
      el = document.querySelector(el);
    }

    if (elementName == null) {
      return;
    }

    let elementType = elementName.match(/stripe-(\w+)/)[1];
    let content = "";

    switch(elementType) {
      case 'ccn':
        content = '<input id="stripe-cardnumber" name="cardnumber" placeholder="cardnumber" size="16" type="text">'
        break;
      case 'exp':
        content =  '<input placeholder="exp-date" name="exp-date" size="6" type="text"></input>'
        break;
      case 'cvc':
        content = '<input placeholder="cvc" name="cvc" size="3" type="text">'
        break;
    }
    el.innerHTML = content;
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
        resolve({ paymentIntent: { id: 'pi_1Datp92eZvKYlo2C7NiRTpCG' } });
      })
    }
  };
};
