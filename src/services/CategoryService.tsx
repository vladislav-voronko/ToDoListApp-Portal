import http from "../http-common.tsx";
import { Category } from "../types/baseTypes.ts";

const getAll = () => {
  return http.get<Array<Category>>("/Categories");
};

const get = (id: any) => {
  return http.get<Category>(`/Categories/${id}`);
};

const create = (data: Category) => {
  return http.post<Category>("/Categories", data);
};

const update = (id: any, data: Partial<Category>) => {
  return http.patch<any>(`/Categories/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/Categories/${id}`);
};

// const removeAll = () => {
//   return http.delete<any>(`/tutorials`);
// };

// const findByTitle = (title: string) => {
//   return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
// };

const CategoryService = {
  getAll,
  get,
  create,
  update,
  remove,
  //removeAll,
  //findByTitle,
};

export default CategoryService;