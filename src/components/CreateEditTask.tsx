
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FC, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Task } from '../models/task.interface';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateById } from '../redux/actions/userActions';

interface Props {
    isOpen: boolean,
    onClose: () => void,
}

const CreateEditTask: FC<Props> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { app: { task } } = useSelector((state: any) => state);
    useEffect(() => {
        if (task) {
            const { id, taskName, description, status } = task;
            setValue('id', id)
            setValue('taskName', taskName)
            setValue('description', description)
            setValue('status', status)
        }
    }, [task])

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Task>();

    const onSubmit = (data: Task) => {
        if (task && task.id) {
            dispatch(updateById(data))
        } else {
            data.id = 'id-' + Math.random().toString(36).substr(2, 9)
            dispatch(createTask(data))
        }
        reset()
        onClose()
    };



    return (
        <Dialog open={isOpen} onClose={() => { onClose(); reset() }} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogPanel
                            transition
                            className="sm:w-[600px] w-[90vw] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 sm:ml-4 sm:mt-0 text-left w-full">
                                        <DialogTitle as="h1" className="text-base mb-3 font-semibold text-gray-900">
                                            {task && task.id ? 'Edit task' : 'Create task'}
                                        </DialogTitle>
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                                                <span className='text-red-600'>*</span> Task Name
                                            </label>
                                            <input
                                                id="taskName"
                                                type="text"
                                                placeholder="Enter task title"
                                                {...register("taskName", { required: "Task Name is required" })}
                                                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.taskName ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {
                                                errors?.taskName && <span className='text-red-600'>{errors?.taskName.message}</span>
                                            }
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                rows={4}
                                                placeholder="Enter task description"
                                                {...register("description")}
                                                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />

                                        </div>

                                        <div className="mb-4 flex gap-3 items-center">
                                            <label htmlFor="status" className="block text-gray-700 font-medium">
                                                Status
                                            </label>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input {...register("status")} type="checkbox" value="" className="sr-only peer" />
                                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                >
                                    {task && task.id ? 'Edit' : 'Create'}
                                </button>
                                <button
                                    onClick={() => { onClose(); reset() }}
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </form>

                </div>
            </div>
        </Dialog>
    );
};

export default CreateEditTask;
