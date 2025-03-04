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
  
  export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
    return (
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
                  onClick={() => onDelete(task.id)}
                >
                  DELETE
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    );
  }