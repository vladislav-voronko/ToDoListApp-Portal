import React, { useState, useEffect } from 'react';
import ToDoService from "../services/ToDoService";
import CategoryService from "../services/CategoryService";
import ToDoItemDialog from "./ToDoItemDialog";
import ToDoItem from "./ToDoItem";
import { ToDoItem as ToDoItemType, Category as CategoryType } from "../types/baseTypes";
import { Container, TextField, Button, Select, MenuItem, Typography, Box, List, FormControl, InputLabel } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./ToDoList.css";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
});

const ToDoList: React.FC = () => {
  const [toDoItems, setToDoItems] = useState<ToDoItemType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newItemTitle, setNewItemTitle] = useState<string>("");
  const [newItemCategory, setNewItemCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ToDoItemType | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

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
      const newItem = { title: newItemTitle, categoryId: newItemCategory, isCompleted: false } as ToDoItemType;
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

  const toggleComplete = async (id: string) => {
    try {
      const item = toDoItems.find((item) => item.id === id);
      if (item) {
        const updatedItem = { ...item, isCompleted: !item.isCompleted };
        await ToDoService.update(id, updatedItem);
        setToDoItems(toDoItems.map((item) => (item.id === id ? updatedItem : item)));
      }
    } catch (error) {
      console.error("Failed to update to-do item:", error);
    }
  };

  const handleItemClick = (item: ToDoItemType) => {
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
      const updatedItem = { id, title, categoryId, isCompleted } as ToDoItemType;
      await ToDoService.update(id, updatedItem);
      setToDoItems(toDoItems.map((item) => (item.id === id ? updatedItem : item)));
      setSelectedItem(null);
    } catch (error) {
      console.error("Failed to update to-do item:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box mt={5}>
          <Typography variant="h4" component="h2" gutterBottom>
            To-Do List
          </Typography>
          <AddItemForm
            newItemTitle={newItemTitle}
            setNewItemTitle={setNewItemTitle}
            newItemCategory={newItemCategory}
            setNewItemCategory={setNewItemCategory}
            categories={categories}
            addItem={addItem}
          />
          {selectedItem && (
            <ToDoItemDialog
              open={!!selectedItem}
              item={selectedItem}
              onUpdate={updateItem}
              onChange={handleItemChange}
              onClose={handleCancel}
            />
          )}
          <List>
            {toDoItems.sort((a,b) =>(a.title.localeCompare(b.title))).map((item) => (
              <ToDoItem
                key={item.id}
                item={item}
                onToggleComplete={toggleComplete}
                onDelete={deleteItem}
                onClick={handleItemClick}
              />
            ))}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const AddItemForm: React.FC<{
  newItemTitle: string;
  setNewItemTitle: React.Dispatch<React.SetStateAction<string>>;
  newItemCategory: string;
  setNewItemCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: CategoryType[];
  addItem: () => void;
}> = ({ newItemTitle, setNewItemTitle, newItemCategory, setNewItemCategory, categories, addItem }) => {

  return (
    <Box display="flex">
      <TextField
        label="What needs to be done?"
        value={newItemTitle || ""}
        onChange={(e) => setNewItemTitle(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mr: 1 }}
      />
      <FormControl fullWidth variant="outlined" sx={{ mr: 1 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          label="Category"
          labelId='category-select-label'
          value={newItemCategory || ""}
          onChange={(e) => setNewItemCategory(e.target.value as string)}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={addItem}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </Box>
  );
};

export default ToDoList;