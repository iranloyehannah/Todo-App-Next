const TODOS_STORAGE_KEY = 'todos';

export const getFromLocalStorage = () => {
  try {
    const todos = localStorage.getItem(TODOS_STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const setInLocalStorage = (todos) => {
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

const updateLocalStorage = (id,UpdatedTodo) => {
    const todos = getFromLocalStorage() 
    const updateTodos = todos.map((todo) => todo.id === id ? {...todo, ...UpdatedTodo} : todo)
    setInLocalStorage(updateTodos)
    return updateTodos
}

export { updateLocalStorage };