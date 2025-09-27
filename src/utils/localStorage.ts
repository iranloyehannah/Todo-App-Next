
const TODOS_STORAGE_KEY = 'todos';
export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};


export const getFromLocalStorage = (): Todo[] => {
  try {
    const todos = localStorage.getItem(TODOS_STORAGE_KEY);
    return todos ? JSON.parse(todos) as Todo[] : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const setInLocalStorage = (todos : Todo[]) => {
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

const updateLocalStorage = (id: number,UpdatedTodo : Todo) => {
    const todos = getFromLocalStorage() 
    const updateTodos = todos.map((todo : Todo) => todo.id === id ? {...todo, ...UpdatedTodo} : todo)
    setInLocalStorage(updateTodos)
    return updateTodos
}

export { updateLocalStorage };