function ensureRequestChangeUi() {
  if (document.getElementById('eodiRequestModal')) return;

  const footerNav = document.querySelector('.site-footer nav ul');
  const requestButton = document.createElement('button');
  requestButton.className = 'eodi-request-btn';
  requestButton.type = 'button';
  requestButton.setAttribute('data-eodi-open-request', '');
  requestButton.textContent = 'Request change';

  if (footerNav) {
    const item = document.createElement('li');
    item.appendChild(requestButton);
    footerNav.appendChild(item);
  } else {
    document.body.appendChild(requestButton);
  }

  document.body.insertAdjacentHTML(
    'beforeend',
    `
      <div class="eodi-modal" id="eodiRequestModal" aria-hidden="true">
        <div class="eodi-modal__backdrop" data-eodi-close-request></div>
        <div class="eodi-modal__panel" role="dialog" aria-modal="true" aria-labelledby="eodiRequestTitle">
          <div class="eodi-modal__header">
            <h2 id="eodiRequestTitle">Request a change</h2>
            <button class="eodi-modal__close" type="button" aria-label="Close" data-eodi-close-request>×</button>
          </div>
          <form id="eodiRequestForm">
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
            <div class="cf-turnstile" data-sitekey="REPLACE_WITH_TURNSTILE_SITE_KEY"></div>
            <div class="eodi-modal__actions">
              <button class="eodi-btn eodi-btn--primary" type="submit" id="eodiSubmitBtn">Submit</button>
              <button class="eodi-btn" type="button" data-eodi-close-request>Cancel</button>
            </div>
            <p class="eodi-status" id="eodiRequestStatus" aria-live="polite"></p>
            <p class="eodi-note">Thanks — submissions are reviewed monthly. <span data-eodi-reviewed-date></span></p>
          </form>
        </div>
      </div>
    `
  );

  if (!document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')) {
    const turnstileScript = document.createElement('script');
    turnstileScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    turnstileScript.async = true;
    turnstileScript.defer = true;
    document.body.appendChild(turnstileScript);
  }
}

function initRequestChangeModal() {
  const APPS_SCRIPT_URL = 'REPLACE_WITH_APPS_SCRIPT_URL';
  ensureRequestChangeUi();

  const modal = document.getElementById('eodiRequestModal');
  const form = document.getElementById('eodiRequestForm');
  const statusEl = document.getElementById('eodiRequestStatus');
  const submitBtn = document.getElementById('eodiSubmitBtn');
  const pageUrlInput = document.getElementById('eodiPageUrl');
  const pageTitleInput = document.getElementById('eodiPageTitle');
  const sectionSelect = document.getElementById('eodiSectionSelect');
  if (!modal || !form || !statusEl || !submitBtn || !pageUrlInput || !pageTitleInput || !sectionSelect) return;

  const openers = document.querySelectorAll('[data-eodi-open-request]');
  const closers = document.querySelectorAll('[data-eodi-close-request]');

  const setReviewedDate = () => {
    const now = new Date();
    const month = now.toLocaleString(undefined, { month: 'long' });
    const year = now.getFullYear();

    document.querySelectorAll('[data-eodi-reviewed-date]').forEach((el) => {
      el.textContent = `Reviewed and revised: ${month} ${year}`;
    });
  };

  const populateSectionDropdown = () => {
    const headings = Array.from(document.querySelectorAll('main h2, main h3, article h2, article h3'))
      .map((heading) => ({ text: heading.textContent?.trim() || '', id: heading.id || '' }))
      .filter((heading) => heading.text.length > 0);

    sectionSelect.innerHTML = '<option value="">Select a section…</option>';
    headings.forEach((heading) => {
      const option = document.createElement('option');
      option.value = heading.id ? `#${heading.id}` : heading.text;
      option.textContent = heading.text;
      sectionSelect.appendChild(option);
    });
  };

  const openModal = () => {
    statusEl.textContent = '';
    form.reset();
    pageUrlInput.value = window.location.href;
    pageTitleInput.value = document.title;
    populateSectionDropdown();
    setReviewedDate();
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openers.forEach((button) => button.addEventListener('click', openModal));
  closers.forEach((button) => button.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusEl.textContent = '';
    submitBtn.disabled = true;

    if (APPS_SCRIPT_URL === 'REPLACE_WITH_APPS_SCRIPT_URL') {
      statusEl.textContent = 'Submission endpoint is not configured yet.';
      submitBtn.disabled = false;
      return;
    }

    const formData = new FormData(form);
    if (!formData.get('cf-turnstile-response')) {
      statusEl.textContent = 'Please complete the verification step.';
      submitBtn.disabled = false;
      return;
    }

    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    payload.user_agent = navigator.userAgent;

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok !== true) {
        statusEl.textContent = data.message || 'Submission failed. Please try again.';
        submitBtn.disabled = false;
        return;
      }

      statusEl.textContent = 'Submitted. Thank you.';
      submitBtn.disabled = false;
      setTimeout(closeModal, 900);
    } catch (error) {
      statusEl.textContent = 'Network error. Please try again.';
      submitBtn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initRequestChangeModal();
});
