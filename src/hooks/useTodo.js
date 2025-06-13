import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getFromLocalStorage, setInLocalStorage } from "../utils/localStorage";

const todoApi = `https://dummyjson.com/todos`;

export function useTodo() {
  const queryClient = useQueryClient();

  // query for fetching todos
  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      try {
        // First try to get from localStorage
        const savedTodos = getFromLocalStorage();
        if (savedTodos && savedTodos.length > 0) {
          return savedTodos;
        }

        // If no localStorage data, fetch from API
        const response = await axios.get(todoApi);
        const apiTodos = response.data.todos;
        
        // Save to localStorage and return
        setInLocalStorage(apiTodos);
        return apiTodos;
      } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
      }
    }
  });

  // add new todo to the todos array
  const useAddTodo = useMutation({
    mutationFn: async (newTodo) => {
      try {
        const response = await axios.post(todoApi + "/add", {
          todo: newTodo.todo,
          completed: false,
          userId: Math.floor(Math.random() * 15) + 1
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const currentTodos = getFromLocalStorage() || [];
        const apiTodoToAdd = {
          ...response.data,
          id: Date.now()
        };
        const updatedTodos = [apiTodoToAdd, ...currentTodos];
        setInLocalStorage(updatedTodos);
        return apiTodoToAdd;
      } catch (error) {
        console.error("Error adding todo to API:", error);
        const localTodo = {
          id: Date.now(),
          todo: newTodo.todo,
          completed: false,
          userId: Math.floor(Math.random() * 15) + 1
        };
        const currentTodos = getFromLocalStorage() || [];
        const updatedTodos = [localTodo, ...currentTodos];
        setInLocalStorage(updatedTodos);
        return localTodo;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  // mutation for deleting
  const deleteTodo = useMutation({
    mutationFn: async (todoId) => {
      const currentTodos = getFromLocalStorage() || [];
      const updatedTodos = currentTodos.filter(todo => todo.id !== todoId);
      setInLocalStorage(updatedTodos);
      
      const isApiTodo = todoId < 100;
      if (isApiTodo) {
        try {
          await axios.delete(`${todoApi}/${todoId}`);
        } catch (error) {
          console.error('Error deleting todo from API:', error);
          // Continue with local deletion even if API fails
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  // mutation for toggling todo completion
  const toggleTodo = useMutation({
    mutationFn: async (updatedTodo) => {
      const currentTodos = getFromLocalStorage() || [];
      const todoToUpdate = currentTodos.find((todo) => todo.id === updatedTodo.id);
      
      if (!todoToUpdate) {
        throw new Error("Todo Not Found");
      }

      // Check if this is a title update or completion status update
      const isTitleUpdate = updatedTodo.todo !== undefined && updatedTodo.todo !== todoToUpdate.todo;
      const isCompletionUpdate = updatedTodo.completed !== undefined && updatedTodo.completed !== todoToUpdate.completed;

      // Always update localStorage first
      const updatedTodos = currentTodos.map(todo => {
        if (todo.id === updatedTodo.id) {
          if (isTitleUpdate) {
            return { ...todo, todo: updatedTodo.todo };
          } else if (isCompletionUpdate) {
            return { ...todo, completed: updatedTodo.completed };
          }
        }
        return todo;
      });
      setInLocalStorage(updatedTodos);

      // Only try to update API if it's an API todo (id < 100)
      const isApiTodo = updatedTodo.id < 100;

      if (isApiTodo) {
        try {
          // For title updates, don't make API call
          if (isTitleUpdate) {
            return updatedTodos.find(todo => todo.id === updatedTodo.id);
          }

          // For completion status updates, make API call
          if (isCompletionUpdate) {
            const response = await axios.put(`${todoApi}/${updatedTodo.id}`, {
              completed: updatedTodo.completed,
              todo: todoToUpdate.todo,
              userId: todoToUpdate.userId
            }, {
              headers: {
                'Content-Type': 'application/json',
              }
            });
            return response.data;
          }
        } catch (error) {
          console.error("Error updating todo in API:", error);
          // Return the local update if API fails
          return updatedTodos.find(todo => todo.id === updatedTodo.id);
        }
      }

      // Return the local update for non-API todos
      return updatedTodos.find(todo => todo.id === updatedTodo.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  return {
    todos,
    isLoading,
    error,
    useAddTodo,
    deleteTodo,
    toggleTodo
  };
}

export default useTodo;






// // toggle todo status
// const useToggleTodo = (page) => {
//   const queryClient = useQueryClient();
//   const toggleTodo = async (todo) => {
//     const { id, completed } = todo;
//     const updatedTodo = { ...todo, completed: !completed };
//     if (todo.id <= 200 || isNaN(id))
//       await axios.put(
//         `https://jsonplaceholder.typicode.com/todos/${id}`,
//         updatedTodo
//       );
//     return updatedTodo;
//   };

//   return useMutation({
//     mutationFn: toggleTodo,
//     onSuccess: (updatedTodo) => {
//       queryClient.setQueryData(["todo", page], (old) => {
//         if (!old) return old;
//         const updated = {
//           ...old,
//           todos: old.todos.map((todo) =>
//             todo.id === updatedTodo.id
//               ? { ...todo, completed: !todo.completed }
//               : todo
//           ),
//         };
//         setLocalStorage(page, updated);
//         return updated;
//       });
//     },
//   });
// };

// //delete todo from the todos array
// const useDeleteTodo = (page) => {
//   const queryClient = useQueryClient();
//   const deleteTodo = async (id) => {
//     if (id <= 200) {
//       await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
//     }
//     return id;
//   };

//   return useMutation({
//     mutationFn: deleteTodo,
//     onSuccess: (id) => {
//       queryClient.setQueryData(["todo", page], (old) => {
//         if (!old) return old;
//         const filteredTodos = old.todos.filter((todo) => todo.id !== id);
//         const updated = {
//           ...old,
//           todos: filteredTodos
//         };
//         setLocalStorage(page, updated);
//         return updated;
//       });
//     },
//   });
// };

// //Update todo 
// const useUpdateTodo = (page) => {
//   const queryClient = useQueryClient();
//   const updateTodo = async (editTodo) => {
//     const { id } = editTodo;
//     if (id <= 200) {
//       await axios.put(
//         `https://jsonplaceholder.typicode.com/todos/${id}`,
//         editTodo
//       );
//     }
//     return editTodo;
//   };

//   return useMutation({
//     mutationFn: updateTodo,
//     onSuccess: (editTodo) => {
//       queryClient.setQueryData(["todo", page], (old) => {
//         if (!old) return old;
//         const updated = {
//           ...old,
//           todos: old.todos.map((todo) =>
//             todo.id === editTodo.id ? { ...todo, ...editTodo } : todo
//           ),
//         };
//         setLocalStorage(page, updated);
//         return updated;
//       });
//     },
//   });
// };

// export default useTodo;
// export { useToggleTodo, useDeleteTodo, useUpdateTodo };


// const queryClient = useQueryClient()

//   // loading from localStorage

//  const {data:todos =[] ,isLoading,error} = useQuery({
//   queryKey:['todos'],
//   queryFn: async () => {
//        // First check localStorage for immediate response
//        const localData = getLocalStorage();
//        if (localData?.length > 0) {
//         return localData
//        };
//       }
//     // If no todos in localStorage, fetch from API
 
//  })


  
//   const totalCount =  200;
//   const totalPages = Math.ceil(totalCount / limit);

//   const result = {
//     todos: response.data,
//     totalPages,
//   };
//   setLocalStorage(page, result);
//   return result;