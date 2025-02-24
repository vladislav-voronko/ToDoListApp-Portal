import React, {useState} from 'react';

interface TodoItemProps {
  id: string;
  title: string;
  isCompleted: boolean;
  categoryId: string;
  onUpdate: (id: string, title: string, isCompleted: boolean, categoryId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, isCompleted, categoryId, onUpdate }) => {
  const [checked, setChecked] = useState(isCompleted);

  const handleCheck = async () => {
    const newStatus = !checked;
    setChecked(newStatus); 
    onUpdate(id, title, newStatus, categoryId);
  };

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleCheck}/>
      <span>{title}</span>
    </div>
  );
};

export default TodoItem;
