(function () {
  console.warn(
    "The Google Analytics plugin is deprecated. Please use the ga4 plugin instead.",
    "https://ti.to/docs/api/widget/#tito-widget-v2-plugins"
  );
  console.info("[tito][google_analytics]", "plugin loaded");

  window.ga =
    window.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = ga.l || +new Date();
  ga("require", "ec");

  window.tito =
    window.tito ||
    function () {
      (tito.q = tito.q || []).push(arguments);
    };

  tito("on:registration:started", function (registration) {
    console.info("[tito][google_analytics]", "tracking registration started");
    ga("set", "currencyCode", registration.currency);

    registration.line_items.forEach(function (item) {
      ga("ec:addProduct", {
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      });
      ga("ec:setAction", "add");
    });

    ga(
      "send",
      "pageview",
      `/tito/${registration.account.slug}/${registration.event.slug}/registrations/${registration.slug}`
    );
    ga("send", "event", "tito", "registration:started", "Started registering");
  });

  tito("on:registration:finished", function (registration) {
    console.info("[tito][google_analytics]", "tracking registration finished");
    ga("set", "currencyCode", registration.currency);

    registration.line_items.forEach(function (item) {
      ga("ec:addProduct", {
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        category: registration.event.title,
        brand: registration.account.name,
      });
    });

    ga("ec:setAction", "purchase", {
      id: registration.slug,
      revenue: registration.total,
      tax: registration.receipt.tax,
      coupon: registration.discount_code, // User added a coupon at checkout.
    });
    ga(
      "send",
      "pageview",
      `/tito/${registration.account.slug}/${registration.event.slug}/registrations/${registration}.slug`
    );
    ga(
      "send",
      "event",
      "tito",
      "registration:finished",
      "Registration finished"
    );
  });
})();
