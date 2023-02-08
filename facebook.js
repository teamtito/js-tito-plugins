(function () {
  console.info("[tito][facebook]", "plugin loaded");
  if (!window.fbq)
    console.info(
      "[tito][facebook]",
      "unable to detect facebook object i.e. window.fbq"
    );

  tito("on:registration:started", function (registration) {
    console.info(
      "[tito][facebook]",
      "tracking registration started",
      registration
    );
    var num_items = 0;
    registration.line_items.forEach(function (line_item) {
      num_items = num_items + line_item.quantity;
      if (window.fbq) {
        fbq("track", "AddToCart", {
          content_type: "product",
          content_ids: [line_item.release_slug],
          content_name: line_item.title,
          value: line_item.price,
          currency: registration.currency,
        });
      }
    });
    if (window.fbq) {
      fbq("track", "InitiateCheckout", {
        value: registration.total,
        num_items: num_items,
        currency: registration.currency,
      });
    }
  });
  tito("on:registration:finished", function (registration) {
    console.info(
      "[tito][facebook]",
      "tracking registration finished",
      registration
    );
    var num_items = 0;
    var content_ids = [];
    registration.line_items.forEach(function (line_item) {
      num_items = num_items + line_item.quantity;
      content_ids.push(line_item.release_slug);
    });
    if (window.fbq) {
      fbq("track", "Purchase", {
        value: registration.total,
        content_name: registration.event.title,
        content_type: "product",
        content_ids: content_ids,
        num_items: num_items,
        currency: registration.currency,
      });
    }
  });
})();
