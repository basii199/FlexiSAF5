import { useState, useEffect, useRef } from "react";

// Create Custom Hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error accessing local storage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [task, setTask] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
    inputRef.current.focus();
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  console.log(`
    - useState: A built-in React hook that manages the component's state.
      In this code, useState is used for managing:
        - 'tasks' (array of task objects) which is stored in localStorage via the custom hook 'useLocalStorage'.
        - 'task' (the current task input) which stores the string value from the input field.
    
    - useEffect: A built-in React hook for performing side effects in the component.
      In this code, useEffect is used for:
        - Updating the localStorage whenever the 'tasks' state changes.
        - Setting the focus on the input field when the component is mounted (empty dependency array means it runs once on mount).
    
    - useRef: A built-in React hook used to persist values across renders and directly interact with DOM elements.
      In this code, useRef is used to get a reference to the input field so that it can be focused when the component is mounted and after adding a task.
    
    - useLocalStorage (Custom Hook): A custom hook for handling state that is synchronized with localStorage.
      - It uses useState internally to manage the stored value, and sets/gets from window.localStorage.
      - It accepts a 'key' and 'initialValue' as arguments:
        - 'key' is used to store/retrieve the data from localStorage.
        - 'initialValue' is used as the fallback if the localStorage is empty or has invalid data.
      - useEffect inside this hook updates the localStorage whenever the state (storedValue) changes.
  `);
  

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Task Tracker</h1>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Add a new task"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`p-2 border rounded flex justify-between items-center ${t.completed ? "line-through text-gray-400" : ""}`}
          >
            <span onClick={() => toggleTask(t.id)} className="cursor-pointer">
              {t.text}
            </span>
            <button onClick={() => deleteTask(t.id)} className="bg-red-500 text-white p-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
