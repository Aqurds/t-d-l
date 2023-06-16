export default class toDoStorage {

  localStorageObjectName = "aqurdsToDo";

  getLocalStorageData() {
    // Responsible to get data from local storage
    const storageData = JSON.parse(
      localStorage.getItem(this.localStorageObjectName)
    );
    if (storageData) {
      return storageData;
    } else {
      return false;
    }
  }

  setLocalStorageData(todoData) {
    // Responsible to set data in local storage
    const todoObject = [
      {
        index: 1,
        task: todoData,
        completed: false,
      },
    ];

    // check if to do exist in local storage
    const todoExist = localStorage.getItem(this.localStorageObjectName);
    if (todoExist) {
      this.addLocalStorageData(todoData);
    } else {
      localStorage.setItem(
        this.localStorageObjectName,
        JSON.stringify(todoObject)
      );
    }
  }

  addLocalStorageData(todoData) {
    // Responsible to add single todo in existing local storage
    const currentTodoData = JSON.parse(
      localStorage.getItem(this.localStorageObjectName)
    );
    const newTodo = [
      ...currentTodoData,
      {
        index: currentTodoData[currentTodoData.length - 1].index + 1,
        task: todoData,
        completed: false,
      },
    ];
    localStorage.setItem(this.localStorageObjectName, JSON.stringify(newTodo));
  }

  updateLocalStorageData(todoData, index) {
    // Responsible to update data in local storage
    const currentTodoData = JSON.parse(
      localStorage.getItem(this.localStorageObjectName)
    );

    currentTodoData.forEach((element) => {
      if (parseInt(element.index) === parseInt(index)) {
        // console.log(element);
        element.task = todoData;
      }
    });

    localStorage.setItem(
      this.localStorageObjectName,
      JSON.stringify(currentTodoData)
    );
  }

  deleteLocalStorageData(todoIndex) {
    // Responsible to delete todo, update data storage
    const currentTodoData = JSON.parse(
      localStorage.getItem(this.localStorageObjectName)
    );
    // console.log(currentTodoData, "current data")

    const newTodo = [];
    let newIndex = 1;

    if (currentTodoData.length === 1) {
      localStorage.removeItem(this.localStorageObjectName);
      return;
    }

    for (let i = 0; i < currentTodoData.length; i += 1) {
      // console.log(currentTodoData[i]);
      if (parseInt(currentTodoData[i].index) !== parseInt(todoIndex)) {
        newTodo.push({
          index: newIndex,
          task: currentTodoData[i].task,
          completed: currentTodoData[i].completed,
        });
        newIndex += 1;
      }
    }

    // console.log(newTodo.length);
    if (!newTodo.length) {
      localStorage.removeItem(this.localStorageObjectName);
    } else {
      localStorage.setItem(
        this.localStorageObjectName,
        JSON.stringify(newTodo)
      );
    }
  }
}