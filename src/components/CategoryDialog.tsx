import React, { useState } from 'react';
import { Category } from "../types/baseTypes";
import { TextField, Box, Typography, Button } from "@mui/material";

interface CategoryDialogProps {
  item: Category;
  onUpdate: (id: string, name: string, description: string) => void;
  onChange: (name: string, description: string) => void;
  onCancel: () => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({ item, onUpdate, onChange, onCancel }) => {
  const [newName, setNewName] = useState(item.name);
  const [newDescription, setNewDescription] = useState(item.description);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    onChange(e.target.value, newDescription);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
    onChange(newName, e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(item.id, newName, newDescription);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Edit Category
      </Typography>
      <TextField
        label="Category name"
        value={newName || ""}
        onChange={handleNameChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Description"
        value={newDescription || ""}
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
        variant="outlined"

      />

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button onClick={onCancel} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryDialog;