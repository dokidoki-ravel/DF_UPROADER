(async () => {
  const board = document.querySelector("#poster-board");
  const response = await fetch("index.html", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`index.htmlの読み込みに失敗しました: ${response.status}`);
  }

  const source = new DOMParser().parseFromString(await response.text(), "text/html");
  const scheduleItems = [...source.querySelectorAll(".schedule-item")];
  const columnMeta = [
    { title: "08.29 SAT · NIGHT", note: "20:00 START", items: scheduleItems.slice(0, 6) },
    { title: "08.30 SUN · MORNING", note: "05:30 — 14:00", items: scheduleItems.slice(6, 12) },
    { title: "08.30 SUN · AFTERNOON", note: "14:00 — 20:00", items: scheduleItems.slice(12) }
  ];

  const toneFor = (item) => {
    const cast = item.querySelector(".schedule-cast");
    const tag = item.querySelector(".schedule-tag");

    if (cast?.classList.contains("schedule-cast-yellow") || tag?.classList.contains("tag-yellow")) return "yellow";
    if (cast?.classList.contains("schedule-cast-red") || tag?.classList.contains("tag-pink")) return "red";
    if (cast?.classList.contains("schedule-cast-orange") || tag?.classList.contains("tag-purple")) return "orange";
    return "cyan";
  };

  const createCard = (item) => {
    const card = document.createElement("article");
    const time = item.querySelector("time")?.textContent.replace(/\s+/g, " ").trim() ?? "";
    const tag = item.querySelector(".schedule-tag")?.textContent.trim() ?? "PROGRAM";
    const title = item.querySelector("h3")?.textContent.trim() ?? "";
    const castItems = [...item.querySelectorAll(".schedule-cast li")];

    card.className = `poster-card tone-${toneFor(item)}`;
    card.innerHTML = `
      <div class="poster-card-time">
        <time>${time}</time>
        <small>${tag}</small>
      </div>
      <div class="poster-card-content">
        <h2>${title}</h2>
        ${castItems.length ? `
          <div class="poster-cast">
            <b>出演</b>
            <ul>${castItems.map((cast) => `<li>${cast.innerHTML}</li>`).join("")}</ul>
          </div>
        ` : ""}
      </div>
    `;
    return card;
  };

  board.replaceChildren();

  columnMeta.forEach(({ title, note, items }) => {
    const column = document.createElement("section");
    column.className = "poster-column";
    column.innerHTML = `
      <header class="column-heading">
        <strong>${title}</strong>
        <span>${note}</span>
      </header>
      <div class="poster-cards"></div>
    `;

    const cards = column.querySelector(".poster-cards");
    items.forEach((item) => cards.append(createCard(item)));
    board.append(column);
  });

  await document.fonts.ready;

  document.querySelectorAll(".poster-column").forEach((column) => {
    if (column.scrollHeight > column.clientHeight) column.classList.add("compact");
  });

  document.documentElement.dataset.posterReady = "true";
})();
