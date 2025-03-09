import React from 'react';
import { ListItem, ListItemText, ListItemButton, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToDoItem as ToDoItemType } from "../types/baseTypes";

interface ToDoItemProps {
  item: ToDoItemType;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (item: ToDoItemType) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ item, onToggleComplete, onDelete, onClick }) => {
  return (
    <ListItem>
      <ListItemButton onClick={() => onClick(item)}>
        <Checkbox
          checked={item.isCompleted}
          onChange={(e) => {
            e.stopPropagation();
            onToggleComplete(item.id);
          }}
        />
        <ListItemText primary={item.title} />
        <IconButton edge="end" aria-label="delete" onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
};

export default ToDoItem;