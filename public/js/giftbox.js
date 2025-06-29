(function () {
  const giftGrid = document.getElementById("giftGrid");
  const startDate = new Date("2025-06-21");

  for (let i = 0; i < 21; i++) {
    const boxDate = new Date(startDate);
    boxDate.setDate(startDate.getDate() + i);

    const day = boxDate.getDate().toString().padStart(2, "0");
    const month = (boxDate.getMonth() + 1).toString().padStart(2, "0");
    const year = boxDate.getFullYear();
    const dateLabel = `${day}/${month}/${year}`;

    const giftContainer = document.createElement("div");
    giftContainer.className = "gift-container";

   giftContainer.innerHTML = `
  <div class="gift-content">
  <div class="shadow"></div>
  <div class="gift-box">
    <div class="top" data-index="${i + 1}" data-date="${boxDate.toISOString()}"></div>
  </div>
  <div class="tick">✔</div>
  <div class="gift-date">${dateLabel}</div> <!-- MOVED HERE -->
</div>`
;

    giftGrid.appendChild(giftContainer);
  }

  // Enable click-to-open-close behavior with auto-close logic
  const tops = document.querySelectorAll(".top");
  const autoCloseTimers = new Map(); // Track timers per box

  tops.forEach(top => {
    top.addEventListener("click", () => {
      const today = new Date();
      const boxDate = new Date(top.dataset.date);

      if (today >= boxDate) {
        const container = top.closest(".gift-container");
        const box = container.querySelector(".gift-box");
        const shadow = container.querySelector(".shadow");
        const isActive = top.classList.contains("active");

        // Toggle all related classes
        top.classList.toggle("active", !isActive);
        box.classList.toggle("active", !isActive);
        shadow.classList.toggle("active", !isActive);
        container.classList.toggle("active", !isActive);
        top.classList.add("opened");
        box.classList.add("opened");
        container.classList.add("opened"); // for showing the tick
        if (!isActive) {
          // Clear previous timer if exists
          if (autoCloseTimers.has(top)) {
            clearTimeout(autoCloseTimers.get(top));
            autoCloseTimers.delete(top);
          }

          // Set auto-close timer for 5s
          const timer = setTimeout(() => {
            top.classList.remove("active");
            box.classList.remove("active");
            shadow.classList.remove("active");
            container.classList.remove("active");
            autoCloseTimers.delete(top);
          }, 5000);

          autoCloseTimers.set(top, timer);

          // Open popup
          const newWindow = window.open(`surprise/surprise${top.dataset.index}.html`, "_blank");
          setTimeout(() => {
            if (newWindow && !newWindow.closed) {
              newWindow.close();
            }
          }, 5000);
        } else {
          // If box is manually closed
          if (autoCloseTimers.has(top)) {
            clearTimeout(autoCloseTimers.get(top));
            autoCloseTimers.delete(top);
          }
        }
      } else {
        alert("Baby..I love you..when the time hits...it will be opened");
      }
    });
});
})();