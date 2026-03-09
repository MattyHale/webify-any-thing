(() => {
  console.log("[EODI] request-change.js loaded");

  function getConfig() {
    const globalConfig = window.EODI_REQUEST_CHANGE_CONFIG || {};
    // If no URL is provided via global config, use your default Apps Script endpoint.
    const defaultUrl =
      'https://script.google.com/macros/s/AKfycbyD-fQ_nTtjxCf_JR3cSOZVvQmqmZ5m3ZMgkoYzYHLO-ro__i0Yzxy3nW918ZNl5PvIng/exec';

    return {
      appsScriptUrl: globalConfig.appsScriptUrl || defaultUrl,
    };
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

  function buildModalHTML() {
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
      document.querySelectorAll("[data-eodi-reviewed-date]").forEach(el => {
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
    }

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    document.addEventListener("click", (event) => {
      const opener = event.target.closest("[data-eodi-open-request]");
      if (opener) {
        event.preventDefault();
        openModal();
        return;
      }

      const closer = event.target.closest("[data-eodi-close-request]");
      if (closer && modal.contains(closer)) {
        event.preventDefault();
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!config || !config.appsScriptUrl) {
        statusEl.textContent = "Submission endpoint not configured.";
        statusEl.classList.add("eodi-error");
        submitBtn.disabled = false;
        return;
      }

      submitBtn.disabled = true;
      statusEl.textContent = "Submitting…";
      statusEl.classList.remove("eodi-error");

      const formData = new FormData(form);
      const payload = {};
      formData.forEach((v, k) => (payload[k] = v));
      payload.user_agent = navigator.userAgent || "";

      const params = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => {
        params.append(k, String(v ?? ""));
      });

      try {
        await fetch(config.appsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: params.toString()
        });

        statusEl.textContent = "Thanks — request received.";
        statusEl.classList.remove("eodi-error");
        submitBtn.disabled = false;

        form.reset();

        setTimeout(() => {
          closeModal();
        }, 800);

      } catch (err) {
        statusEl.textContent = "Network error. Please try again.";
        statusEl.classList.add("eodi-error");
        submitBtn.disabled = false;
      }
    });
  }

  function mount() {
    const config = getConfig();

    const mountPoint = document.createElement("div");
    mountPoint.id = "eodi-request-change-root";
    mountPoint.innerHTML = buildModalHTML();
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
