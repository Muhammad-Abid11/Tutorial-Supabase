import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://iikvavyghoxdfjmedpce.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpa3ZhdnlnaG94ZGZqbWVkcGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODk1NDAsImV4cCI6MjA2MzQ2NTU0MH0.XX6ZV2xbR6JGxqULaW3qtTDsR4f1P05imXM3JmPyYvc";

console.log('process',process.env)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 

//npm i @supabase/supabase-js
//npm i react-router-dom

//1 auth
