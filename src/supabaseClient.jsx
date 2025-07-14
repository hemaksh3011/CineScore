import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qzdcdjhgrromwyzdxocm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6ZGNkamhncnJvbXd5emR4b2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMTk2NTAsImV4cCI6MjA2Nzc5NTY1MH0.xT33WKNmexzcxTr7PPGz23kXT9EW47727eOMZbp084c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);