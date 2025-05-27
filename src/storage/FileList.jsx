import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const FileList = ({ user }) => {
  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.storage
        .from('uploads')
        .list(user.email + '/', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) {
        console.error('Fetch error:', error.message);
      } else {
        setFiles(data);
      }
    };

    if (user?.email) fetchFiles();
  }, [user, refresh]);

  const deleteFile = async (fileName) => {
    const filePath = `${user.email}/${fileName}`; // Ensure the file path matches the upload format
    console.log('Deleting file:', filePath);
    const { data, error } = await supabase.storage.from('uploads').remove([filePath]);

    if (error) {
      alert('Delete failed: ' + error.message);
    }
    
    console.log('Delete response:', data);
    if (data && data.length > 0) {
      console.log('File deleted successfully');
      setRefresh(!refresh); // trigger re-fetch
    } else {
      console.log('No files were deleted');
    }
    
  };

  const getPublicUrl = (name) =>
    supabase.storage.from('uploads').getPublicUrl(`${user.email}/${name}`).data.publicUrl;

  return (
    <div>
      <h3>Your Uploaded Files</h3>
      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              <a href={getPublicUrl(file.name)} target="_blank" rel="noreferrer">
                {file.name}
              </a>
              <button onClick={() => deleteFile(file.name)} style={{ marginLeft: 10 }}>
                🗑 Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
