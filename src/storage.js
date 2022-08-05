import { Todo } from './index'

export const storage = (() => {

    function saveTodos(todos) {
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    function loadTodos() {
        let res = [];
        let loadedTodos = JSON.parse(localStorage.getItem("todos"));
        loadedTodos.forEach(element => {
            let newTodo = new Todo(element.title, element.description, element.dueDate, element.priority, element.project);
            res.push(newTodo)
        });
        return res;
    }

    return { saveTodos, loadTodos }
})();