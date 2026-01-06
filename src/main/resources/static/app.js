const API_URL = '/api/todos';

// Load todos on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    
    // Add event listeners
    document.getElementById('addTodoBtn').addEventListener('click', addTodo);
    document.getElementById('newTodoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});

// Load all todos from the API
async function loadTodos() {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error loading todos:', error);
        alert('Failed to load todos');
    }
}

// Display todos in the UI
function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
}

// Create a todo element
function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = 'todo-item' + (todo.completed ? ' completed' : '');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id, !todo.completed));
    
    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.title;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    div.appendChild(checkbox);
    div.appendChild(text);
    div.appendChild(deleteBtn);
    
    return div;
}

// Add a new todo
async function addTodo() {
    const input = document.getElementById('newTodoInput');
    const title = input.value.trim();
    
    if (!title) {
        alert('Please enter a todo');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, completed: false }),
        });
        
        if (response.ok) {
            input.value = '';
            loadTodos();
        } else {
            throw new Error('Failed to add todo');
        }
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add todo');
    }
}

// Toggle todo completion status
async function toggleTodo(id, completed) {
    try {
        // Get the current todo to preserve the title
        const todos = await (await fetch(API_URL)).json();
        const todo = todos.find(t => t.id === id);
        
        if (!todo) {
            throw new Error('Todo not found');
        }
        
        const updateResponse = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: todo.title, completed }),
        });
        
        if (updateResponse.ok) {
            loadTodos();
        } else {
            throw new Error('Failed to update todo');
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        alert('Failed to update todo');
    }
}

// Delete a todo
async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this todo?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            loadTodos();
        } else {
            throw new Error('Failed to delete todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo');
    }
}
