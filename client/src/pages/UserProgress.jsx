import React from 'react';
import { useGetAllTasksForAdminQuery } from '../redux/slices/api/taskApiSlice'; // Ensure this hook is fetching the right data

const tasks = [
    { taskId: 1, title: "Sample Task", status: "Completed", completion: true, assignedTo: [{ name: "John Doe", isTaskComplete: true }], dueDate: "2023-01-01", priority: "High" }
];

const UserProgress = () => {
    const { data: tasks, isLoading, isError, error } = useGetAllTasksForAdminQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.data?.message || error.message || 'Unknown error'}</div>;

    return (
        <div>
            <h1>User Task Progress Overview</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Completion</th>
                        <th>Assigned To</th>
                        <th>Details</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.taskId}>
                        <td>{task.title}</td>
                        <td>{task.status}</td>
                        <td>{task.completion ? 'Completed' : 'In Progress'}</td>
                        <td>{task.assignedTo.map(user => `${user.name} (${user.isTaskComplete ? 'Completed' : 'Pending'})`).join(', ')}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.priority}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default UserProgress;