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

  const getPublicUrl = (name) => // get the public URL for the file
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
              <img 
                src={getPublicUrl(file.name)} alt={file.name} style={{ maxWidth: 200 }}/>
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

/* 
🔧 Fix: Add Get Policy to Supabase Storage
1. Go to your Supabase project
Navigate to Storage → uploads (or your bucket name)

2. Click on "Policies"
3. Click "New Policy"
4. Set the policy type to "Get"

CREATE POLICY "Enable users to view their own data only" ON "storage"."objects"
AS PERMISSIVE FOR SELECT
TO authenticated
USING ((select auth.uid()) = owner)

👉 Now any authenticated user can get own uploaded files


🔧 Fix: Add Delete Policy to Supabase Storage
Same steps as above, but choose "Delete" policy type
2. Click "New Policy"

CREATE POLICY "Enable users to delete their own data only" ON "storage"."objects"
AS PERMISSIVE FOR DELETE
TO authenticated
USING ((select auth.uid()) = owner)

// This policy allows authenticated users to delete only their own files
// The owner is the user who uploaded the file

*/