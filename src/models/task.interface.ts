export interface Task {
  id: string;
  taskName: string;
  description?: string;
  status: boolean
}

export enum FilterEnum {
  ALL = "all",
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
}
