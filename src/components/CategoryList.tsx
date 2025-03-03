import React, { useState, useEffect, useRef } from 'react';
import CategoryService from "../services/CategoryService";
import CategoryDialog from "./CategoryDialog";
import { Category as CategoryType } from "../types/baseTypes";
import "./CategoryList.css"; // Импортируем стили

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newCategoryDescription, setNewCategoryDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFetched) {
      const fetchCategories = async () => {
        try {
          const response = await CategoryService.getAll();
          setCategories(response.data);
          setIsFetched(true);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      };

      fetchCategories();
    }
  }, [isFetched]);

  const addCategory = async () => {
    try {
      const newCategory = { name: newCategoryName, description: newCategoryDescription } as CategoryType;
      const response = await CategoryService.create(newCategory);
      setCategories([...categories, response.data]);
      setNewCategoryName("");
      setNewCategoryDescription("");
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const updateCategory = async (id: string, name: string, description: string) => {
    try {
      await CategoryService.update(id, { name, description });
      setCategories(categories.map((category) =>
        category.id === id ? { ...category, name, description } : category
      ));
      setSelectedCategory(null);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await CategoryService.remove(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const handleCancel = () => {
    setSelectedCategory(null);
  };

  const handleCategoryChange = (name: string, description: string) => {
    if (selectedCategory) {
      setSelectedCategory({ ...selectedCategory, name, description });
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
    if (selectedCategory) {
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
  }, [selectedCategory]);

  return (
    <div className="category-list-container">
      <h2>Categories</h2>
      <div className="add-category">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category name"
        />
        <input
          type="text"
          value={newCategoryDescription}
          onChange={(e) => setNewCategoryDescription(e.target.value)}
          placeholder="Category description"
        />
        <button onClick={addCategory}>Add</button>
      </div>
      {selectedCategory && <div className="overlay" />}
      {selectedCategory ? (
        <div className="category-dialog" ref={dialogRef}>
          <CategoryDialog
            category={selectedCategory}
            onUpdate={updateCategory}
            onChange={handleCategoryChange}
          />
          <div className="buttons">
            <button onClick={handleCancel} className="cancel">Cancel</button>
            <button onClick={() => updateCategory(selectedCategory.id, selectedCategory.name, selectedCategory.description)}>Update</button>
          </div>
        </div>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <span>{category.name}</span>
              <button onClick={(e) => { e.stopPropagation(); deleteCategory(category.id); }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;