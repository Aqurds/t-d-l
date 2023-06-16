import "./style.css";
import StorageData from "./modules/localStorage";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import "@fortawesome/free-brands-svg-icons";
library.add(faCheck);
library.add(faTrash);
dom.watch();

const localStorage = new StorageData();

const delTodo = () => {
  let doc = document.querySelectorAll('.todo-delete');
  doc.forEach(elem => {
    elem.addEventListener('click', e => {
      const parentElem = elem.parentNode;
      const todoIndex = parentElem.getElementsByClassName("edit-todo-input")[0].dataset.index;
      localStorage.deleteLocalStorageData(todoIndex);
      todo.showTodo();
    })
  })
}
// delTodo();
class ToDo {
  constructor(wrapperElem) {
    this.wrapperElem = wrapperElem;
  }

  completeTodoContainer = "";

  insertTodo(singleTodo) {
    // Responsible to create the Html wrapper for a single todo for the UI
    this.completeTodoContainer += `
      <article class="single-todo">
        <input type="checkbox" name=${singleTodo.index} class="checkbox-todo"/>
        <div class="todo-show-box">
          <input type="text" class="edit-todo-input" value="${singleTodo.task}" data-index=${singleTodo.index} autofocus>
          <div class="todo-delete">
            <i class="fa-solid fa-trash todo-delete-icon"></i>
          </div>
          <p class="description-todo">${singleTodo.task}</p>
        </div>
        <div class="organize-todo">...</div>
      </article>
    `;
  }

  showTodo() {
    // Responsible to show all todo in the UI
    let todoList = [];
    if (localStorage.getLocalStorageData()) {
      todoList = localStorage.getLocalStorageData();
    }
    const targetElem = document.querySelector(this.wrapperElem);
    if (todoList.length) {
      this.completeTodoContainer = "";
      todoList.forEach((element) => {
        this.insertTodo(element);
      });
      targetElem.innerHTML = this.completeTodoContainer;
    } else {
      targetElem.innerHTML = "";
    }
    this.editTodo();
    delTodo();
  }

  addTodo() {
    // Responsible to add a new todo in the data storage and update the UI
    const todoInputElem = document.getElementById("input-todo");
    todoInputElem.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        const todoData = todoInputElem.value;
        if (todoData.length) {
          localStorage.setLocalStorageData(todoData);
          this.showTodo();
          todoInputElem.value = "";
        }
      }
    });
    delTodo();
  }

  editTodo() {
    // Responsible to edit todo, update data storage and UI
    const todoInputElem = document.querySelectorAll(".description-todo");
    todoInputElem.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        const targetElem = parent.getElementsByClassName("edit-todo-input")[0];
        const targetDelElem = parent.getElementsByClassName("todo-delete")[0];
        targetElem.style.display = "block";
        targetDelElem.style.display = "block";
        const grandParent = parent.parentNode;
        grandParent.classList.add("color-class");
        this.updateTodo(targetElem);

      });
    });
  }

  updateTodo(elem) {
    // Responsible to update todo in data storage and update UI
    elem.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        const todoData = elem.value;
        if (todoData.length) {
          localStorage.updateLocalStorageData(todoData, elem.dataset.index);
          this.showTodo();
          // this.editTodo();
        }
      }
    });
  }

  run() {
    // Responsible to trigger the method to start todo class
    this.showTodo();
    this.addTodo();
  }
}

const todo = new ToDo(".show-todo");
todo.run();
