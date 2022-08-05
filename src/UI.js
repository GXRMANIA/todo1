import { app } from './index.js'
import isToday from 'date-fns/isToday'
import isThisWeek from 'date-fns/isThisWeek'



const UI = (() => {
    
    // cache dom
    const newTodoForm = document.querySelector(".newTodoForm")
    const todosContainer = document.querySelector(".todos-container");
    const editTodoContainer = document.querySelector(".editTodoContainer")
    const content = document.querySelector("#content");

    const navProjects = document.querySelector(".navProjects");
    const navHome = document.querySelector(".navHome");
    const navToday = document.querySelector(".navToday");
    const navWeek = document.querySelector(".navWeek");


    function openNewTodoForm() {
        newTodoForm.classList.remove("inactive");
        editTodoContainer.innerHTML = "";
        todosContainer.innerHTML = "";
    }

    function closeNewTodoForm() {
        // clear input fields after closing
        newTodoForm.childNodes.forEach((ele) => {
            if(ele.type !== "text") return;
            ele.value = "";
        })
        newTodoForm.classList.add("inactive"); 
        
    }

    function loadHome(todos) {
        navHome.classList.add("selected")
        navToday.classList.remove("selected")
        navWeek.classList.remove("selected")
        navProjects.classList.remove("selected")
        clearScreen();
        let index = 0;
        todos.forEach(todo => {
            todosContainer.innerHTML +=
            `
            <div class="todo" data-id="${index}">
                <p>${todo.title}</p>
                <p>Due: ${todo.dueDate}</p>
                <div>
                    <input type="button" value="Edit" class="editTodoBtn">
                    <input type="button" value="Delete" class="deleteTodoBtn">
                </div>
            </div>
            `
            index++;
        });
    }

    function loadToday(todos) {
        navToday.classList.add("selected")
        navHome.classList.remove("selected")
        navWeek.classList.remove("selected")
        navProjects.classList.remove("selected")
        clearScreen();
        let index = 0;
        let todayTodos = todos.filter((todo) => {
            if(isToday(Date.parse(todo.dueDate))) {
                return todo;
            }
        })
        todayTodos.forEach(todo => {
            todosContainer.innerHTML +=
            `
            <div class="todo" data-id="${index}">
                <p>${todo.title}</p>
                <p>Due: ${todo.dueDate}</p>
                <div>
                    <input type="button" value="Edit" class="editTodoBtn">
                    <input type="button" value="Delete" class="deleteTodoBtn">
                </div>
            </div>
            `
            index++;
        });

    }

    function loadWeek(todos) {
        navWeek.classList.add("selected")
        navToday.classList.remove("selected")
        navHome.classList.remove("selected")
        navProjects.classList.remove("selected")
        clearScreen();
        let index = 0;
        let weekTodos = todos.filter((todo) => {
            if(isThisWeek(Date.parse(todo.dueDate))) {
                return todo;
            }
        })
        weekTodos.forEach(todo => {
            todosContainer.innerHTML +=
            `
            <div class="todo" data-id="${index}">
                <p>${todo.title}</p>
                <p>Due: ${todo.dueDate}</p>
                <div>
                    <input type="button" value="Edit" class="editTodoBtn">
                    <input type="button" value="Delete" class="deleteTodoBtn">
                </div>
            </div>
            `
            index++;
        });

    }     

    function hideTodos() {
        todosContainer.innerHTML = "";
    }

    function openEditTodo(todo, index) {
        todosContainer.innerHTML = "";
        closeNewTodoForm();
        editTodoContainer.innerHTML = 
            `
            <div class="editTodo" data-id="${index}">
                <input type="text" value="${todo.title}" class="editTitleInput">
                <input type="text" value="${todo.description}" class="editDescriptionInput">
                <input type="date" value="${todo.dueDate}" class="editDueDateInput"> 
                <select name="priority" id="priority" class="editPriorityInput">
                    <option ${(todo.priority == "low") ? "selected" : ""} value="low">Low</option>
                    <option ${(todo.priority == "mid") ? "selected" : ""} value="mid">Mid</option>
                    <option ${(todo.priority == "high") ? "selected" : ""} value="high">High</option>
                </select>
                <input type="text" value="${todo.project}" class="editProjectInput">
                <input type="button" value="Save" class="saveEditBtn">
                <input type="button" value="Cancel" class="cancelEditBtn">
            </div>
            `
    }

    function closeEditTodo() {
        editTodoContainer.innerHTML = "";
    }

    function loadProjectsPage(todos) {
        navProjects.classList.add("selected")
        navToday.classList.remove("selected")
        navHome.classList.remove("selected")
        navWeek.classList.remove("selected")
        clearScreen();   
        let todosWithSameProject;

        const projectNames = todos.map((todo) => {
            return todo.project;
        })

        let uniqProjets = [...new Set(projectNames)];

        uniqProjets.forEach(project => {
            let todosWithSameProject = todos.filter(todo => {
                if(todo.project === project) {
                    return todo
                }
            })

            const projectContainer = document.createElement("div");
            projectContainer.classList.add("projectContainer");
            
            const projectTitle = document.createElement("div");
            if(project == "") { 
                projectTitle.textContent = "No Project Name"
            } else {
                projectTitle.textContent = project;
            }
            projectContainer.appendChild(projectTitle)

            todosWithSameProject.forEach(todo => {
                const projectTodo = document.createElement("li");
                projectTodo.textContent = todo.title;
                projectTodo.classList.add("projectTodos")
                projectContainer.appendChild(projectTodo)
            }) 

            content.appendChild(projectContainer)
        })

    }


    function clearScreen() {
        closeNewTodoForm();
        closeEditTodo();
        hideTodos();
        content.innerHTML = "";
    }


    return { loadWeek, loadToday, loadProjectsPage, clearScreen, openNewTodoForm, closeNewTodoForm, loadHome, openEditTodo, closeEditTodo }
})();

export { UI }