(() => {
  "use strict";

  // Existing GTM-P3KCJKKZ owns the Google tag and forwarding-number setup:
  // AW-18158652870 / Fk0SCJWpxJsdEMab3NJD (verified in the public container).
  // A separate Ads click-conversion label has not been supplied. Do not use
  // the website-call label here: a click is not a completed phone call.
  const clickConversionDestination = "";
  const measurementId = "G-3KDTMTF37R";
  const isLocalPreview = ["localhost", "127.0.0.1", "[::1]"].includes(
    location.hostname,
  );
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => {
      const placement = link.dataset.ctaLocation;
      const phoneNumber = "(574) 234-4117";
      // Preserve the existing site's GTM trigger and record placement data.
      window.dataLayer.push({
        event: "phone_call_click",
        cta_location: placement,
        phone_number: phoneNumber,
      });
      window.gtag("event", "phone_click", {
        send_to: measurementId,
        cta_location: placement,
        phone_number: phoneNumber,
        transport_type: "beacon",
      });
      if (
        !isLocalPreview &&
        /^AW-\d+\/[\w-]+$/.test(clickConversionDestination)
      ) {
        window.gtag("event", "conversion", {
          send_to: clickConversionDestination,
          cta_location: placement,
          transport_type: "beacon",
        });
      }
      // Never prevent navigation or delay a phone call for analytics.
    });
  });

  const mobile = window.matchMedia("(max-width: 767px)");
  const extraReviews = document.querySelector(".more-reviews");
  const reviewSummary = extraReviews.querySelector("summary");
  const syncReviews = () => {
    extraReviews.open = !mobile.matches;
  };
  syncReviews();
  mobile.addEventListener("change", syncReviews);
  extraReviews.addEventListener("toggle", () => {
    reviewSummary.textContent = extraReviews.open
      ? "Show fewer reviews"
      : "Read more reviews";
  });

  const stickyCall = document.getElementById("sticky-call");
  const heroCall = document.getElementById("hero-call");
  // Checking the bottom edge distinguishes scrolling past the CTA from
  // the CTA simply being below the viewport on an unusually short screen.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        stickyCall.hidden = entry.boundingClientRect.bottom > 0;
      },
      { threshold: [0, 1] },
    ).observe(heroCall);
  }

  const status = document.getElementById("hours-status");
  const updateHours = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Indiana/Indianapolis",
      weekday: "short",
      hour: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const weekday = parts.find((part) => part.type === "weekday").value;
    const hour = Number(parts.find((part) => part.type === "hour").value);
    status.hidden = !(
      ["Mon", "Tue", "Wed", "Thu"].includes(weekday) &&
      hour >= 8 &&
      hour < 17
    );
    // No after-hours voicemail claim until the practice confirms it.
  };
  updateHours();
  window.setInterval(updateHours, 60000);

  const map = document.getElementById("office-map");
  map.addEventListener("toggle", () => {
    const target = document.getElementById("map-content");
    if (!map.open || target.childElementCount) return;
    const frame = document.createElement("iframe");
    frame.title =
      "Map of Zent Family Dentistry at 3410 Douglas Road, South Bend";
    frame.src =
      "https://www.google.com/maps?q=Zent+Family+Dentistry+3410+Douglas+Rd+South+Bend+IN+46635&output=embed";
    frame.loading = "lazy";
    frame.referrerPolicy = "no-referrer-when-downgrade";
    target.appendChild(frame);
  });
})();
