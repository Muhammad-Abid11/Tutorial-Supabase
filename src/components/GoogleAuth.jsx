import React from 'react';
import { supabase } from '../supabaseClient';

const GoogleAuth = () => {
    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/tasks`, // Redirect after login
            },
        });

        if (error) console.error('Google Login Error:', error.message);
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '30px auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
            }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Login with Google</h3>
            <button onClick={handleGoogleLogin}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px',
                }}>Sign in with Google</button>
        </div>
    );
};

export default GoogleAuth;


/* 
https://supabase.com/docs/guides/auth/social-login/auth-google

⚙️ Enable Google in Supabase Dashboard
Go to Supabase → Auth → Providers

Enable Google 

Enter:
Client ID and Client Secret (from your Google Console -->https://console.cloud.google.com/apis/credentials?) 
(Google sy ye details lyne k bad wahn  (Authorized redirect URIs) me apne Redirect URI 
        supabase k Redirect URI add karein jo apko supabase me google toggle on krne waly section me nichy milyga )

*/
