export interface ToDoItem {
    id: string;
    title: string;
    isCompleted: boolean;
    categoryId: string;
  }
  
export interface Category {
  id: string;
  name: string;
  description: string;
}