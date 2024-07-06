let notes = document.querySelectorAll(".note");

notes.forEach((note) => {
    let notewidth = note.getBoundingClientRect().width;
    note.style.height = notewidth + "px";
})