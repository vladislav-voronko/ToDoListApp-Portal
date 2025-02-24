import React, { useEffect, useState } from "react";
import ToDoService from "../services/ToDoService";
import { ToDoItem } from "../types/baseTypes";
import "./TodoList.css";

const TodoList: React.FC = () => {
  const [todoItems, setTodoItems] = useState<ToDoItem[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!isFetched) {
      const fetchTodoItems = async () => {
        try {
          const response = await ToDoService.getAll();
          setTodoItems(response.data);
          setIsFetched(true);
        } catch (error) {
          console.error("Failed to fetch todo items:", error);
        }
      };

      fetchTodoItems();
    }
  }, [isFetched]);

  const toggleCompletion = async (id: string) => {
    try {
      const item = todoItems.find((item) => item.id === id);
      if (item) {
        const updatedItem = { ...item, isCompleted: !item.isCompleted };
        await ToDoService.update(id, { isCompleted: updatedItem.isCompleted });
        setTodoItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? updatedItem : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update todo item:", error);
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      <ul>
        {todoItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => toggleCompletion(item.id)}
            />
            <span style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;