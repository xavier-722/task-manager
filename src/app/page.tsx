'use client';
import { useEffect, useReducer, useState, useTransition } from 'react';
import { showNotification } from '@mantine/notifications';
import { Task, getTasks, saveTasks } from '../../lib/actions/task';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

type State = {
  past: Task[][];
  present: Task[];
  future: Task[][];
};

type Action =
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'EDIT_TASK'; task: Task }
  | { type: 'DELETE_TASK'; id: number }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_TASKS'; tasks: Task[] };

const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        past: [...state.past, state.present],
        present: [...state.present, action.task],
        future: [],
      };
    case 'EDIT_TASK':
      return {
        past: [...state.past, state.present],
        present: state.present.map((task) =>
          task.id === action.task.id ? action.task : task
        ),
        future: [],
      };
    case 'DELETE_TASK':
      return {
        past: [...state.past, state.present],
        present: state.present.filter((task) => task.id !== action.id),
        future: [],
      };
    case 'UNDO':
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, state.past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      };
    case 'REDO':
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      };
    case 'SET_TASKS':
      return {
        past: [],
        present: action.tasks,
        future: [],
      };
    default:
      return state;
  }
};

function TaskManager({ initialTasks }: { initialTasks: Task[] }) {
  const [state, dispatch] = useReducer(taskReducer, {
    past: [],
    present: initialTasks,
    future: [],
  } as State);
  const [isPending, startTransition] = useTransition();
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      dispatch({ type: 'SET_TASKS', tasks });
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const saveCurrentTasks = async () => {
      await saveTasks(state.present);
    };
    saveCurrentTasks();
  }, [state.present]);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
    };
    startTransition(() => {
      dispatch({ type: 'ADD_TASK', task: newTask });
      showNotification({ message: 'Task added successfully', color: 'green' });
    });
  };

  const handleEditTask = (title: string, description: string) => {
    if (editTask) {
      const updatedTask: Task = {
        ...editTask,
        title,
        description,
      };
      startTransition(() => {
        dispatch({ type: 'EDIT_TASK', task: updatedTask });
        setEditTask(null);
        showNotification({ message: 'Task updated successfully', color: 'green' });
      });
    }
  };

  const handleDeleteTask = (id: number) => {
    startTransition(() => {
      dispatch({ type: 'DELETE_TASK', id });
      showNotification({ message: 'Task deleted successfully', color: 'green' });
    });
  };

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO' });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#fff', color: '#333' }}>
      <h1>TASK MANAGER</h1>
      <TaskForm
        onSubmit={editTask ? handleEditTask : handleAddTask}
        initialTitle={editTask?.title}
        initialDescription={editTask?.description}
        buttonText={editTask ? 'UPDATE YOUR TASK' : 'ADD TASK'}
      />
      <TaskList tasks={state.present} onEdit={setEditTask} onDelete={handleDeleteTask} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleUndo} disabled={state.past.length === 0} loading={isPending}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          UNDO
        </button>
        <button onClick={handleRedo} disabled={state.future.length === 0} loading={isPending}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          REDO
        </button>
      </div>
      {isPending && <div>LOADING...</div>}
    </div>
  );
}

export default async function pages() {
  const initialTasks = await getTasks();
  return <TaskManager initialTasks={initialTasks} />;
}