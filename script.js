let notes = document.querySelectorAll(".note");
let sidebar = document.querySelector(".sidebar");

async function animation_bg(bgColor) {
  const colorfulElement = document.querySelector(".colorful");
  colorfulElement.style.backgroundColor = bgColor;
  const viewportHeight = window.innerHeight;
  const randomTop = Math.random() * viewportHeight;
  colorfulElement.style.top = `${randomTop}px`;
  setTimeout(() => {
    colorfulElement.classList.add("active");
    setTimeout(() => {
      colorfulElement.classList.remove("active");
    }, 900);
  }, 0);
}

let updated_notes = document.querySelectorAll(".note");

let colorbtn_show = false;

let edit_note_btns = document.querySelectorAll(".edit-note-btn");

sidebar.addEventListener("mouseleave", (e) => {
  hidecolorbtns();
});
sidebar.addEventListener("mouseenter", (e) => {
  showcolorbuttons();
});

let main_btn = document.querySelector(".add-note");
main_btn.addEventListener("click", (e) => {
  main_btn.classList.add("bouce-animation");
  setTimeout(() => {
    main_btn.classList.remove("bouce-animation");
  }, 500);
  if (window.innerWidth < 576) {
    let colorbtn = document.querySelectorAll(".colors-btn");
    let e = document.querySelectorAll(".colors-btn");
    let randomnum = Math.floor(Math.random() * 5) + 1;
    let cr_color = colors[randomnum];
    colorbtn = colorbtn[randomnum];
    e = e[randomnum];
    show_modal_to_add_note(colorbtn, e);
  } else {
    showcolorbuttons();
    if (colorbtn_show) {
      hidecolorbtns();
      colorbtn_show = false;
    } else {
      colorbtn_show = true;
    }
  }
});

// show color buttons animation
async function showcolorbuttons() {
  let topheight = 22;
  let colorbtns = document.querySelectorAll(".colors-btn");
  colorbtns.forEach((colorbtn, index) => {
    setTimeout(() => {
      colorbtn.style.top = topheight + "vh";
      topheight = topheight + 5;
      colorbtn.style.scale = "1";
    }, 200 * index);
  });
}

function today_date() {
  let date = new Date();
  let year = date.getFullYear();
  let monthNames = [
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
  ];
  let month = monthNames[date.getMonth()]; // Get the month name from the array
  let day = date.getDate();
  let stringdate = `${month} ${day}, ${year}`;
  return stringdate;
}

// adding note
let colorbtns = document.querySelectorAll(".colors-btn");

let cr_color = "";
const colors = ["ffdd1d", "edac80", "cbaaff", "42d0ff", "9afa8f"];

async function show_modal_to_add_note(colorbtn, e) {
  try {
    cr_color = colorbtn.getAttribute("id");
  } catch (error) {
    let rnDnm = Math.floor(Math.random() * 5) + 1;
    cr_color = colors[rnDnm];
  }
  console.log(cr_color, e, colorbtn);
  let colorBtn;
  if (e !== undefined) {
    colorBtn = e.target;
  } else {
    let colorbtns = document.querySelectorAll(".colors-btn");
    let randomnum = Math.floor(Math.random() * colors.length);
    let cr_color = colors[randomnum];
    colorBtn = colorbtns[randomnum];
  }
  console.log(cr_color);
  dialog.querySelector("textarea").value = "";
  dialog.showModal(colorBtn);
  try {
    document.querySelector(
      "dialog h2"
    ).style.backgroundColor = `#${colorBtn.getAttribute("id")}`;
  } catch (error) {
    document.querySelector("dialog h2").style.backgroundColor = `#${cr_color}`;
  }
  document.body.classList.add("body-blur");
}

colorbtns.forEach((colorbtn) => {
  colorbtn.addEventListener("click", (e) => {
    show_modal_to_add_note(colorbtn, e);
  });
});


async function addNote(colorBtn, textAreaVal) {
  let note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
        <div class="note-content">
          <p>${textAreaVal}</p>
          <div class="note-bottom">
            <div class="date-div">
              ${await today_date()}
            </div>
            <button class="edit-note-btn"><img src="edit.svg" alt="edit-btn-svg"></button>
          </div>
        </div>`;
  note.style.backgroundColor = `#${cr_color}`;
  let bgColor = `#${cr_color}`;
  console.log(bgColor);
  animation_bg(bgColor);
  soundeffect();
  let notesContainer = document.querySelector(".notes-container");
  notesContainer.insertBefore(note, notesContainer.firstChild);
 await updatenotes();
  let edit_note_btns = document.querySelectorAll(".edit-note-btn");

  // Attach edit event listeners
  edit_note_btns.forEach((edit_note_btn) => {
    edit_note_btn.addEventListener("click", (e) => {
      e.stopPropagation();

      let selected_note = e.target.closest(".note");
      console.log(selected_note);

      let noteBgColor = window.getComputedStyle(selected_note).backgroundColor;

      let editing_modal = document.querySelector("dialog");
      let editing_modal_heading = editing_modal.querySelector("h2");
      editing_modal_heading.style.backgroundColor = noteBgColor;
      dialog.showModal();
      let text_edited = selected_note.querySelector(".note-content p");
      note_textarea.value = text_edited.textContent;
      editing_modal.querySelector(".save-note-btn").style.display = "none";
      let save_edited = editing_modal.querySelector(".save-edited-note-btn");
      save_edited.style.display = "flex";
      let delete_btn = editing_modal
        .querySelector(".delete-note-btn")
        .addEventListener("click", () => {
          selected_note.remove();
          editing_modal.close();
          updatenotes();
        });

      // Remove previous click event listener to prevent multiple triggers
      save_edited.replaceWith(save_edited.cloneNode(true));
      save_edited = editing_modal.querySelector(".save-edited-note-btn");

      save_edited.addEventListener("click", () => {
        selected_note.querySelector("p").textContent = note_textarea.value;
        console.log(selected_note);
        editing_modal.querySelector(".save-edited-note-btn").style.display =
          "none";
        editing_modal.querySelector(".save-note-btn").style.display = "flex";
        editing_modal.close();
      });
    });
  });
}

// hide color btns

async function hidecolorbtns() {
  let topheight = 22;
  let colorbtns = document.querySelectorAll(".colors-btn");
  colorbtns.forEach((colorbtn, index) => {
    setTimeout(() => {
      colorbtn.style.top = "13vh";
      colorbtn.style.scale = "0";
    }, 200 * index);
  });
}

async function soundeffect() {
  try {
    let audio = new Audio();
  audio.src = "soundeffect.wav";
  await audio.play();
  } catch (error) {
    console.log('not playing sound effect');
  }
}

// dialog
let logo = document.querySelector(".logo");

const dialog = document.querySelector("dialog");

const closeButton = document.querySelector(".close-note-btn");

// "Show the dialog" button opens the dialog modally

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
  document.body.classList.remove("body-blur");
});

let addnotemodal_btn = document.querySelector(".save-note-btn");

let note_textarea = document.querySelector("#note_textarea");

addnotemodal_btn.addEventListener("click", (e) => {
  let textAreaVal = note_textarea.value;
  if (note_textarea.value != "") {
    addNote(cr_color, textAreaVal);
    note_textarea.value = "";
    dialog.close();
  } else {
    addNote(cr_color, (textAreaVal = "Note"));
    dialog.close();
  }
  updatenotes();
});

async function updatenotes() {
  updated_notes = document.querySelectorAll(".note");
  console.log(updated_notes);
  savetolocalstorage();
  updateNoNotesMessage();
  return updated_notes;
}

// search
let search_input = document.querySelector(".search");

search_input.addEventListener("input", (e) => {
  let search_val = e.target.value;
  let notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    let note_text = note.querySelector(".note-content p");
    if (
      note_text.textContent.toLowerCase().includes(search_val.toLowerCase())
    ) {
      note.style.display = "unset";
    } else {
      note.style.display = "none";
    }
  });
});

let notesContainer = document.querySelector(".notes-container");
let preview_modal = document.querySelector(".preview-modal");
let closeNoteBtn = document.querySelector(".close-note-btn.preview-close");
let preview_modal_heading = preview_modal.querySelector("h2");

// Attach the event listener to the parent container
notesContainer.addEventListener("click", (e) => {
  let note = e.target.closest(".note");
  if (note) {
    let noteBgColor = window.getComputedStyle(note).backgroundColor;
    preview_modal_heading.style.backgroundColor = noteBgColor;
    let preview_text = note.querySelector("p");
    preview_modal.querySelector("p").textContent = preview_text.textContent;
    preview_modal.showModal();
  }
});

closeNoteBtn.addEventListener("click", () => {
  preview_modal.close();
});

// save to local storage

async function savetolocalstorage() {
    let notes = document.querySelectorAll(".note");
    let notes_data = [];
    notes.forEach((note) => {
      let note_text = note.querySelector("p").textContent;
      let note_color = note.style.backgroundColor;
      notes_data.push({ text: note_text, color: note_color });
    });
    localStorage.setItem("notes", JSON.stringify(notes_data));
  }
  

  document.addEventListener("DOMContentLoaded", () => {
    let lcnotes = JSON.parse(localStorage.getItem("notes"));
    if (lcnotes) {
        lcnotes.reverse();
        console.log(lcnotes);
      lcnotes.forEach((noteData) => {
        addNotefromlocal(noteData.color, noteData.text);
      });
    }
  });

  async function addNotefromlocal(color, text) {
    let note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="note-content">
          <p>${text}</p>
          <div class="note-bottom">
            <div class="date-div">
              ${await today_date()}
            </div>
            <button class="edit-note-btn"><img src="edit.svg" alt="edit-btn-svg"></button>
          </div>
        </div>`;
    note.style.backgroundColor = color;
    let bgColor = color;
    let notesContainer = document.querySelector(".notes-container");
    notesContainer.insertBefore(note, notesContainer.firstChild);
    // Attach edit event listeners (for existing notes)
    attachEditEventListeners(note);
    updateNoNotesMessage();
  }
  function attachEditEventListeners(note) {
    let edit_note_btn = note.querySelector(".edit-note-btn");
    edit_note_btn.addEventListener("click", (e) => {
      e.stopPropagation();
      let selected_note = e.target.closest(".note");
      console.log(selected_note);
  
      // Get the background color of the selected note
      let noteBgColor = window.getComputedStyle(selected_note).backgroundColor;
  
      let editing_modal = document.querySelector("dialog");
      let editing_modal_heading = editing_modal.querySelector("h2");
      
      // Set the modal heading background color to match the note
      editing_modal_heading.style.backgroundColor = noteBgColor;
  
      dialog.showModal();
      let text_edited = selected_note.querySelector(".note-content p");
      note_textarea.value = text_edited.textContent;
      editing_modal.querySelector(".save-note-btn").style.display = "none";
      let save_edited = editing_modal.querySelector(".save-edited-note-btn");
      save_edited.style.display = "flex";
  
      // Add delete functionality
      let delete_btn = editing_modal.querySelector(".delete-note-btn");
      delete_btn.onclick = () => {
        selected_note.remove();
        editing_modal.close();
        savetolocalstorage();
        updateNoNotesMessage();
      };
  
      save_edited.replaceWith(save_edited.cloneNode(true));
      save_edited = editing_modal.querySelector(".save-edited-note-btn");
      save_edited.addEventListener("click", () => {
        selected_note.querySelector("p").textContent = note_textarea.value;
        console.log(selected_note);
        editing_modal.querySelector(".save-edited-note-btn").style.display = "none";
        editing_modal.querySelector(".save-note-btn").style.display = "flex";
        editing_modal.close();
        savetolocalstorage();
      });
    });
  }

  function updateNoNotesMessage() {
    const noNotesMessage = document.querySelector('.no-notes');
    const notes = document.querySelectorAll('.note');
    
    if (notes.length > 0) {
      noNotesMessage.style.display = 'none';
    } else {
      noNotesMessage.style.display = 'flex';
    }
  }