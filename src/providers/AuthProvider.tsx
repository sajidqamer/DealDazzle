import { supabase } from '@/lib/supabase';
 import { Session } from '@supabase/supabase-js';
 import {
   PropsWithChildren,
   createContext,
   useContext,
   useEffect,
   useMemo,
   useState,
 } from 'react';
 
 type AuthData = {
   session: Session | null;
   profile: any;
   loading: boolean;
   isAdmin: boolean;
 };
 
 const AuthContext = createContext<AuthData>({
   session: null,
   loading: true,
   profile: null,
   isAdmin: false,
 });
 
 export default function AuthProvider({ children }: PropsWithChildren) {
   const [session, setSession] = useState<Session | null>(null);
   const [profile, setProfile] = useState(null);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     const fetchSession = async () => {
       const {
         data: { session },
       } = await supabase.auth.getSession();
 
       setSession(session);
 
       if (session) {
         // fetch profile
         const { data } = await supabase
           .from('profiles')
           .select('*')
           .eq('id', session.user.id)
           .single();
         setProfile(data || null);
       }
 
       setLoading(false);
     };
 
     fetchSession();
     const {data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
       setSession(session);
     });

     return () => {
       subscription.unsubscribe(); // 🔥 Important!
  };
   }, []);
 
   

// // useEffect(() => {
// //   const fetchSession = async () => {
// //     const {
// //       data: { session },
// //     } = await supabase.auth.getSession();

// //     setSession(session);

// //     if (session) {
// //       const { data } = await supabase
// //         .from('profiles')
// //         .select('*')
// //         .eq('id', session.user.id)
// //         .single();
// //       setProfile(data || null);
// //     }

// //     setLoading(false);
// //   };

// //   fetchSession();

// //   const {
// //     data: { subscription },
// //   } = supabase.auth.onAuthStateChange(async (_event, session) => {
// //     setSession(session);

// //     if (session) {
// //       const { data } = await supabase
// //         .from('profiles')
// //         .select('*')
// //         .eq('id', session.user.id)
// //         .single();
// //       setProfile(data || null);
// //     } else {
// //       setProfile(null);
// //     }
// //   });



// //   return () => {
// //     subscription.unsubscribe(); // 🔥 Important!
// //   };
// // }, []);



   return (
     <AuthContext.Provider
       value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}
     >
       {children}
     </AuthContext.Provider>
   );
 }
 
 export const useAuth = () => useContext(AuthContext);
