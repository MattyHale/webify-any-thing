(function () {
  const monthYear = new Intl.DateTimeFormat("en-AU", {
    month: "long",
    year: "numeric"
  }).format(new Date());

  const iso = (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  })();

  const nodes = document.querySelectorAll("time#reviewedDate");
  if (!nodes || nodes.length === 0) return;

  nodes.forEach((t) => {
    if (!monthYear || monthYear.trim().length === 0) {
      const wrap = t.closest(".reviewed-line");
      if (wrap) wrap.remove();
      return;
    }
    t.textContent = monthYear;
    t.setAttribute("datetime", iso);
  });

  // Clean up any duplicate reviewed blocks if they exist:
  const blocks = document.querySelectorAll(".reviewed-line");
  if (blocks.length > 1) {
    // keep first, remove the rest
    blocks.forEach((b, i) => { if (i > 0) b.remove(); });
  }
})();
