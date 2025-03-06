import React, { useState } from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
};

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setTaskToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      onDelete(taskToDelete);
      setIsModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  return (
    <>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {tasks.length === 0 ? (
          <li>NO TASKS YET</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                {task.title} - {task.description}
              </span>
              <div>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ffcc00',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                  onClick={() => onEdit(task)}
                >
                  EDIT
                </button>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ff4d4d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeleteClick(task.id)}
                >
                  DELETE
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <p>Are you sure you want to delete this task?</p>
          <button
            style={{
              padding: '5px 10px',
              backgroundColor: '#ff4d4d',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            style={{
              padding: '5px 10px',
              backgroundColor: '#ccc',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
            onClick={cancelDelete}
          >
            No
          </button>
        </div>
      )}

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={cancelDelete}
        />
      )}
    </>
  );
};

export default TaskList;