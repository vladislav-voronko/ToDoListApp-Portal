import React, { useState, useEffect } from 'react';
import { ToDoItem, Category as CategoryType } from "../types/baseTypes";
import CategoryService from "../services/CategoryService";
import { TextField, Select, MenuItem, Checkbox, FormControl, FormControlLabel, Button, Dialog, DialogActions, DialogContent, DialogTitle, SelectChangeEvent } from "@mui/material";

interface ToDoItemDialogProps {
  open: boolean;
  item: ToDoItem;
  onUpdate: (id: string, title: string, categoryId: string, isCompleted: boolean) => void;
  onChange: (title: string, categoryId: string, isCompleted: boolean) => void;
  onClose: () => void;
}

const ToDoItemDialog: React.FC<ToDoItemDialogProps> = ({ open, item, onUpdate, onChange, onClose }) => {
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

  useEffect(() => {
    setNewTitle(item.title);
    setNewCategoryId(item.categoryId);
    setNewIsCompleted(item.isCompleted);
  }, [item]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
    onChange(e.target.value, newCategoryId, newIsCompleted);
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setNewCategoryId(e.target.value as string);
    onChange(newTitle, e.target.value as string, newIsCompleted);
  };

  const handleIsCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIsCompleted(e.target.checked);
    onChange(newTitle, newCategoryId, e.target.checked);
  };

  const handleUpdate = () => {
    onUpdate(item.id, newTitle, newCategoryId, newIsCompleted);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit To-Do Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={newTitle || ""}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <Select
            label="Category"
            value={newCategoryId || ""}
            onChange={handleCategoryChange}
            displayEmpty
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={newIsCompleted}
              onChange={handleIsCompletedChange}
            />
          }
          label="Completed"
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

export default ToDoItemDialog;