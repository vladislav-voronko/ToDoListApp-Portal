import React, { useState, useEffect } from 'react';
import { ToDoItem, Category as CategoryType } from "../types/baseTypes";
import CategoryService from "../services/CategoryService";

interface ToDoItemDialogProps {
  item: ToDoItem;
  onUpdate: (id: string, title: string, categoryId: string, isCompleted: boolean) => void;
  onChange: (title: string, categoryId: string, isCompleted: boolean) => void;
}

const ToDoItemDialog: React.FC<ToDoItemDialogProps> = ({ item, onUpdate, onChange }) => {
  const [newTitle, setNewTitle] = useState(item.title);
  const [newCategoryId, setNewCategoryId] = useState(item.categoryId);
  const [newIsCompleted, setNewIsCompleted] = useState(item.isCompleted);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    onChange(e.target.value, newCategoryId, newIsCompleted);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewCategoryId(e.target.value);
    onChange(newTitle, e.target.value, newIsCompleted);
  };

  const handleIsCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIsCompleted(e.target.checked);
    onChange(newTitle, newCategoryId, e.target.checked);
  };

  return (
    <div>
      <h3>Edit To-Do Item</h3>
      <input
        type="text"
        value={newTitle}
        onChange={handleTitleChange}
        placeholder="To-Do Item title"
        className="dialog-input"
      />
      <select value={newCategoryId} onChange={handleCategoryChange} className="dialog-select">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="dialog-checkbox">
        <input
          type="checkbox"
          checked={newIsCompleted}
          onChange={handleIsCompletedChange}
        />
        <label>Completed</label>
      </div>
    </div>
  );
};

export default ToDoItemDialog;