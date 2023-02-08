(function () {
  console.warn(
    "The Google Tag Manager plugin is deprecated. Please use the ga4 plugin instead.",
    "https://ti.to/docs/api/widget/#tito-widget-v2-plugins"
  );
  console.info("[tito][gtm]", "plugin loaded");
  window.dataLayer = window.dataLayer || [];

  tito("on:widget:loaded", function (event) {});

  tito("on:registration:started", function (registration) {
    console.info("[tito][gtm]", "tracking registration started");
    const items = [];

    registration.line_items.forEach(function (item) {
      items.push({
        id: item.id,
        name: item.title,
        price: item.price,
        category: registration.event.title,
        brand: registration.account.name,
        quantity: item.quantity,
      });
    });

    const eventData = {
      items: items,
      coupon: registration.discount_code,
    };

    dataLayer.push({
      event: "tito:registration:started",
      ecommerce: {
        checkout: {
          actionField: { step: 1 },
          products: items,
        },
      },
    });
  });

  tito("on:registration:finished", function (registration) {
    console.info("[tito][gtm]", "tracking registration finished");
    const items = [];

    registration.line_items.forEach(function (item) {
      items.push({
        id: item.id,
        name: item.title,
        price: item.price,
        category: registration.event.title,
        brand: registration.account.name,
        quantity: item.quantity,
      });
    });

    const actionField = {
      id: registration.slug,
      affiliation: registration.source || "tito.js",
      revenue: registration.total,
    };

    if (registration.discount_code) {
      actionField.coupon = registration.discount_code;
    }
    if (registration.receipt && registration.receipt.tax) {
      actionField.tax = registration.receipt.tax;
    }

    dataLayer.push({
      event: "tito:registration:finished",
      ecommerce: {
        currencyCode: registration.currency,
        purchase: {
          actionField: actionField,
          products: items,
        },
      },
    });
  });
})();
