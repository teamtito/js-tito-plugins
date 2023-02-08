(function () {
  console.warn(
    "The Google Analytics gtag plugin is deprecated. Please use the ga4 plugin instead.",
    "https://ti.to/docs/api/widget/#tito-widget-v2-plugins"
  );
  console.info("[tito][gtag]", "plugin loaded");
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  window.tito =
    window.tito ||
    function () {
      (tito.q = tito.q || []).push(arguments);
    };

  tito("on:registration:started", function (registration) {
    console.info("[tito][gtag]", "tracking registration started");
    const items = [];

    registration.line_items.forEach(function (item) {
      items.push({
        id: item.id,
        name: item.title,
        price: item.price,
        category: registration.event.title,
        brand: registration.account.name,
      });
    });

    const eventData = {
      items: items,
      coupon: registration.discount_code,
    };

    gtag("event", "begin_checkout", eventData);
  });

  tito("on:registration:finished", function (registration) {
    console.info("[tito][gtag]", "tracking registration finished");
    const items = [];

    registration.line_items.forEach(function (item) {
      items.push({
        id: item.id,
        name: item.title,
        price: item.price,
        category: registration.event.title,
        brand: registration.account.name,
      });
    });

    const eventData = {
      transaction_id: registration.slug,
      affiliation: registration.source,
      value: registration.total,
      currency: registration.currency,
      tax: registration.tax,
      items: items,
    };

    gtag("event", "purchase", eventData);
  });
})();
