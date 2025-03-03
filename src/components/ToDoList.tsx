import React, { useState, useEffect, useRef } from 'react';
import ToDoService from "../services/ToDoService";
import CategoryService from "../services/CategoryService";
import ToDoItemDialog from "./ToDoItemDialog";
import { ToDoItem, Category as CategoryType } from "../types/baseTypes";
import "./ToDoList.css"; // Импортируем стили

const ToDoList: React.FC = () => {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newItemTitle, setNewItemTitle] = useState<string>("");
  const [newItemCategory, setNewItemCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ToDoItem | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFetched) {
      const fetchToDoItems = async () => {
        try {
          const response = await ToDoService.getAll();
          setToDoItems(response.data);
        } catch (error) {
          console.error("Failed to fetch to-do items:", error);
        }
      };

      const fetchCategories = async () => {
        try {
          const response = await CategoryService.getAll();
          setCategories(response.data);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      };

      fetchToDoItems();
      fetchCategories();
      setIsFetched(true);
    }
  }, [isFetched]);

  const addItem = async () => {
    try {
      const newItem = { title: newItemTitle, categoryId: newItemCategory, isCompleted: false } as ToDoItem;
      const response = await ToDoService.create(newItem);
      setToDoItems([...toDoItems, response.data]);
      setNewItemTitle("");
      setNewItemCategory("");
    } catch (error) {
      console.error("Failed to add to-do item:", error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await ToDoService.remove(id);
      setToDoItems(toDoItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete to-do item:", error);
    }
  };

  const handleItemClick = (item: ToDoItem) => {
    setSelectedItem(item);
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  const handleItemChange = (title: string, categoryId: string, isCompleted: boolean) => {
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, title, categoryId, isCompleted });
    }
  };

  const updateItem = async (id: string, title: string, categoryId: string, isCompleted: boolean) => {
    try {
      const updatedItem = { id, title, categoryId, isCompleted } as ToDoItem;
      await ToDoService.update(id, updatedItem);
      setToDoItems(toDoItems.map((item) => (item.id === id ? updatedItem : item)));
      setSelectedItem(null);
    } catch (error) {
      console.error("Failed to update to-do item:", error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      handleCancel();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  };

  useEffect(() => {
    if (selectedItem) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <div className="todo-list-container">
      <h2>To-Do List</h2>
      <div className="add-item">
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="What you need to do"
        />
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={addItem}>Add</button>
      </div>
      {selectedItem && <div className="overlay" />}
      {selectedItem ? (
        <div className="todo-dialog" ref={dialogRef}>
          <ToDoItemDialog
            item={selectedItem}
            onUpdate={updateItem}
            onChange={handleItemChange}
          />
          <div className="buttons">
            <button onClick={handleCancel} className="cancel">Cancel</button>
            <button onClick={() => updateItem(selectedItem.id, selectedItem.title, selectedItem.categoryId, selectedItem.isCompleted)}>Update</button>
          </div>
        </div>
      ) : (
        <ul>
          {toDoItems.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              <span>{item.title}</span>
              <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;