let notes = document.querySelectorAll(".note"),
  sidebar = document.querySelector(".sidebar");
async function animation_bg(e) {
  let t = document.querySelector(".colorful");
  t.style.backgroundColor = e;
  let o = window.innerHeight;
  (t.style.top = `${Math.random() * o}px`),
    setTimeout(() => {
      t.classList.add("active"),
        setTimeout(() => {
          t.classList.remove("active");
        }, 900);
    }, 0);
}
let updated_notes = document.querySelectorAll(".note"),
  colorbtn_show = !1,
  edit_note_btns = document.querySelectorAll(".edit-note-btn");
sidebar.addEventListener("mouseleave", (e) => {
  hidecolorbtns();
}),
  sidebar.addEventListener("mouseenter", (e) => {
    showcolorbuttons();
  });
let main_btn = document.querySelector(".add-note");
async function showcolorbuttons() {
  let e = 22;
  document.querySelectorAll(".colors-btn").forEach((t, o) => {
    setTimeout(() => {
      (t.style.top = e + "vh"), (e += 5), (t.style.scale = "1");
    }, 200 * o);
  });
}
function today_date() {
  let e = new Date(),
    t = e.getFullYear(),
    o;
  return `${
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][e.getMonth()]
  } ${e.getDate()}, ${t}`;
}
main_btn.addEventListener("click", (e) => {
  if (
    (main_btn.classList.add("bouce-animation"),
    setTimeout(() => {
      main_btn.classList.remove("bouce-animation");
    }, 500),
    window.innerWidth < 576)
  ) {
    let t = document.querySelectorAll(".colors-btn"),
      o = document.querySelectorAll(".colors-btn"),
      l = Math.floor(5 * Math.random()) + 1;
    colors[l], show_modal_to_add_note((t = t[l]), (o = o[l]));
  } else
    showcolorbuttons(),
      colorbtn_show
        ? (hidecolorbtns(), (colorbtn_show = !1))
        : (colorbtn_show = !0);
});
let colorbtns = document.querySelectorAll(".colors-btn"),
  cr_color = "";
const colors = ["ffdd1d", "edac80", "cbaaff", "42d0ff", "9afa8f"];
async function show_modal_to_add_note(e, t) {
  try {
    cr_color = e.getAttribute("id");
  } catch (o) {
    cr_color = colors[Math.floor(5 * Math.random()) + 1];
  }
  console.log(cr_color, t, e);
  let l;
  if (void 0 !== t) l = t.target;
  else {
    let n = document.querySelectorAll(".colors-btn"),
      r = Math.floor(Math.random() * colors.length);
    colors[r], (l = n[r]);
  }
  console.log(cr_color),
    (dialog.querySelector("textarea").value = ""),
    dialog.showModal(l);
  try {
    document.querySelector(
      "dialog h2"
    ).style.backgroundColor = `#${l.getAttribute("id")}`;
  } catch (a) {
    document.querySelector("dialog h2").style.backgroundColor = `#${cr_color}`;
  }
  document.body.classList.add("body-blur");
}
async function addNote(e, t) {
  let o = document.createElement("div");
  o.classList.add("note"),
    (o.innerHTML = `
        <div class="note-content">
          <p>${t}</p>
          <div class="note-bottom">
            <div class="date-div">
              ${await today_date()}
            </div>
            <button class="edit-note-btn"><img src="edit.svg" alt="edit-btn-svg"></button>
          </div>
        </div>`),
    (o.style.backgroundColor = `#${cr_color}`);
  let l = `#${cr_color}`;
  console.log(l), animation_bg(l), soundeffect();
  let n = document.querySelector(".notes-container");
  n.insertBefore(o, n.firstChild), await updatenotes();
  document.querySelectorAll(".edit-note-btn").forEach((e) => {
    e.addEventListener("click", (e) => {
      e.stopPropagation();
      let t = e.target.closest(".note");
      console.log(t);
      let o = window.getComputedStyle(t).backgroundColor,
        l = document.querySelector("dialog");
      (l.querySelector("h2").style.backgroundColor = o), dialog.showModal();
      let n = t.querySelector(".note-content p");
      (note_textarea.value = n.textContent),
        (l.querySelector(".save-note-btn").style.display = "none");
      let r = l.querySelector(".save-edited-note-btn");
      (r.style.display = "flex"),
        l.querySelector(".delete-note-btn").addEventListener("click", () => {
          t.remove(), l.close(), updatenotes();
        }),
        r.replaceWith(r.cloneNode(!0)),
        (r = l.querySelector(".save-edited-note-btn")).addEventListener(
          "click",
          () => {
            (t.querySelector("p").textContent = note_textarea.value),
              console.log(t),
              (l.querySelector(".save-edited-note-btn").style.display = "none"),
              (l.querySelector(".save-note-btn").style.display = "flex"),
              l.close();
          }
        );
    });
  });
}
async function hidecolorbtns() {
  document.querySelectorAll(".colors-btn").forEach((e, t) => {
    setTimeout(() => {
      (e.style.top = "13vh"), (e.style.scale = "0");
    }, 200 * t);
  });
}
async function soundeffect() {
  try {
    let e = new Audio();
    (e.src = "soundeffect.wav"), await e.play();
  } catch (t) {
    console.log("not playing sound effect");
  }
}
colorbtns.forEach((e) => {
  e.addEventListener("click", (t) => {
    show_modal_to_add_note(e, t);
  });
});
let logo = document.querySelector(".logo");
const dialog = document.querySelector("dialog"),
  closeButton = document.querySelector(".close-note-btn");
closeButton.addEventListener("click", () => {
  dialog.close(), document.body.classList.remove("body-blur");
});
let addnotemodal_btn = document.querySelector(".save-note-btn"),
  note_textarea = document.querySelector("#note_textarea");
async function updatenotes() {
  return (
    (updated_notes = document.querySelectorAll(".note")),
    console.log(updated_notes),
    savetolocalstorage(),
    updateNoNotesMessage(),
    updated_notes
  );
}
addnotemodal_btn.addEventListener("click", (e) => {
  let t = note_textarea.value;
  "" != note_textarea.value
    ? (addNote(cr_color, t), (note_textarea.value = ""), dialog.close())
    : (addNote(cr_color, (t = "Note")), dialog.close()),
    updatenotes();
});
let search_input = document.querySelector(".search");
search_input.addEventListener("input", (e) => {
  let t = e.target.value;
  document.querySelectorAll(".note").forEach((e) => {
    e
      .querySelector(".note-content p")
      .textContent.toLowerCase()
      .includes(t.toLowerCase())
      ? (e.style.display = "unset")
      : (e.style.display = "none");
  });
});
let notesContainer = document.querySelector(".notes-container"),
  preview_modal = document.querySelector(".preview-modal"),
  closeNoteBtn = document.querySelector(".close-note-btn.preview-close"),
  preview_modal_heading = preview_modal.querySelector("h2");
async function savetolocalstorage() {
  let e = document.querySelectorAll(".note"),
    t = [];
  e.forEach((e) => {
    let o = e.querySelector("p").textContent,
      l = e.style.backgroundColor;
    t.push({ text: o, color: l });
  }),
    localStorage.setItem("notes", JSON.stringify(t));
}
async function addNotefromlocal(e, t) {
  let o = document.createElement("div");
  o.classList.add("note"),
    (o.innerHTML = `
        <div class="note-content">
          <p>${t}</p>
          <div class="note-bottom">
            <div class="date-div">
              ${await today_date()}
            </div>
            <button class="edit-note-btn"><img src="edit.svg" alt="edit-btn-svg"></button>
          </div>
        </div>`),
    (o.style.backgroundColor = e);
  let l = document.querySelector(".notes-container");
  l.insertBefore(o, l.firstChild),
    attachEditEventListeners(o),
    updateNoNotesMessage();
}
function attachEditEventListeners(e) {
  e.querySelector(".edit-note-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    let t = e.target.closest(".note");
    console.log(t);
    let o = window.getComputedStyle(t).backgroundColor,
      l = document.querySelector("dialog");
    (l.querySelector("h2").style.backgroundColor = o), dialog.showModal();
    let n = t.querySelector(".note-content p");
    (note_textarea.value = n.textContent),
      (l.querySelector(".save-note-btn").style.display = "none");
    let r = l.querySelector(".save-edited-note-btn");
    r.style.display = "flex";
    (l.querySelector(".delete-note-btn").onclick = () => {
      t.remove(), l.close(), savetolocalstorage(), updateNoNotesMessage();
    }),
      r.replaceWith(r.cloneNode(!0)),
      (r = l.querySelector(".save-edited-note-btn")).addEventListener(
        "click",
        () => {
          (t.querySelector("p").textContent = note_textarea.value),
            console.log(t),
            (l.querySelector(".save-edited-note-btn").style.display = "none"),
            (l.querySelector(".save-note-btn").style.display = "flex"),
            l.close(),
            savetolocalstorage();
        }
      );
  });
}
function updateNoNotesMessage() {
  let e = document.querySelector(".no-notes"),
    t = document.querySelectorAll(".note");
  t.length > 0 ? (e.style.display = "none") : (e.style.display = "flex");
}
notesContainer.addEventListener("click", (e) => {
  let t = e.target.closest(".note");
  if (t) {
    let o = window.getComputedStyle(t).backgroundColor;
    preview_modal_heading.style.backgroundColor = o;
    let l = t.querySelector("p");
    (preview_modal.querySelector("p").textContent = l.textContent),
      preview_modal.showModal();
  }
}),
  closeNoteBtn.addEventListener("click", () => {
    preview_modal.close();
  }),
  document.addEventListener("DOMContentLoaded", () => {
    let e = JSON.parse(localStorage.getItem("notes"));
    e &&
      (e.reverse(),
      console.log(e),
      e.forEach((e) => {
        addNotefromlocal(e.color, e.text);
      }));
  });
