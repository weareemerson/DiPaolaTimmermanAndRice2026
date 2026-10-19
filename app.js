/* Renders content.js into the page. Routine edits belong in content.js. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;
  var cfg = S.config || {};

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function get(path) { return path.split(".").reduce(function (o, k) { return o ? o[k] : undefined; }, S); }
  var BASIS = {
    record: ["tag-record", "Public record"],
    campaign: ["tag-campaign", "Campaign-provided"],
    projection: ["tag-projection", "Projection"],
    proposal: ["tag-proposal", "Proposal"],
    priority: ["tag-campaign", "Next-term priority"]
  };
  // Source/status tags are turned off. Set SHOW_TAGS to true to bring them back.
  var SHOW_TAGS = false;
  function tag(basis) {
    var b = BASIS[basis]; return SHOW_TAGS && b ? '<span class="tag ' + b[0] + '">' + b[1] + "</span>" : "";
  }
  function setup(text) { return text ? '<p class="setup" data-setup>' + esc(text) + "</p>" : ""; }
  function link(l) {
    if (l.url) return '<a href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) + "</a>";
    return '<span class="pending">' + esc(l.label) + "<small>Link coming soon</small></span>";
  }
  function img(prefix, alt, sizes, small, large) {
    small = small || 800; large = large || 1600;
    var inl = window.__IMG; // single-file preview build only
    if (inl) {
      var k = prefix.split("/").pop() + "-" + large;
      return '<img src="' + (inl[k] || prefix + "-" + large + ".jpg") + '" loading="lazy" decoding="async" alt="' + esc(alt) + '">';
    }
    return '<img src="' + prefix + "-" + large + '.jpg" srcset="' + prefix + "-" + small + ".jpg " + small + "w, " +
      prefix + "-" + large + ".jpg " + large + 'w" sizes="' + sizes + '" loading="lazy" decoding="async" alt="' + esc(alt) + '">';
  }

  if (cfg.showSetupNotes) document.body.classList.add("show-setup");

  /* ---------- simple bindings ---------- */
  document.querySelectorAll("[data-bind]").forEach(function (el) { el.textContent = get(el.getAttribute("data-bind")) || ""; });

  /* ---------- vote ---------- */
  $("vote-steps").innerHTML = S.election.steps.map(function (s) {
    return '<li><h3>' + esc(s.title) + '</h3><p class="when">' + esc(s.when) + "</p><p>" + esc(s.text) + "</p></li>";
  }).join("");
  $("vote-links").innerHTML = S.election.links.map(function (l) { return "<li>" + link(l) + "</li>"; }).join("");

  /* ---------- candidates ---------- */
  $("cand-grid").innerHTML = S.candidates.map(function (c) {
    return '<article class="cand" id="cand-' + c.id + '">' +
      "<figure>" + img(c.photo, c.alt, "(min-width: 860px) 30vw, (min-width: 520px) 40vw, 100vw", 480, 960) + "</figure>" +
      "<div>" +
      '<p class="cand-office">' + esc(c.party) + " for " + esc(c.office === "Borough Council" ? "Council" : c.office) + "</p>" +
      "<h3>" + esc(c.name) + "</h3>" +
      '<p class="cand-title"><b>' + esc(c.title) + "</b></p>" +
      '<ul class="cand-roles">' + (c.highlights || []).map(function (h) {
        return "<li><b>" + esc(h.lead) + "</b>" + esc(h.text) + "</li>";
      }).join("") + "</ul>" +
      "</div></article>";
  }).join("");

  /* ---------- proof points ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function money(n) { return Math.round(n).toLocaleString("en-US"); }
  $("proof-grid").innerHTML = (S.proof || []).map(function (f) {
    var final = (f.prefix || "") + money(f.value) + (f.suffix || "");
    return '<li class="proof-item"><p class="proof-num" aria-label="' + esc(final) + '">' +
      '<span aria-hidden="true">' + esc(f.prefix || "") + '<span class="count" data-to="' + f.value + '">' +
      (reduceMotion ? money(f.value) : "0") + "</span>" + (f.suffix ? '<span class="proof-suffix">' + esc(f.suffix) + "</span>" : "") + "</span></p>" +
      '<p class="proof-label">' + esc(f.label) + "</p>" +
      '<p class="proof-kind">' + esc(f.kind) + " " + tag(f.basis) + "</p>" + setup(f.setup) + "</li>";
  }).join("");
  function countUp(el) {
    var to = +el.getAttribute("data-to"), t0 = null, dur = 1600;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = money(to * e);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- record ---------- */
  function taxChart() {
    var t = S.taxes;
    var bar = t.parts.map(function (p) {
      return '<span class="tone-' + p.tone + '" data-w="' + p.value + '" style="width:' + (reduceMotion ? p.value : 0) + '%" title="' + esc(p.label) + '">' + p.value + "%</span>";
    }).join("");
    var key = t.parts.map(function (p) {
      return '<li><i class="tone-' + p.tone + '"></i>' + esc(p.label) + " <b>" + p.value + "%</b></li>";
    }).join("");
    var desc = t.parts.map(function (p) { return p.label + " " + p.value + "%"; }).join(", ");
    return '<div class="taxchart"><h4>Where a ' + t.year + " Emerson tax dollar went " + tag(t.basis) + "</h4>" +
      '<div class="taxbar" role="img" aria-label="' + esc(t.year + " tax levy: " + desc) + '">' + bar + "</div>" +
      '<ul class="taxkey">' + key + "</ul>" +
      '<p class="fine">These are ' + t.year + " figures and may differ this year." +
      (t.sourceUrl ? ' <a href="' + esc(t.sourceUrl) + '" rel="noopener">Official tax rate sheet</a>' : "") + "</p>" +
      setup(t.sourceUrl ? "" : t.note) + "</div>";
  }
  function ledger() {
    return '<div class="ledger"><h4>Sharing with neighboring towns ' + tag("campaign") + "</h4>" +
      '<div class="table-scroll"><table><thead><tr><th scope="col">Arrangement</th><th scope="col">Savings</th></tr></thead><tbody>' +
      S.sharedServices.map(function (s) {
        return "<tr><td><b>" + esc(s.what) + "</b><span class=\"kind\">with " + esc(s.partner) + "</span>" + setup(s.setup) + "</td>" +
          '<td class="amt">' + esc(s.amount) + '<span class="kind">' + esc(s.kind) + "</span></td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<p class="fine">One-time purchase savings and yearly savings are different. They are not added together.</p></div>';
  }
  var flip = false;
  $("record-list").innerHTML = S.record.map(function (r) {
    var media = "";
    if (r.photo) {
      media = '<figure class="issue-media">' + img(r.photo, r.alt, "(min-width: 860px) 42vw, 100vw") +
        (r.caption ? "<figcaption>" + esc(r.caption) + "</figcaption>" : "") + "</figure>";
    } else if (r.slot && cfg.showSetupNotes) { // photo-needed slots show only in setup mode
      media = '<figure class="issue-media slot" role="img" aria-label="Photo placeholder: ' + esc(r.slot.subject) + '">' +
        '<span class="slot-label">Photo needed: ' + esc(r.slot.subject) + '</span><span class="slot-note">' + esc(r.slot.note) + "</span></figure>";
    }
    var cls = "issue" + (media ? "" : " text-only") + (r.slot && !r.photo ? " has-slot" : "") + (media && (flip = !flip) === false ? " flip" : "");
    var extras = (r.extras || []).map(function (x) { return x === "taxChart" ? taxChart() : x === "sharedServices" ? ledger() : ""; }).join("");
    var callout = r.callout ? '<div class="callout"><h4>' + esc(r.callout.label) + " " + tag(r.callout.basis) + "</h4><p>" + esc(r.callout.text) + "</p>" + setup(r.callout.setup) + "</div>" : "";
    var head = "<h3>" + esc(r.title) + '</h3><p class="lede">' + esc(r.lede) + "</p>";
    var text = r.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + callout + extras + setup(r.setup);
    var inner = media
      ? '<div class="issue-body">' + head + text + "</div>" + media
      : '<div class="issue-head">' + head + '</div><div class="issue-body issue-text">' + text + "</div>";
    return '<article class="' + cls + '" id="issue-' + r.id + '"><div class="wrap issue-grid">' + inner + "</div></article>";
  }).join("");

  /* ---------- status board ---------- */
  var COLS = [
    ["completed", "Completed", "Work that is finished or in effect."],
    ["progress", "In Progress", "Underway now."],
    ["anticipated", "Anticipated", "Expected milestones. Dates can change."],
    ["proposed", "Proposed or Under Consideration", "Ideas and plans, not yet in place."]
  ];
  $("status-board").innerHTML = COLS.map(function (c) {
    var items = S.status.filter(function (s) { return s.status === c[0]; });
    return '<div class="status-col"><h3><span class="dot dot-' + c[0] + '" aria-hidden="true"></span>' + c[1] + "</h3>" +
      '<p class="desc">' + c[2] + "</p><ul>" + items.map(function (s) {
        return '<li><span class="area">' + esc(s.area) + '</span><span class="item">' + esc(s.item) + "</span>" +
          (s.note ? '<span class="note">' + esc(s.note) + "</span>" : "") + setup(s.setup) + "</li>";
      }).join("") + "</ul></div>";
  }).join("");

  /* ---------- looking ahead ---------- */
  $("ahead-list").innerHTML = S.ahead.map(function (a) {
    return "<li><h3>" + esc(a.title) + " " + tag(a.basis || "priority") + "</h3><p>" + esc(a.text) + "</p>" +
      (a.list ? "<ul>" + a.list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
      (a.foot ? '<p class="ahead-foot">' + esc(a.foot) + "</p>" : "") + "</li>";
  }).join("");

  /* ---------- FAQ ---------- */
  var activeCat = "All";
  $("faq-cats").innerHTML = ["All"].concat(S.faqCategories).map(function (c) {
    return '<button type="button" class="chip" aria-pressed="' + (c === "All") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
  }).join("");
  $("faq-list").innerHTML = S.faq.map(function (f, i) {
    return '<details class="faq-item" id="faq-' + i + '" data-cat="' + esc(f.cat) + '"><summary><span class="cat">' + esc(f.cat) + "</span>" + esc(f.q) + "</summary>" +
      '<div class="faq-body"><p>' + esc(f.a) + (f.basis ? " " + tag(f.basis) : "") + "</p>" +
      (f.links ? "<ul>" + f.links.map(function (l) { return "<li>" + link(l) + "</li>"; }).join("") + "</ul>" : "") +
      setup(f.setup) + "</div></details>";
  }).join("") + '<p class="faq-empty" id="faq-empty" hidden>No questions match. Try another word, or <a href="#connect">ask the candidates directly</a>.</p>';

  var items = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  function filterFaq() {
    var q = $("faq-q").value.trim().toLowerCase(), shown = 0;
    items.forEach(function (el) {
      var okCat = activeCat === "All" || el.getAttribute("data-cat") === activeCat;
      var okQ = !q || el.textContent.toLowerCase().indexOf(q) > -1;
      el.hidden = !(okCat && okQ);
      if (!el.hidden) shown++;
      if (q && okQ && okCat) el.open = true;
    });
    $("faq-empty").hidden = shown > 0;
    $("faq-count").textContent = (q || activeCat !== "All") ? shown + (shown === 1 ? " question" : " questions") + " shown" : "";
  }
  $("faq-q").addEventListener("input", filterFaq);
  $("faq-cats").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    activeCat = b.getAttribute("data-cat");
    this.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    filterFaq();
  });

  /* ---------- sources ---------- */
  if ($("source-list")) $("source-list").innerHTML = S.sources.map(function (s) {
    return "<li>" + link(s) + '<span class="kind">' + esc(s.kind) + "</span></li>";
  }).join("");

  /* ---------- contact + footer ---------- */
  var c = cfg.contact || {}, contactHtml = "";
  if (c.email || c.phone || (cfg.social && cfg.social.length)) {
    contactHtml = '<div class="direct"><h3>Reach the campaign directly</h3>' +
      (c.email ? '<p><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></p>" : "") +
      (c.phone ? '<p><a href="tel:' + esc(c.phone.replace(/[^\d+]/g, "")) + '">' + esc(c.phone) + "</a></p>" : "") +
      (cfg.social || []).map(function (s) { return '<p><a href="' + esc(s.url) + '" rel="noopener">' + esc(s.label) + "</a></p>"; }).join("") + "</div>";
  }
  $("direct-contact").innerHTML = contactHtml || setup("Add a campaign email and phone number in content.js so residents have a direct way to reach you.");
  $("footer-contact").innerHTML = contactHtml || setup("Campaign contact details and social links go here.");
  $("disclaimer").innerHTML = esc(cfg.disclaimer) + (cfg.disclaimerAddress ? "<small>" + esc(cfg.disclaimerAddress) + "</small>" : "");

  /* ---------- header: menu, scroll state, active section ---------- */
  var header = document.querySelector(".site-header"), toggle = document.querySelector(".menu-toggle"), nav = $("site-nav");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); toggle.focus(); }
  });
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sectionMap = { results: "record", record: "record", progress: "record", faq: "faq", ahead: "ahead", candidates: "candidates", connect: "connect", vote: "top", sources: "faq" };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var key = sectionMap[en.target.id] || "top";
        navLinks.forEach(function (a) { a.setAttribute("aria-current", String(a.getAttribute("data-nav") === key && key !== "top")); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main > section[id]").forEach(function (s) { io.observe(s); });
    io.observe(document.querySelector(".hero"));
  }

  /* ---------- scroll-triggered numbers and bars ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var animIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; animIO.unobserve(el);
        if (el.classList.contains("count")) countUp(el);
        else el.querySelectorAll("[data-w]").forEach(function (b) { b.style.width = b.getAttribute("data-w") + "%"; });
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".count, .taxbar").forEach(function (el) { animIO.observe(el); });
  } else {
    document.querySelectorAll(".count").forEach(function (el) { el.textContent = money(+el.getAttribute("data-to")); });
    document.querySelectorAll(".taxbar [data-w]").forEach(function (b) { b.style.width = b.getAttribute("data-w") + "%"; });
  }

  /* ---------- floating Connect button ---------- */
  var floatCta = $("float-cta");
  if (floatCta && "IntersectionObserver" in window) {
    var pastHero = false, atConnect = false;
    function syncFloat() { floatCta.classList.toggle("show", pastHero && !atConnect); }
    new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; syncFloat(); }).observe(document.querySelector(".hero"));
    new IntersectionObserver(function (e) { atConnect = e[0].isIntersecting; syncFloat(); }, { rootMargin: "0px 0px -30% 0px" }).observe($("connect"));
  } else if (floatCta) { floatCta.classList.add("show"); }

  /* ---------- form ---------- */
  var form = $("request-form"), gf = cfg.googleForm || {};
  var configured = !!(gf.action && gf.entries && gf.entries.name);
  var errBox = $("form-error"), submit = $("form-submit");
  var embedMode = !configured && !!gf.viewUrl;
  if (embedMode) {
    var formUrl = gf.viewUrl.split("?")[0];
    var note = '<p class="form-fine embed-note">Submitting a request doesn’t reserve a specific time. Your information is used only by the campaign to respond, and submissions are never published.</p>';
    var open = '<a class="btn btn-primary btn-block" href="' + esc(formUrl) + '" target="_blank" rel="noopener">Open the request form</a>';
    form.hidden = true;
    var box = $("form-embed"); box.hidden = false;
    if (window.__PREVIEW) {
      // The private preview can't display embedded Google pages; the live site does.
      box.innerHTML = '<h3 class="embed-title">Request a conversation</h3>' +
        "<p>Share how to reach you, how you’d like to connect, and any question you have. The form opens in Google Forms.</p>" + note + open +
        '<p class="setup" data-setup>On the live site, the Google Form appears right here on the page. The preview can only link to it.</p>';
    } else {
      box.innerHTML = note +
        '<iframe class="gform" src="' + esc(formUrl) + '?embedded=true" title="Request a conversation with the candidates (Google Form)" ' +
        'style="height:' + (gf.embedHeight || 1650) + 'px" loading="lazy">Loading…</iframe>' +
        '<p class="form-alt">Trouble seeing the form? <a href="' + esc(formUrl) + '" target="_blank" rel="noopener">Open it in Google Forms</a>.</p>';
    }
  } else if (!configured) {
    submit.disabled = true;
    submit.textContent = "Online requests open soon";
    $("form-alt").innerHTML = c.email ? 'For now, email <a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>." : "";
  } else {
    var fs = $("form-setup"); if (fs) fs.remove();
    if (gf.viewUrl) $("form-alt").innerHTML = 'Having trouble? <a href="' + esc(gf.viewUrl) + '" rel="noopener" target="_blank">Open the form in Google Forms</a>.';
  }

  function fail(msg, field) {
    errBox.textContent = msg; errBox.hidden = false;
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  }
  form.addEventListener("input", function (e) { e.target.removeAttribute && e.target.removeAttribute("aria-invalid"); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errBox.hidden = true;
    var d = new FormData(form);
    var name = (d.get("name") || "").trim(), email = (d.get("email") || "").trim(), phone = (d.get("phone") || "").trim();
    if (!name) return fail("Enter your name so we know who to contact.", $("f-name"));
    if (!email && !phone) return fail("Enter an email address or a phone number so we can reach you.", $("f-email"));
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Check the email address. It should look like name@example.com.", $("f-email"));
    if (phone && phone.replace(/\D/g, "").length < 10) return fail("Check the phone number. Include the area code.", $("f-phone"));
    if (!configured) return fail("Online requests aren't open yet. Please check back soon.");

    // Build a real POST to Google Forms through a hidden iframe.
    var post = document.createElement("form");
    post.method = "POST"; post.action = gf.action; post.target = "gform-target"; post.hidden = true;
    Object.keys(gf.entries).forEach(function (k) {
      var id = gf.entries[k]; if (!id) return;
      var v = d.get(k); if (v == null || v === "") return;
      var inp = document.createElement("input"); inp.type = "hidden"; inp.name = id; inp.value = v; post.appendChild(inp);
    });
    document.body.appendChild(post);
    submit.disabled = true; submit.textContent = "Sending…";
    var done = false;
    $("gform-target").onload = function () {
      if (done) return; done = true;
      post.remove(); form.hidden = true; $("form-done").hidden = false; $("form-done").focus();
    };
    post.submit();
    setTimeout(function () {
      if (done) return; done = true; post.remove();
      submit.disabled = false; submit.textContent = "Send my request";
      fail("We couldn't confirm your request was sent. Please try again" + (gf.viewUrl ? ", or use the Google Forms link below." : "."));
    }, 12000);
  });
})();
