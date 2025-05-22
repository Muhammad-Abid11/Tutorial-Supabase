import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Tasks = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  // Fetch user session and tasks
  useEffect(() => {
    const getSessionAndTasks = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate('/');
        return;
      }

      setUser(session.user);
      fetchTasks(session.user.id);
    };

    getSessionAndTasks(); //fetch user's session and tasks
  }, []);

  const fetchTasks = async (userId) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setTasks(data);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const { error } = await supabase.from('tasks').insert({
      title: newTask,
      user_id: user.id,
    });

    if (error) console.error(error);
    else {
      setNewTask('');
      fetchTasks(user.id);
    }
  };

  const toggleComplete = async (task) => {
    const { error } = await supabase
      .from('tasks')
      .update({ is_complete: !task.is_complete })
      .eq('id', task.id);

    if (error) console.error(error);
    else fetchTasks(user.id);
  };

  const deleteTask = async (taskId) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) console.error(error);
    else fetchTasks(user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          placeholder="New Task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleComplete(task)}
              style={{ textDecoration: task.is_complete ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;


//2 CRUD operation