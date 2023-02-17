/*ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
# side-controll
ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ*/
let settin_btn = document.querySelector(".icon-container i");
let setting_box = document.querySelector(".side-controll");

/********* # Setting button event # **************/
settin_btn.addEventListener("click", () => {
  setting_box.classList.toggle("open");
  settin_btn.classList.toggle("fa-spin");
});

let main_color = localStorage.getItem("color");

let nav_bullets = document.querySelectorAll(".bullets li");
if (main_color !== null) {
  document.body.style.backgroundColor = main_color;
  nav_bullets.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === main_color) {
      li.classList.add("active");
    }
  });
}

nav_bullets.forEach((li) => {
  li.addEventListener("click", (e) => {
    nav_bullets.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    window.localStorage.setItem("color", e.currentTarget.dataset.color);
    document.body.style.backgroundColor = window.localStorage.getItem("color");
  });
});
/*ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
# scroll to the top
ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ*/
let Scroll_top = document.querySelector(".back-to-top");

top.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

window.onscroll = () => {
  if (window.scrollY >= 250) {
    Scroll_top.style.cssText = "display : flex";
  } else {
    Scroll_top.style.cssText = "display : none";
  }
};
/*ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
# add task
ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ*/
let text_input = document.querySelector(".input_add");
let add_button = document.querySelector(".add_task");
let div_tasks = document.querySelector(".todo-items");
let first_Box = document.querySelector(".first_Box");

let data = JSON.parse(localStorage.getItem("items"));
let arr = localStorage.getItem("items") ? data : [];
localStorage.setItem("items", JSON.stringify(arr));

if (arr.length > 0) {
  first_Box.style.cssText = "display: block;";
}

add_button.addEventListener("click", (e) => {
  if (text_input.value !== "") {
    div_Maker(text_input.value);
    arr.push(text_input.value);
    localStorage.setItem("items", JSON.stringify(arr));
    text_input.value = "";
  } else {
    Toastify({
      text: "input field is empty please enter some data",
      duration: 4000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#f44336",
      },
    }).showToast();
  }
  if (arr.length > 0) {
    first_Box.style.cssText = "display: block;";
  }
});
let div_Maker = (value) => {
  let data = document.createElement("div");
  data.className = "box";
  let p = document.createElement("p");
  let text = document.createTextNode(`${value}`);
  p.appendChild(text);
  let delete_btn = document.createElement("i");
  delete_btn.classList.add("fa-sharp", "fa-solid", "fa-trash");
  delete_btn.onclick = () => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        arr.splice(i, 1);
        localStorage.setItem("items", JSON.stringify(arr));
      }
    }
    div_tasks.removeChild(data);
    if (arr.length === 0) {
      first_Box.style.cssText = " display: none;";
    }
  };
  data.appendChild(p);
  data.appendChild(delete_btn);
  div_tasks.appendChild(data);
};
data.forEach((item) => {
  div_Maker(item);
});
