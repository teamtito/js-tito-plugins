(function () {
  console.info("[tito][trialfire]", "plugin loaded");

  tito("on:registration:started", function (data) {
    console.info("[tito][trialfire]", "tracking registration started");
    const tf_payload = {};
    //transform the Tito line items to Trialfire products
    tf_payload.products = data.line_items.map((t) => {
      return {
        id: t.price,
        sku: t.release_slug,
        name: t.title,
        price: t.price,
        quantity: t.quantity,
      };
    });
    if (window.Trialfire) {
      //fire the Track call
      Trialfire.track("Started Checkout", tf_payload);
    }
  });

  tito("on:registration:finished", function (data) {
    console.info("[tito][trialfire]", "tracking registration finished");
    // code here will be fired when the purchase completes
    const tf_payload = {};
    //transform the Tito line items to Trialfire products
    tf_payload.products = data.line_items.map((t) => {
      return {
        id: t.price,
        sku: t.release_slug,
        name: t.title,
        price: t.price,
        quantity: t.quantity,
      };
    });
    tf_payload.orderId = data.reference;
    tf_payload.total = data.receipt.total;
    tf_payload.tax = data.receipt.tax;
    tf_payload.coupon = data.discount_code;
    tf_payload.currency = data.currency;

    if (window.Trialfire) {
      //fire the Identify call
      Trialfire.identify(data.email, {
        email: data.email,
        name: data.name,
      });
      //fire the Track call
      Trialfire.track("Completed Order", tf_payload);
    }
  });
})();
