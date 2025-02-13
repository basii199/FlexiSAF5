# Task Tracker

A simple task tracker built with React that allows users to add, toggle, and delete tasks. The application uses local storage to persist tasks between sessions.

## Features
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Persist tasks using localStorage
- Input field auto-focus for better user experience

## Technologies Used
- React (useState, useEffect, useRef)
- Custom Hooks (useLocalStorage)
- Tailwind CSS for styling

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/task-tracker.git
   ```
2. Navigate into the project folder:
   ```sh
   cd task-tracker
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Usage
1. Type a task in the input field and click "Add" to add a new task.
2. Click on a task to mark it as completed (strikethrough effect applied).
3. Click the "Delete" button to remove a task.
4. Tasks are saved in local storage and persist across page reloads.

## Custom Hook: `useLocalStorage`
This project includes a custom hook `useLocalStorage` to manage state that syncs with localStorage.
```js
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
```

## License
This project is licensed under the MIT License.

## Author
Developed by **Your Name**.

## Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.

