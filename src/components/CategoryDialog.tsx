import React, { useState } from 'react';
import { Category as CategoryType } from "../types/baseTypes";

interface CategoryDialogProps {
  category: CategoryType;
  onUpdate: (id: string, name: string, description: string) => void;
  onChange: (name: string, description: string) => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({ category, onUpdate, onChange }) => {
  const [newName, setNewName] = useState(category.name);
  const [newDescription, setNewDescription] = useState(category.description);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    onChange(e.target.value, newDescription);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
    onChange(newName, e.target.value);
  };

  return (
    <div>
      <h3>Edit Category</h3>
      <input
        type="text"
        value={newName}
        onChange={handleNameChange}
        placeholder="Category name"
        className="dialog-input"
      />
      <input
        type="text"
        value={newDescription}
        onChange={handleDescriptionChange}
        placeholder="Category description"
        className="dialog-input"
      />
    </div>
  );
};

export default CategoryDialog;