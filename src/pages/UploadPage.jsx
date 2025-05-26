import React from 'react';
import FileUploader from '../storage/FileUploader';

const UploadPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}>
      <h2>Upload a File</h2>
      <FileUploader />
    </div>
  );
};

export default UploadPage;


/* 
🛠 Step-by-Step Implementation
🔧 Step 1: Create a Storage Bucket in Supabase
Go to Supabase Dashboard → Storage

Click "New Bucket"

Name: uploads

Access: Public (or private if you want restricted access)

*/



/* 
--ERROR: new row violates row-level security policy for table "storage.objects"
📌 Why it happens:
Supabase uses a PostgreSQL table under the hood for each bucket
When RLS is enabled, every insert, update, or select must pass a policy
Your current user doesn't match any policy, so it gets blocked

🔧 Fix: Add Upload Policy to Supabase Storage
1. Go to your Supabase project
Navigate to Storage → uploads (or your bucket name)

2. Click on the ⚙️ "Policies" tab
You'll see a table called: storage.objects

3. Click "New Policy"
- Get started quickly by using the template
-📄 click on Allow Authenticated Users to Upload Files
- click "Use this template"
- then click on Review
✅ Then click "Save Policy"

👉 Now any authenticated user can upload files to this bucket

*/
