import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateTodoStatus, deleteTodo, editTodo } from '../store/todoSlice'; // Добавлено новое действие editTodo
import Filter from './Filter';
import s from './TodoList.module.scss'

const TodoList: React.FC = () => {
    const MAX_NAME_LENGTH = 30;

    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);

    const [toggleStatus, setToggleStatus] = useState<'в работе' | 'выполнено'>('в работе');
    const [filterStatus, setFilterStatus] = useState<string>('все');

    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');
    const [editedDesc, setEditedDesc] = useState('');

    useEffect(() => {
        if (editingTodoId !== null) {
            const todoToEdit = todos.find((todo) => todo.id === editingTodoId);
            if (todoToEdit) {
                setEditedName(todoToEdit.name);
                setEditedDesc(todoToEdit.desc);
            }
        }
    }, [editingTodoId, todos]);

    const handleToggleStatus = () => {
        setToggleStatus((prevStatus) => (prevStatus === 'в работе' ? 'выполнено' : 'в работе'));
    };

    const handleUpdateStatus = (id: number, currentStatus: 'в ожидании' | 'в работе' | 'выполнено') => {
        const newStatus = currentStatus === 'в ожидании' ? 'в работе' : currentStatus === 'в работе' ? 'выполнено' : 'в ожидании';
        dispatch(updateTodoStatus({ id, status: newStatus }));
    };

    const handleFilterStatusChange = (status: string) => {
        setFilterStatus(status);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id));

    };

    const handleEdit = (id: number, name: string, desc: string) => {
        setEditingTodoId(id);
        setEditedName(name.slice(0, MAX_NAME_LENGTH));
        setEditedDesc(desc);
    };

    const handleSave = (id: number) => {
        // Вызывает действие для обновления значения
        const truncatedName = editedName.slice(0, MAX_NAME_LENGTH);
        dispatch(editTodo({ id, name: truncatedName, desc: editedDesc }));
        // Обнуляет состояния для отслеживания изменений ввода
        setEditingTodoId(null);
    };

    const filteredTodos =
        filterStatus === 'все' ? todos : todos.filter((todo) => todo.status === filterStatus);

    if (todos.length === 0) {
        return null;
    }

    return (
        <div className={s.list}>
            <Filter onStatusChange={handleFilterStatusChange} />

            <div className={s.items}>
                {filteredTodos.map((todo) => (
                    <div key={todo.id} className={`${s.item} ${todo.status === 'выполнено' ? s.doneClass : todo.status === 'в работе' ? s.onWorkClass : s.defaultClass}`}>
                        {editingTodoId === todo.id ? (
                            // Форма редактирования
                            <div className={s.edit}>
                                <input className={s.input}
                                    defaultValue={editedName}
                                    onChange={(e) => setEditedName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                                    maxLength={MAX_NAME_LENGTH}
                                    placeholder="Enter name"
                                />
                                <textarea className={s.textarea}
                                    value={editedDesc}
                                    onChange={(e) => setEditedDesc(e.target.value)}
                                    placeholder="Enter description"
                                />
                                <button className={`btn ${s.btn}`} onClick={() => handleSave(todo.id)}>Save</button>
                            </div>
                        ) : (
                            // Отображение задачи
                            <div>
                                <p className={s.name}>{todo.name}</p>
                                <p className={s.text}>{todo.desc}</p>
                                <p className={s.status}>{todo.status}</p>
                                <button className={`btn ${s.change}`} onClick={() => handleUpdateStatus(todo.id, todo.status)}>
                                    {todo.status === 'в ожидании' && <img src="icons/pend.svg" alt="в ожидании" />}
                                    {todo.status === 'в работе' && <img src="icons/work.svg" alt="On Work" />}
                                    {todo.status === 'выполнено' && <img src="icons/done.svg" alt="выполнено" />}
                                </button>
                                <div className={s.buttons}>
                                    <button className={`btn ${s.update}`} onClick={() => handleEdit(todo.id, todo.name, todo.desc)}>Изменить</button>
                                    <button className={`btn ${s.delete}`} onClick={() => handleDelete(todo.id)}>Удалить</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
