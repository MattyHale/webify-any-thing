(() => {
  console.log("[EODI] request-change.js loaded");
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/XXXXX/exec";
  const TURNSTILE_SITE_KEY = "1x00000000000000000000AA";

  function isConfigured(value, type) {
    if (typeof value !== "string") return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    if (type === "appsScriptUrl") {
      return !trimmed.includes("XXXXX");
    }
    return true;
  }

  function getConfig() {
    const scriptEl = document.currentScript || document.querySelector('script[src$="/assets/request-change.js"]');
    const datasetUrl = scriptEl?.dataset?.appsScriptUrl;
    const datasetSiteKey = scriptEl?.dataset?.turnstileSiteKey;

    const globalConfig = window.EODI_REQUEST_CHANGE_CONFIG || {};
    const appsScriptUrl = globalConfig.appsScriptUrl || datasetUrl || APPS_SCRIPT_URL;
    const turnstileSiteKey = globalConfig.turnstileSiteKey || datasetSiteKey || TURNSTILE_SITE_KEY;

    return {
      appsScriptUrl,
      turnstileSiteKey,
      hasAppsScriptUrl: isConfigured(appsScriptUrl, "appsScriptUrl"),
      hasTurnstileSiteKey: isConfigured(turnstileSiteKey, "turnstileSiteKey"),
    };
  }

  function ensureTurnstileScript() {
    if (document.querySelector('script[src*="turnstile/v0/api.js"]')) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }

  function monthYear() {
    const now = new Date();
    const month = now.toLocaleString(undefined, { month: "long" });
    const year = now.getFullYear();
    return `${month} ${year}`;
  }

  function collectHeadings() {
    return Array.from(document.querySelectorAll("main h2, main h3, article h2, article h3"))
      .map(h => ({ text: h.textContent.trim(), id: h.id || "" }))
      .filter(x => x.text.length > 0);
  }

  function buildModalHTML(config) {
    const turnstileHtml = config.hasTurnstileSiteKey
      ? `
            <div class="eodi-verify">
              <div class="cf-turnstile" data-sitekey="${config.turnstileSiteKey}"></div>
              <p class="eodi-verify-hint" id="eodiVerifyHint">Verification is required to submit.</p>
            </div>
        `
      : "";

    return `
      <button class="eodi-request-btn" type="button" data-eodi-open-request>Request change</button>

      <div class="eodi-modal" id="eodiRequestModal" aria-hidden="true">
        <div class="eodi-modal__backdrop" data-eodi-close-request></div>

        <div class="eodi-modal__panel" role="dialog" aria-modal="true" aria-labelledby="eodiRequestTitle">
          <div class="eodi-modal__header">
            <h2 id="eodiRequestTitle">Request a change</h2>
            <button class="eodi-modal__close" type="button" aria-label="Close" data-eodi-close-request>×</button>
          </div>

          <form id="eodiRequestForm">
            <p class="eodi-status" id="eodiRequestStatus" aria-live="polite"></p>

            <input type="hidden" name="page_url" id="eodiPageUrl">
            <input type="hidden" name="page_title" id="eodiPageTitle">

            <label>
              Name
              <input name="name" type="text" autocomplete="name" required>
            </label>

            <label>
              Work email
              <input name="email" type="email" autocomplete="email" required>
            </label>

            <label>
              Organisation
              <input name="org" type="text" autocomplete="organization" required>
            </label>

            <label>
              Section (optional)
              <select name="section" id="eodiSectionSelect">
                <option value="">Select a section…</option>
              </select>
              <div class="eodi-help">If you can’t find it, leave blank and describe it below.</div>
            </label>

            <label>
              Type
              <select name="type" required>
                <option value="clarification">Clarification</option>
                <option value="correction">Correction</option>
                <option value="addition">Addition</option>
                <option value="reference">Reference</option>
              </select>
            </label>

            <label>
              Proposed change
              <textarea name="proposed_change" rows="5" required></textarea>
            </label>

            <label>
              Rationale
              <textarea name="rationale" rows="4" required></textarea>
            </label>

            ${turnstileHtml}

            <div class="eodi-modal__actions">
              <button class="eodi-btn eodi-btn--primary" type="submit" id="eodiSubmitBtn">Submit</button>
              <button class="eodi-btn" type="button" data-eodi-close-request>Cancel</button>
            </div>

            <p class="eodi-note">Thanks — submissions are reviewed monthly. <span data-eodi-reviewed-date></span></p>
          </form>
        </div>
      </div>
    `;
  }

  function attach(root, config) {
    const modal = root.querySelector("#eodiRequestModal");
    const form = root.querySelector("#eodiRequestForm");
    const statusEl = root.querySelector("#eodiRequestStatus");
    const submitBtn = root.querySelector("#eodiSubmitBtn");
    const pageUrlInput = root.querySelector("#eodiPageUrl");
    const pageTitleInput = root.querySelector("#eodiPageTitle");
    const sectionSelect = root.querySelector("#eodiSectionSelect");

    const openers = document.querySelectorAll("[data-eodi-open-request]");
    const closers = root.querySelectorAll("[data-eodi-close-request]");

    function populateSections() {
      const headings = collectHeadings();
      sectionSelect.innerHTML = '<option value="">Select a section…</option>';
      headings.forEach(h => {
        const opt = document.createElement("option");
        opt.value = h.id ? `#${h.id}` : h.text;
        opt.textContent = h.text;
        sectionSelect.appendChild(opt);
      });
    }

    function setReviewedLine() {
      root.querySelectorAll("[data-eodi-reviewed-date]").forEach(el => {
        el.textContent = monthYear();
      });
    }

    function openModal() {
      statusEl.textContent = "";
      statusEl.classList.remove("eodi-error");
      form.reset();

      pageUrlInput.value = window.location.href;
      pageTitleInput.value = document.title;

      populateSections();
      setReviewedLine();

      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        const widgetPresent = !!document.querySelector(".cf-turnstile iframe");
        const hint = document.getElementById("eodiVerifyHint");
        if (!widgetPresent && hint) {
          hint.textContent = "Verification widget did not load. Check blockers or replace the Turnstile site key.";
          hint.classList.add("eodi-error");
        }
      }, 800);
    }

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    openers.forEach(b => b.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    }));
    closers.forEach(b => b.addEventListener("click", closeModal));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      statusEl.textContent = "Submitting…";
      statusEl.classList.remove("eodi-error");
      statusEl.scrollIntoView({ behavior: "smooth", block: "center" });

      const formData = new FormData(form);
      const token = formData.get("cf-turnstile-response");

      if (!config.hasAppsScriptUrl) {
        statusEl.textContent = "Form submission is not configured yet. Please contact the site owner.";
        statusEl.classList.add("eodi-error");
        statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
        submitBtn.disabled = false;
        return;
      }

      if (!token) {
        statusEl.textContent = "Verification is missing. If you use an ad blocker, allow Turnstile and try again.";
        statusEl.classList.add("eodi-error");
        statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
        submitBtn.disabled = false;
        return;
      }

      statusEl.classList.remove("eodi-error");

      const payload = {};
      formData.forEach((v, k) => payload[k] = v);
      payload.user_agent = navigator.userAgent || "";

      try {
        const res = await fetch(config.appsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || data.ok !== true) {
          statusEl.textContent = data.message || "Submission failed. Please try again.";
          statusEl.classList.add("eodi-error");
          statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
          submitBtn.disabled = false;
          return;
        }

        statusEl.textContent = "Submitted. Thank you.";
        statusEl.classList.remove("eodi-error");
        statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
        submitBtn.disabled = false;

        setTimeout(closeModal, 900);

      } catch (err) {
        statusEl.textContent = "Network error. Please try again.";
        statusEl.classList.add("eodi-error");
        statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
        submitBtn.disabled = false;
      }
    });
  }

  function mount() {
    const config = getConfig();
    if (config.hasTurnstileSiteKey) {
      ensureTurnstileScript();
    }

    const mountPoint = document.createElement("div");
    mountPoint.id = "eodi-request-change-root";
    mountPoint.innerHTML = buildModalHTML(config);
    document.body.appendChild(mountPoint);
    document.documentElement.setAttribute("data-eodi-requestchange", "loaded");

    attach(mountPoint, config);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
