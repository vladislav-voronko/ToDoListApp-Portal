import React from 'react';
import { ListItem, ListItemText, ListItemButton, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Category as CategoryType } from "../types/baseTypes";

interface CategoryProps {
  item: CategoryType;
  onClick: (item: CategoryType) => void;
  onDelete: (id: string) => void;
}

const Category: React.FC<CategoryProps> = ({ item, onClick, onDelete }) => {
  
  return (
    <ListItem>
    <ListItemButton onClick={() => onClick(item)}>
      <ListItemText primary={item.name} />
      <IconButton edge="end" aria-label="delete" onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>
        <DeleteIcon />
      </IconButton>
    </ListItemButton>
  </ListItem>
  );
};

export default Category;