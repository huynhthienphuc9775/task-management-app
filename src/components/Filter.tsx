
import { useState } from 'react';
import CreateEditTask from './CreateEditTask';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/actions/userActions';
import { FilterEnum } from '../models/task.interface';

const Filter = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { app: { filter } } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const onFilter = (type: string) => {
        dispatch(setFilter(type))
    }

    return (
        <div className="bg-white w-full rounded-lg px-4 py-4 flex justify-between">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button onClick={() => onFilter(FilterEnum.ALL)} type="button" className={`flex-1 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 ${filter === FilterEnum.ALL && 'z-10 ring-2 ring-blue-700 text-blue-700'}`}>
                    All
                </button>
                <button onClick={() => onFilter(FilterEnum.COMPLETE)} type="button" className={`flex-1 px-4 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 ${filter === FilterEnum.COMPLETE && 'z-10 ring-2 ring-blue-700 text-blue-700'}`}>
                    Complete
                </button>
                <button onClick={() => onFilter(FilterEnum.INCOMPLETE)} type="button" className={`flex-1 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 ${filter === FilterEnum.INCOMPLETE && 'z-10 ring-2 ring-blue-700 text-blue-700'}`}>
                    Incomplete
                </button>
            </div>
            <button onClick={() => setIsOpen(true)} type="button" className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 ">
                Add
            </button>
            <CreateEditTask onClose={() => setIsOpen(false)} isOpen={isOpen} />
        </div>
    );
};

export default Filter;
