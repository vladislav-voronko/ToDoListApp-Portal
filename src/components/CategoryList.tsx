import React, { useState, useEffect, useRef } from 'react';
import CategoryService from "../services/CategoryService";
import CategoryDialog from "./CategoryDialog";
import { Category as CategoryType } from "../types/baseTypes";
import { Container, TextField, Button, Typography, Box, List } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./CategoryList.css";
import Category from './Category';

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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCategory]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box mt={5}>
          <Typography variant="h4" component="h2" gutterBottom>
            Categories
          </Typography>
          <AddItemForm
            newCategoryName={newCategoryName}
            setNewCategoryName={setNewCategoryName}
            newCategoryDescription={newCategoryDescription}
            setNewCategoryDescription={setNewCategoryDescription}
            addCategory={addCategory}
          />
          {selectedCategory && <div className="overlay" />}
          {selectedCategory ? (
            <div className="category-dialog" ref={dialogRef}>
              <CategoryDialog
                item={selectedCategory}
                onUpdate={updateCategory}
                onChange={handleCategoryChange}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <List>
              {categories.sort((a,b) =>(a.name.localeCompare(b.name))).map((item) => (
                <Category
                  key={item.id}
                  item={item}
                  onDelete={deleteCategory}
                  onClick={handleCategoryClick}
                />
              ))}
            </List>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const AddItemForm: React.FC<{
  newCategoryName: string;
  newCategoryDescription: string;
  setNewCategoryDescription: React.Dispatch<React.SetStateAction<string>>;
  setNewCategoryName: React.Dispatch<React.SetStateAction<string>>;
  addCategory: () => void;
}> = ({ newCategoryName, newCategoryDescription, setNewCategoryName, setNewCategoryDescription, addCategory }) => {

  return (
    <Box display="flex">
      <TextField
        label="Category name"
        value={newCategoryName || ""}
        onChange={(e) => setNewCategoryName(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mr: 1 }}
      />
      <TextField
        label="Description"
        value={newCategoryDescription || ""}
        onChange={(e) => setNewCategoryDescription(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mr: 1 }}
      />
      <Button
        onClick={addCategory}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </Box>
  );
};

export default CategoryList;