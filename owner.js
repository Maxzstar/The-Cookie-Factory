const form = document.querySelector("[data-note-form]");
const preview = document.querySelector("[data-note-preview]");
const codeOutput = document.querySelector("[data-note-code]");
const copyButton = document.querySelector("[data-copy-note]");

const formatDate = (date) => {
  if (!date) return "Next";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

const cleanLines = (value) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });

const buildNote = () => {
  const data = new FormData(form);
  return {
    date: data.get("date") || "",
    version: data.get("version") || "Update",
    title: data.get("title") || "Untitled update",
    summary: data.get("summary") || "",
    changes: cleanLines(data.get("changes") || ""),
  };
};

const renderPreview = (note) => {
  const changes = note.changes.length
    ? `<ul>${note.changes.map((change) => `<li>${escapeHtml(change)}</li>`).join("")}</ul>`
    : "";

  preview.innerHTML = `
    <span>${escapeHtml(formatDate(note.date))} / ${escapeHtml(note.version)}</span>
    <h2>${escapeHtml(note.title)}</h2>
    <p>${escapeHtml(note.summary)}</p>
    ${changes}
  `;
};

const renderCode = (note) => {
  const notes = [note, ...(window.patchNotes || [])];
  codeOutput.value = `window.patchNotes = ${JSON.stringify(notes, null, 2)};\n`;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = buildNote();
  renderPreview(note);
  renderCode(note);
});

copyButton.addEventListener("click", async () => {
  if (!codeOutput.value) {
    const note = buildNote();
    renderPreview(note);
    renderCode(note);
  }

  await navigator.clipboard.writeText(codeOutput.value);
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.textContent = "Copy website update";
  }, 1400);
});
