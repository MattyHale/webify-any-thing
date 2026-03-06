const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';
  section.scrollIntoView({ behavior, block: 'start' });
}

function slugify(text, fallback = 'section') {
  const value = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  return value || fallback;
}

function ensureSectionAnchors(main) {
  const sectionsWithIds = Array.from(main.querySelectorAll('section[id]'));
  if (sectionsWithIds.length >= 3) return sectionsWithIds;

  const withIds = Array.from(main.querySelectorAll('section[id], h2[id]'));
  if (withIds.length >= 3) return withIds;

  const headings = Array.from(main.querySelectorAll('h2'));
  const seen = new Set(withIds.map((node) => node.id));

  headings.forEach((heading, index) => {
    if (heading.id) return;

    let id = slugify(heading.textContent, `section-${index + 1}`);
    let counter = 2;
    while (seen.has(id) || document.getElementById(id)) {
      id = `${id}-${counter}`;
      counter += 1;
    }

    heading.id = id;
    seen.add(id);
  });

  const normalized = Array.from(main.querySelectorAll('section[id]'));
  if (normalized.length >= 3) return normalized;

  return Array.from(main.querySelectorAll('section[id], h2[id]'));
}

function buildPageNavigator(main, sections) {
  if (sections.length < 3) return { links: [], nav: null };

  const nav = document.createElement('nav');
  nav.className = 'page-navigator';
  nav.setAttribute('aria-label', 'On this page');

  const title = document.createElement('h2');
  title.textContent = 'On this page';
  nav.appendChild(title);

  const list = document.createElement('ul');

  const seenIds = new Set();

  sections.forEach((section) => {
    if (!section.id || seenIds.has(section.id)) return;
    seenIds.add(section.id);

    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent =
      section.dataset.navLabel ||
      section.getAttribute('aria-label') ||
      section.querySelector('h2, h3')?.textContent?.trim() ||
      section.textContent?.trim().slice(0, 50) ||
      section.id;

    listItem.appendChild(link);
    list.appendChild(listItem);
  });

  nav.appendChild(list);
  return { links: Array.from(list.querySelectorAll('a')), nav };
}

function placePageNavigator(main, nav, isMobile) {
  if (!main || !nav) return;

  const hero = main.querySelector('.hero');

  if (isMobile && hero) {
    hero.insertAdjacentElement('afterend', nav);
    return;
  }

  main.prepend(nav);
}


document.addEventListener('DOMContentLoaded', () => {

  const disableToc = document.body?.dataset?.disableToc === "true";
  const isBlogIndex = location.pathname.endsWith("/blog.html");

  const scrollButtons = document.querySelectorAll('[data-scroll-target]');
  const scrollTopButton = document.querySelector('.scroll-top');
  const shareSections = document.querySelectorAll('.share-actions');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const buildArticleUrl = (id) => {
    const url = new URL(window.location.href);
    url.hash = id;
    return url.toString();
  };

  const showShareFeedback = (container, message) => {
    const feedback = container.querySelector('.share-feedback');
    if (!feedback) return;
    feedback.textContent = message;
    setTimeout(() => {
      feedback.textContent = '';
    }, 2500);
  };

  const copyToClipboard = async (text, container) => {
    try {
      await navigator.clipboard.writeText(text);
      showShareFeedback(container, 'Link copied');
    } catch (error) {
      showShareFeedback(container, 'Unable to copy link');
    }
  };

  const handleToggle = () => {
    if (!scrollTopButton) return;
    const shouldShow = window.scrollY > 240;
    scrollTopButton.classList.toggle('visible', shouldShow);
  };

  scrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-scroll-target');
      if (target) scrollToSection(target);
    });
  });

  if (scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  shareSections.forEach((section) => {
    const articleId = section.getAttribute('data-article-id');
    if (!articleId) return;

    const shareUrl = buildArticleUrl(articleId);

    const linkedInLink = section.querySelector('.linkedin-share');
    if (linkedInLink) {
      linkedInLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    }

    const copyButton = section.querySelector('.copy-link');
    if (copyButton) {
      copyButton.addEventListener('click', () => copyToClipboard(shareUrl, section));
    }
  });

  handleToggle();
  window.addEventListener('scroll', handleToggle, { passive: true });

  if (disableToc || isBlogIndex) return;

  if (observedSections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveNav(visible.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.1, 0.4, 0.7]
      }
    );

    observedSections.forEach((section) => observer.observe(section));
  }

  const main = document.querySelector('main');
  if (!main) return;

  const sectionTargets = ensureSectionAnchors(main)
    .filter((node) => node.id && !node.closest('.page-navigator'))
    .slice(0, 14);

  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const { links: pageNavLinks, nav: pageNavigator } = buildPageNavigator(main, sectionTargets);
  if (!pageNavLinks.length || !pageNavigator) return;

  const pageNavTitle = pageNavigator.querySelector('h2');
  const pageNavList = pageNavigator.querySelector('ul');

  const pageNavSeenLinks = new Set();
  pageNavLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    if (pageNavSeenLinks.has(href)) {
      link.closest('li')?.remove();
      return;
    }

    pageNavSeenLinks.add(href);
  });

  const uniqueLabelAnchors = new Set();
  pageNavigator.querySelectorAll('a[href^="#"]').forEach((link) => {
    const label = link.textContent?.trim().toLowerCase();
    if (!label) return;

    if (uniqueLabelAnchors.has(label)) {
      link.closest('li')?.remove();
      return;
    }

    uniqueLabelAnchors.add(label);
  });

  placePageNavigator(main, pageNavigator, mobileQuery.matches);

  if (pageNavTitle && pageNavList) {
    pageNavTitle.classList.add('page-navigator-toggle');
    pageNavTitle.tabIndex = 0;
    pageNavTitle.setAttribute('role', 'button');

    const setPageNavCollapsed = (collapsed) => {
      pageNavigator.classList.toggle('is-collapsed', collapsed);
      pageNavTitle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      pageNavList.hidden = collapsed;
    };

    const initPageNavState = () => {
      placePageNavigator(main, pageNavigator, mobileQuery.matches);
      setPageNavCollapsed(mobileQuery.matches);
    };

    pageNavTitle.addEventListener('click', () => {
      if (!mobileQuery.matches) return;
      const collapsed = pageNavigator.classList.contains('is-collapsed');
      setPageNavCollapsed(!collapsed);
    });

    pageNavTitle.addEventListener('keydown', (event) => {
      if (!mobileQuery.matches || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      const collapsed = pageNavigator.classList.contains('is-collapsed');
      setPageNavCollapsed(!collapsed);
    });

    mobileQuery.addEventListener('change', initPageNavState);
    initPageNavState();
  }

  const setActivePageLink = (id) => {
    pageNavLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const stepper = document.createElement('div');
  stepper.className = 'section-stepper';
  stepper.innerHTML = `
    <button type="button" class="stepper-button stepper-up" aria-label="Go to previous section">↑ Prev</button>
    <button type="button" class="stepper-button stepper-down" aria-label="Go to next section">Next ↓</button>
  `;
  document.body.appendChild(stepper);

  const getCurrentIndex = () => {
    const threshold = window.innerHeight * 0.32;
    let index = 0;

    sectionTargets.forEach((section, i) => {
      const top = section.getBoundingClientRect().top;
      if (top <= threshold) {
        index = i;
      }
    });

    return index;
  };

  const goToIndex = (index) => {
    const safeIndex = Math.max(0, Math.min(sectionTargets.length - 1, index));
    scrollToSection(sectionTargets[safeIndex].id);
  };

  stepper.querySelector('.stepper-up')?.addEventListener('click', () => {
    goToIndex(getCurrentIndex() - 1);
  });

  stepper.querySelector('.stepper-down')?.addEventListener('click', () => {
    goToIndex(getCurrentIndex() + 1);
  });

  const pageNavObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActivePageLink(visible.target.id);
      }
    },
    {
      rootMargin: '-25% 0px -60% 0px',
      threshold: [0.2, 0.5, 0.8]
    }
  );

  sectionTargets.forEach((section) => pageNavObserver.observe(section));
});
