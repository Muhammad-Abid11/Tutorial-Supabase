import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const FileUploader = ({ user }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // console.log('user',user)
  const handleUpload = async () => {
    if (!file || !user) return;

    const filePath = `${user.email}/${Date.now()}_${file.name}`;

    console.log('filePath',filePath)
    const { error } = await supabase.storage
      .from('uploads') // bucket name
      .upload(filePath, file);  // upload the file to the bucket

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setFile(null); // clear the file input
      setMessage('✅ File uploaded!');
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploader;
