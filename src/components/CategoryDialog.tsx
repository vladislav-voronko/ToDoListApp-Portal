import React, { useState } from 'react';
import { Category } from "../types/baseTypes";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface CategoryDialogProps {
  open: boolean;
  item: Category;
  onUpdate: (id: string, name: string, description: string) => void;
  onChange: (name: string, description: string) => void;
  onClose: () => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({ open, item, onUpdate, onChange, onClose }) => {
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>    
  );
};

export default CategoryDialog;