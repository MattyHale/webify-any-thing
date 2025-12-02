const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';
  section.scrollIntoView({ behavior, block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollButtons = document.querySelectorAll('[data-scroll-target]');
  const cards = document.querySelectorAll('.card[data-scroll-target]');
  const scrollTopButton = document.querySelector('.scroll-top');
  const shareSections = document.querySelectorAll('.share-actions');

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

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-scroll-target');
      if (target) scrollToSection(target);
    });
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const target = card.getAttribute('data-scroll-target');
        if (target) scrollToSection(target);
      }
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
});
