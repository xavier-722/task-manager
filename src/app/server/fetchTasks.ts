import { getTasks } from '../../lib/actions/task';
export async function fetchTasks() {
    const tasks = await getTasks();
    return tasks;
import { fetchTasks } from './server/fetchTasks';
import TaskManager from '@/components/TaskManager';
