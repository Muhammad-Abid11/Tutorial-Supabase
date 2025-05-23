import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FaSignOutAlt, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const Tasks = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

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

    getSessionAndTasks();
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
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Welcome, {user?.email}</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          value={newTask}
          placeholder="New Task"
          onChange={(e) => setNewTask(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          <FaPlus /> Add
        </button>
      </form>

      <ul style={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <span
              onClick={() => toggleComplete(task)}
              style={{
                ...styles.taskTitle,
                textDecoration: task.is_complete ? 'line-through' : 'none',
                color: task.is_complete ? 'gray' : '#333',
              }}
            >
              <FaCheck style={{ marginRight: '8px', color: task.is_complete ? 'green' : '#ccc' }} />
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  form: {
    display: 'flex',
    marginBottom: '20px',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  taskList: {
    listStyleType: 'none',
    padding: 0,
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    marginBottom: '8px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  taskTitle: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Tasks;


/* 

🧱 Step 1: Set up the tasks table in Supabase
Go to Supabase Dashboard: https://supabase.com/

Navigate to Table Editor → New Table

Table name: tasks

Add these columns:
| Name         | Type      | Special                            |
| ------------ | --------- | ---------------------------------- |
| id           | UUID      | Primary Key (uuid\_generate\_v4()) |
| user\_id     | UUID      | Foreign Key → `auth.users.id`      |
| title        | Text      |                                    |
| is\_complete | Boolean   | Default: `false`                   |
| created\_at  | Timestamp | Default: now()                     |

Ensure Row-Level Security (RLS) is enabled and add this policy:

-- Allow authenticated users to access their own tasks
CREATE POLICY "Users can access their own tasks"
ON tasks
FOR ALL
USING (auth.uid() = user_id);

*/