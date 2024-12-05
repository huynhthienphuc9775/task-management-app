import { Task } from "../../models/task.interface";

const initialState = {
  tasks: [],
  filter: "all",
  task: {},
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CREATE_TASK":
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "CLEAR_ALL":
      return { ...state, tasks: [] };

    case "DELETE_BY_ID":
      const deleteTask = state.tasks.filter(
        (task: Task) => task.id !== action.payload
      );
      return { ...state, tasks: deleteTask };

    case "UPDATE_BY_ID":
      const index = state.tasks.findIndex(
        (task: Task) => task.id === action.payload.id
      );
      const update: any = [...state.tasks];
      update[index] = action.payload;
      return { ...state, tasks: update };

    case "SET_TASK_DETAIL":
      return { ...state, task: action.payload };

    default:
      return state;
  }
};

export default userReducer;
