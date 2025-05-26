import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const filePath = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from('uploads') // bucket name
      .upload(filePath, file);  // upload the file to the bucket

    if (error) {
      setError(error.message);
    } else {
      const { data: publicUrlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath); // Get the public URL of the uploaded file

      setUploadUrl(publicUrlData.publicUrl); // Set the public URL to display the uploaded file
      setError(''); // Clear any previous errors
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {uploadUrl && (
        <div>
          <p>Uploaded File:</p>
          <a href={uploadUrl} target="_blank" rel="noreferrer">{uploadUrl}</a>
          <img src={uploadUrl} alt="uploaded" width="200" />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUploader;
