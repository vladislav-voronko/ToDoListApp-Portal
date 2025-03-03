import React, { useState } from 'react';

interface CategoryProps {
  id: string;
  name: string;
  description: string;
  onUpdate: (id: string, name: string, description: string) => void;
  onChange: (name: string, description: string) => void;
}

const Category: React.FC<CategoryProps> = ({ id, name, description, onUpdate, onChange }) => {
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);

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
      />
      <input
        type="text"
        value={newDescription}
        onChange={handleDescriptionChange}
        placeholder="Category description"
      />
    </div>
  );
};

export default Category;