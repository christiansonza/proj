import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mosaic } from 'react-loading-indicators';
import {
  useFetchDataQuery,
  useCreateDataMutation,
  useUpdateDataMutation,
  useDestroyDataMutation,
  useMarkDoneMutation,
} from '../features/TodoSlice';
import style from './css/style.module.css'; 

function Todo() {
  const { data = [], isError, error } = useFetchDataQuery();
  const [createData] = useCreateDataMutation();
  const [updateData] = useUpdateDataMutation();
  const [destroyData] = useDestroyDataMutation();
  const [markDone] = useMarkDoneMutation();

  const [formData, setFormData] = useState({ id: null, name: '', status: false });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        const response = await updateData(formData).unwrap();
        setFormData({name:'', status:false})
        toast.success(response.message || 'Todo updated successfully!');
      } else {
        const response = await createData(formData).unwrap();
        toast.success(response.message || 'Todo created successfully!');
      }
      setFormData({ id: null, name: '', status: false });
      setShowModal(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (todo) => {
    setFormData({ id: todo.id, name: todo.name, status: todo.status });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      const response = await destroyData(id).unwrap();
      toast.success(response.message || 'Deleted successfully!');
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const handleMarkDone = async (id) => {
    try {
      const response = await markDone(id).unwrap();
      const isDone = response.data.status; 
      
      if (isDone) {
        toast.success(response.message || 'Task marked as done!');
      } else {
        toast.info(response.message || 'Task marked as not done!');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all'); 

  const filteredData = data
    .filter((todo) => todo.name.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => {
      if (filter === 'active') return todo.status === true;
      if (filter === 'inactive') return todo.status === false;
      return true; 
    });

  if (isError) return <p>Error: {error?.data?.message || 'Something went wrong'}</p>;

  return (
    <main className={style.mainContainer}>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className={style.pageHeader}>
        <h2>Todo List</h2>
      </div>

      <div className={style.searchAddToDo}>
        <input
          type="text"
          placeholder="Search task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={style.inputSearch}
        />

        <div className={style.filterDropdown}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={style.dropdownSelect}
          >
            <option value="all">All</option>
            <option value="active">Complete</option>
            <option value="inactive">Incomplete</option>
          </select>
        </div>
        <button
          onClick={() => {
            setFormData({ id: null, name: '', status: false });
            setShowModal(true);
          }}
          className={style.addBtn}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2" />
          </svg>
        </button>
      </div>

      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <h3>{formData.id ? 'Edit Todo' : 'Add Todo'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                className={style.addTask}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Add new task"
                required
              />
              <div className={style.modalActions}>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className={style.todoTable}>
        <tbody>
          {filteredData.length === 0 ? (
            <tr><td colSpan="3" style={{  paddingTop:'1rem' }}>No todos found.</td></tr>
          ) : filteredData.map((todo) => (
            <tr key={todo.id}>
              <td colSpan="3">
                <div className={style.rowWrapper}>
                  <div className={style.flexCheckboxName}>
                    <input
                      type="checkbox"
                      checked={todo.status}
                      onChange={() => handleMarkDone(todo.id)}
                    />
                    {todo.name}
                  </div>
                  <div className={style.buttonHolder}>
                    <button className={style.btnActionEdit} onClick={() => handleEdit(todo)}>
                      <svg className={style.SvgAction} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
                      </svg>
                    </button>
                    <button className={style.btnActionDelete} onClick={() => handleDelete(todo.id)}>
                      <svg className={style.SvgAction} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Todo;
