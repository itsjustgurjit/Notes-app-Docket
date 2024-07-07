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
  showcolorbuttons();
  if (colorbtn_show) {
    hidecolorbtns();
    colorbtn_show = false;
  } else {
    colorbtn_show = true;
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

colorbtns.forEach((colorbtn) => {
  colorbtn.addEventListener("click", (e) => {
    cr_color = colorbtn.getAttribute("id");
    let colorBtn = e.target;
    console.log(cr_color);
    dialog.showModal(colorBtn);
    document.querySelector(
      "dialog h2"
    ).style.backgroundColor = `#${colorBtn.getAttribute("id")}`;
    document.body.classList.add("body-blur");
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
    
    let edit_note_btns = document.querySelectorAll(".edit-note-btn");
  
    // Attach edit event listeners
    edit_note_btns.forEach((edit_note_btn) => {
      edit_note_btn.addEventListener("click", (e) => {
        let selected_note = e.target.closest(".note");
        console.log(selected_note);
        dialog.showModal();
        let editing_modal = document.querySelector("dialog");
        let text_edited = selected_note.querySelector(".note-content p");
        note_textarea.value = text_edited.textContent;
        editing_modal.querySelector(".save-note-btn").style.display = "none";
        let save_edited = editing_modal.querySelector(".save-edited-note-btn");
        save_edited.style.display = "flex";

        // Remove previous click event listener to prevent multiple triggers
        save_edited.replaceWith(save_edited.cloneNode(true));
        save_edited = editing_modal.querySelector(".save-edited-note-btn");
  
        save_edited.addEventListener("click", () => {
          selected_note.querySelector("p").textContent = note_textarea.value;
          console.log(selected_note);
          editing_modal.querySelector(".save-edited-note-btn").style.display = "none";
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
  let audio = new Audio();
  audio.src = "soundeffect.wav";
  audio.play();
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
});
