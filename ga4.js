(function () {
  console.info("[tito][ga4]", "plugin loaded");
  window.dataLayer = window.dataLayer || [];
  function ga4() {
    dataLayer.push(arguments);
  }

  window.tito =
    window.tito ||
    function () {
      (tito.q = tito.q || []).push(arguments);
    };

  tito("on:registration:started", function (registration) {
    console.info("[tito][ga4]", "tracking registration started");
    const items = [];

    registration.line_items.forEach(function (item) {
      items.push({
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        item_category: registration.event.title,
        item_brand: registration.account.name,
        affiliation: registration.source,
      });
    });

    const eventData = {
      items: items,
      coupon: registration.discount_code,
      value: registration.total,
      currency: registration.currency,
    };

    ga4("event", "begin_checkout", eventData);
  });

  tito("on:registration:finished", function (registration) {
    console.info("[tito][ga4]", "tracking registration finished");
    const items = [];

    registration.line_items.forEach(function (item) {
      items.push({
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        category: registration.event.title,
        brand: registration.account.name,
        affiliation: registration.source,
      });
    });

    const eventData = {
      transaction_id: "T_12345",
      tax: registration.tax,
      coupon: registration.discount_code,
      transaction_id: registration.slug,
      value: registration.total,
      currency: registration.currency,
      items: items,
    };

    ga4("event", "purchase", eventData);
  });
})();
