// Todo list object
var todoList = {
  todos: [],

  addTodo: function(todoText) {
    if (todoText !== '') {
      var todo = {
          todoText: todoText,
          isCompleted: false};

      this.todos.push(todo);
    }
  },

  changeTodo: function(todoIdx, todoText) {
    this.todos[todoIdx].todoText = todoText;
  },

  deleteTodo: function(todoIdx) {
    this.todos.splice(todoIdx, 1);
  },

  toggleChecked: function(todoIdx, isChecked) {
    this.todos[todoIdx].isCompleted = isChecked;
  },

  toggleAll: function() {
    var toggleTrue = false;

    this.todos.forEach(function(todo) {
      if (!todo.isCompleted) {
        toggleTrue = true;
      }
    });

    this.todos.forEach(function(todo) {
      if (toggleTrue) {
        todo.isCompleted = true;
      } else {
        todo.isCompleted = false;
      }
    });
  }
}

// Handles back-end changes
var handler = {
  addTodo: function() {
    var todoInput = document.getElementById('addTodoTextInput');
    var todoInText = todoInput.value;
    todoList.addTodo(todoInText);
    todoInput.value = '';

    view.refreshView();
  },

  changeTodo: function() {
    var todoInTextField = document.getElementById('editTodoTextInput');
    var todoInIdxField = document.getElementById('editTodoIdxInput');

    todoList.changeTodo(todoInIdxField.valueAsNumber, todoInTextField.value);
    todoInTextField.value = '';
    todoInIdxField.value = '';

    view.refreshView();
  },

  deleteTodo: function(todoIdx) {
    todoList.deleteTodo(todoIdx);
    view.refreshView();
  },

  toggleTodo: function(todoIdx, isChecked) {
    todoList.toggleChecked(todoIdx, isChecked);
    view.refreshView();
  },

  toggleAll: function() {
    console.log('Toggling all');
    todoList.toggleAll();
    view.refreshView();
  }
}

// Handles changes in things viewed by user
var view = {
  refreshView: function() {
    var refUl = document.querySelector('ul');
    var liCount = 0;

    refUl.innerHTML = '';

    todoList.todos.forEach(function(todo) {
      var refLi = document.createElement('li');
      var refCheckBut = document.createElement('input');
      var refDelBut = document.createElement('button');

      if(todo.isCompleted) {
        var refTxt = document.createElement('s');
      } else {
        var refTxt = document.createElement('b');
      }
      refLi.id = liCount++;

      refCheckBut.type = 'checkbox';
      refCheckBut.className = 'checkboxTodo';
      refCheckBut.checked = todo.isCompleted;

      refDelBut.textContent = 'x';
      refDelBut.className = 'deleteTodoButton';
      refDelBut.contentEditable = false;

      refTxt.contentEditable = true;
      refTxt.textContent = todo.todoText;

      // Add event listener for text editing to update 'todoList.todos'
      refTxt.addEventListener('input', function() {
        todoList.changeTodo(refTxt.parentNode.id, refTxt.textContent);
      });

      // Add event listener for 'return' (focus on Add input field)
      refTxt.addEventListener('keypress', function(evt) {
        if (evt.which === 13) {
          document.getElementById('addTodoTextInput').focus();
        }
      });

      refLi.appendChild(refCheckBut);
      refLi.appendChild(refTxt);
      refLi.appendChild(refDelBut);
      refUl.appendChild(refLi);
    });

    document.getElementById('addTodoTextInput').focus();
  },

  setupListeners: function() {
    var refUl = document.querySelector('ul');
    var refAddIn = document.getElementById('addTodoTextInput');

    // Event listener for clicking the delete buttons
    refUl.addEventListener('click', function() {
      var clickTarget = event.target;
      if (clickTarget.className === 'deleteTodoButton') {
        handler.deleteTodo(clickTarget.parentNode.id);
      }
    });

    // Add new event listener for check box
    refUl.addEventListener('click', function() {
      var clickTarget = event.target;
      if (clickTarget.className === 'checkboxTodo') {
        handler.toggleTodo(clickTarget.parentNode.id, clickTarget.checked);
      }
    });

    // Add event listener for 'return' to add new todo item
    refAddIn.addEventListener('keypress', function(evt) {
      if (evt.which === 13) {
        handler.addTodo();
      }
    });
  }
}

view.setupListeners();
