import {createClient } from '@supabase/supabase-js'
// import { useState} from 'react'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey  = process.env.REACT_APP_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)


// const useSupabase = () => {
//     const [session, setSession] = useState(Session)(
//       supabaseClient.auth.session()
//     );


// supabaseClient.auth.onAuthStateChange(async (_event, session) => {
//     setSession(session);
// });

// return (session, supabaseClient)

// }

// export { useSupabase, supabaseClient };

