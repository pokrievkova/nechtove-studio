const desktopHover = window.matchMedia("(hover: hover) and (pointer: fine)");

document.querySelectorAll(".nav-menu").forEach((menu) => {
  const summary = menu.querySelector("summary");
  let clickOpen = false;
  let closeTimer;

  menu.addEventListener("pointerenter", (event) => {
    if (desktopHover.matches && event.pointerType !== "touch") {
      window.clearTimeout(closeTimer);
      menu.open = true;
    }
  });

  menu.addEventListener("pointerleave", (event) => {
    if (!desktopHover.matches || event.pointerType === "touch") return;
    if (event.relatedTarget instanceof Node && menu.contains(event.relatedTarget)) return;

    closeTimer = window.setTimeout(() => {
      menu.open = false;
      clickOpen = false;
    }, 250);
  });

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    window.clearTimeout(closeTimer);
    clickOpen = !clickOpen;
    menu.open = clickOpen;
  });
});
