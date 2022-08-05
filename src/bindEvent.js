import { app } from './index.js'
import { UI } from './UI.js';

export const bindEvent = (() => {
    function newTodoForm(e) {
        const eventClass = e.target.classList[0];
        // add new book button
        if(eventClass === "addBookBtn") {
            app.addTodo();
        // cancel button
        } else if(eventClass === "closeTodoForm") {
            UI.closeNewTodoForm();
        }
    }

    function todo(e) {
        const eventClass = e.target.classList[0];
        let index = e.target.parentNode.parentNode.dataset.id;

        if(eventClass === "deleteTodoBtn") {
            app.deleteTodo(index)
        } else if(eventClass === "editTodoBtn") {
            app.editTodo(index)
        }
    }

    function editTodo(e) {
        let index = e.target.parentNode.dataset.id;
        const eventClass = e.target.classList[0];
        if(eventClass === "cancelEditBtn") {
           app.cancelEditTodo();
        } else if(eventClass === "saveEditBtn") {
           const editTitleInput = document.querySelector(".editTitleInput").value;
           const editDescriptionInput = document.querySelector(".editDescriptionInput").value;
           const editDueDateInput = document.querySelector(".editDueDateInput").value;
           const editPriorityInput = document.querySelector(".editPriorityInput").value;
           const editProjectInput = document.querySelector(".editProjectInput").value;
           app.saveEditTodo(index, editTitleInput, editDescriptionInput, editDueDateInput, editPriorityInput, editProjectInput);
        }
    }

    return { newTodoForm, todo, editTodo }
})();