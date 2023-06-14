import "./style.css";

const todoTask = [
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
  constructor(todo, wrapperElem) {
    this.todo_list = todo;
    this.wrapper_elem = wrapperElem;
  }

  completeTodoContainer = "";

  insertTodo(singleTodo) {
    this.completeTodoContainer += `
      <article class="single-todo">
        <input type="checkbox" name=${singleTodo.index} class="checkbox-todo"/>
        <p class="description-todo">${singleTodo.description}</p>
        <div class="organize-todo">...</div>
      </article>
    `;
  }

  showTodo() {
    this.todo_list.forEach((element) => {
      this.insertTodo(element);
    });
    console.log(this.completeTodoContainer);
    const targetElem = document.querySelector(this.wrapper_elem);
    targetElem.innerHTML = this.completeTodoContainer;
  }

  run() {
    this.showTodo();
  }
}

const todo = new ToDo(todoTask, ".show-todo");
todo.run();
