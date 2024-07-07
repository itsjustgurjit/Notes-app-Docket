let notes = document.querySelectorAll(".note");
let sidebar = document.querySelector(".sidebar");

async function animation_bg(bgColor) {
  const colorfulElement = document.querySelector(".colorful");
  colorfulElement.style.backgroundColor = bgColor;
  const viewportHeight = window.innerHeight;
  const randomTop = Math.random() * viewportHeight;
  colorfulElement.style.top = `${randomTop}px`;
  // Add the 'active' class after a short delay
  setTimeout(() => {
    colorfulElement.classList.add("active");

    // Remove the 'active' class after the animation duration (1s in this case)
    setTimeout(() => {
      colorfulElement.classList.remove("active");
    }, 900); // Match this duration to the animation duration in CSS
  }, 0); // Adjust this delay as needed
}

let colorbtn_show = false;

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

// adding note
let colorbtns = document.querySelectorAll(".colors-btn");

colorbtns.forEach((colorbtn) => {
    colorbtn.addEventListener("click", (e) => {
      let colorBtn = e.target;
      let note = document.createElement("div");
      note.classList.add("note");
      note.innerHTML = `
              <div class="note-content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. oiehfiuhefih oihiu iug</p>
                <div class="note-bottom">
                  <div class="date-div">Feb 23,2019</div>
                  <button class="edit-note-btn"><img src="edit.svg" alt="edit-btn-svg"></button>
                </div>
              </div>`
      note.style.backgroundColor = `#${colorbtn.getAttribute("id")}`;
      let bgColor = getComputedStyle(colorBtn).backgroundColor;
      animation_bg(bgColor);
      let notesContainer = document.querySelector(".notes-container");
      notesContainer.insertBefore(note, notesContainer.firstChild);
      let notewidth = note.getBoundingClientRect().width;
      note.style.height = notewidth + "px";
    });
  });
  

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
