import http from "../http-common.tsx";
import { ToDoItem } from "../types/baseTypes.ts";

const getAll = () => {
  return http.get<Array<ToDoItem>>("/ToDoItems");
};

const get = (id: any) => {
  return http.get<ToDoItem>(`/ToDoItems/${id}`);
};

// const create = (data: ITutorialData) => {
//   return http.post<ITutorialData>("/tutorials", data);
// };

const update = (id: any, data: Partial<ToDoItem>) => {
  return http.patch<any>(`/ToDoItems/${id}`, data);
};

// const remove = (id: any) => {
//   return http.delete<any>(`/tutorials/${id}`);
// };

// const removeAll = () => {
//   return http.delete<any>(`/tutorials`);
// };

// const findByTitle = (title: string) => {
//   return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
// };

const ToDoService = {
  getAll,
  get,
  //create,
  update,
  //remove,
  //removeAll,
  //findByTitle,
};

export default ToDoService;