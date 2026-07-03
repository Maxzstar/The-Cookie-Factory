const build = {
  file: "",
  version: "",
  size: "",
};

const link = document.querySelector("[data-download-link]");
const version = document.querySelector("[data-build-version]");
const size = document.querySelector("[data-build-size]");

if (build.file) {
  link.href = build.file;
  link.classList.remove("disabled");
  link.removeAttribute("aria-disabled");
  link.innerHTML = '<span aria-hidden="true">&#10515;</span>Download build';
  version.textContent = build.version || "Latest";
  size.textContent = build.size || "Ready";
}

const notesList = document.querySelector("[data-patch-notes]");

const formatPatchDate = (date) => {
  if (!date) return "Next";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

const createNoteItem = (note) => {
  const item = document.createElement("li");
  const label = document.createElement("time");
  const content = document.createElement("span");
  const title = document.createElement("strong");
  const summary = document.createElement("span");

  if (note.date) {
    label.dateTime = note.date;
  }

  label.textContent = formatPatchDate(note.date);
  title.textContent = `${note.version ? `${note.version} - ` : ""}${note.title}`;
  summary.textContent = note.summary;
  content.append(title, summary);

  if (note.changes?.length) {
    const changes = document.createElement("ul");
    note.changes.forEach((change) => {
      const changeItem = document.createElement("li");
      changeItem.textContent = change;
      changes.append(changeItem);
    });
    content.append(changes);
  }

  item.append(label, content);
  return item;
};

if (notesList) {
  const notes = window.patchNotes || [];
  notesList.replaceChildren(...notes.map(createNoteItem));
}
