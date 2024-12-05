import { Task } from "../../models/task.interface";

export const createTask = (tasks: Task) => ({
  type: "CREATE_TASK",
  payload: tasks,
});

export const setFilter = (type: string) => ({
  type: "SET_FILTER",
  payload: type,
});

export const clearAll = () => ({
  type: "CLEAR_ALL",
  payload: '',
});

export const deleteById = (id: string) => ({
  type: "DELETE_BY_ID",
  payload: id,
});

export const updateById = (task: Task) => ({
  type: "UPDATE_BY_ID",
  payload: task,
});

export const setTaskDetail = (task: Task | {}) => ({
  type: "SET_TASK_DETAIL",
  payload: task,
});