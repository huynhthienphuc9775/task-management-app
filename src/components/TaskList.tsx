import { FC, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { FilterEnum, Task } from "../models/task.interface";
import { deleteById, setTaskDetail, updateById } from "../redux/actions/userActions";
import CreateEditTask from "./CreateEditTask";
import Confirm from "./Confirm";

interface Props {
    tasks: Task[]
}

const TaskList: FC<Props> = ({ tasks }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)
    const { app: { task } } = useSelector((state: any) => state);


    const dispatch = useDispatch();

    const handleCheckboxChange = (task: Task, checked: boolean) => {
        task.status = checked
        dispatch(updateById(task))
    };

    const onDeleteTask = async () => {
        await dispatch(deleteById(task.id))
        await dispatch(setTaskDetail({}))
        setIsConfirm(false)
    }

    return (
        <>
            {
                tasks?.map((task: Task) => {
                    return (
                        <div key={task.id} className="border-2 border-gray-200 mb-2">
                            <div className="flex items-center justify-between w-full p-5 font-medium rtl:text-right bg-gray-100 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                <div className="flex items-center gap-2">
                                    <input onChange={(e) => handleCheckboxChange(task, e.target.checked)} defaultChecked={task.status} type="checkbox" className="round rounded-none" />
                                    <span className={`${task.status && 'line-through'}`}>{task.taskName}</span>
                                </div>
                                <div className=" flex space-x-3">
                                    <button type="button">
                                        <CiEdit onClick={() => { dispatch(setTaskDetail(task)); setIsOpen(true) }} size={20} className=" text-gray-500 hover:text-yellow-500" />
                                    </button>
                                    <button onClick={() => { dispatch(setTaskDetail(task)); setIsConfirm(true) }} type="button">
                                        <AiOutlineDelete size={20} className=" text-gray-500 hover:text-red-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="border-t-2 border-gray-200">
                                <div className="p-5">
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">{task.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <CreateEditTask onClose={() => { setIsOpen(false); dispatch(setTaskDetail({})) }} isOpen={isOpen} />
            <Confirm onClose={() => { dispatch(setTaskDetail({})); setIsConfirm(false) }} onOk={() => onDeleteTask()} isOpen={isConfirm} />

        </>

    );
};

export default TaskList;
