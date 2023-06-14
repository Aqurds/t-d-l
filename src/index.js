import _ from "lodash";
import "./style.css";

console.log("Hello, from Webpack!");

const todo_task = [
  {
    index: 1,
    description: "Complete one coding challenge",
    completed: false,
  },
  {
    index: 2,
    description: "Daily task of agency app",
    completed: false,
  },
];

class ToDo {
  constructor(todo, wrapper_elem) {
    this.todo_list = todo;
    this.wrapper_elem = wrapper_elem;
  }

  complete_todo_container = "";

  insertTodo(single_todo) {
    this.complete_todo_container += `
      <article class="single-todo">
        <input type="checkbox" name=${single_todo.index} class="checkbox-todo"/>
        <p class="description-todo">${single_todo.description}</p>
        <div class="organize-todo">...</div>
      </article>
    `;
  }

  showTodo() {
    this.todo_list.forEach((element) => {
      console.log(element);
      this.insertTodo(element);

      const target_elem = document.querySelector(this.wrapper_elem);
      console.log(target_elem);
      target_elem.innerHTML = this.complete_todo_container;
    });
  }

  run() {
    this.showTodo();
  }
}

const todo = new ToDo(todo_task, ".show-todo");
todo.run();
