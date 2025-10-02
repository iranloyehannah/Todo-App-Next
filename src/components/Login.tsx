'use client';

import { useState,useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '@/auth';
import { useAuth } from '@/components/AuthProvider';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';

export default function Login() {
  const { user } = useAuth() as { user: User | null };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

// useEffect(() => {
//     if (user) {
//       router.push('/todo-list'); 
//     }
//   }, [user, router]);


const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await loginUser(email, password);
    router.push('/todo-list');
  } catch (error: unknown) {
    alert(error instanceof Error ? error.message : 'An unknown error occurred');
  }
};

  const handleRegister = () => {
    router.push('/'); 
  }
  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login'); 
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        background: "white",
      }}
    >
      <h1 className="text-center font-bold text-3xl mb-4 text-gray-800">
        Login
      </h1>
      <p className="w-full  text-center text-sm text-gray-400">
        Enter your details below to login to your account
      </p>
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      
        <form 
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-4 mt-4"
        >
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
            type="email"
            placeholder="JohnDoe27@ymail.com"
            className=" w-full  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="**********"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-2">
            <Button
              type="button"
              onClick={handleLogin}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
    
                py: 1.5,
                fontSize: "14px",
                fontWeight: 600,
                "&:hover": {
                  background: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white ",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Login
            </Button>
              <Button
              type="submit"
              onClick={handleRegister}
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
    
                py: 1.5,
                fontSize: "14px",
                fontWeight: 600,
                "&:hover": {
                  background: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white ",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Register
            </Button>
          </div>
        </form>
    </div>
    </Box>
  );
}



// 'use client';

// import { useState,useEffect, FormEvent } from 'react';
// import { loginUser, registerUser, logoutUser } from '@/auth';
// import { useAuth } from '@/components/AuthProvider';
// import { User } from 'firebase/auth';
// import { useRouter } from 'next/navigation';
// import { Button } from '@mui/material';

// export default function Login() {
//   const { user } = useAuth() as { user: User | null };
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter(); 

// useEffect(() => {
//     if (user) {
//       router.push('/todo-list'); 
//     }
//   }, [user, router]);

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//     e.stopPropagation();
//     try {
//       await loginUser(email, password);
//       router.push('/todo-list'); 
//     } catch (error: unknown) {
//       alert(error instanceof Error ? error.message : 'An unknown error occurred');
//     }
//   };

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await registerUser(email, password);
//       router.push('/todo-list');  
//     } catch (error: unknown) {
//       alert(error instanceof Error ? error.message : 'An unknown error occurred');
//     }
//   };

//   const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await logoutUser();
//       router.push('/login'); 
//     } catch (error: unknown) {
//       alert(error instanceof Error ? error.message : 'An unknown error occurred');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center space-y-4">
      
//         <form onSubmit={handleLogin}>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="email" className="text-sm font-medium text-gray-700">
//               Email:
//             </label>
//             <input
//               id="email"
//             type="email"
//             placeholder="Email"
//             className="border p-2 rounded w-64"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//           <input
//             id="password"
//             type="password"
//             placeholder="Password"
//             className="border p-2 rounded w-64"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <Button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Login
//             </Button>
//                     <Button
//               type="submit"
//               className="px-4 py-2 bg-green-500 text-white rounded"
//             >
//               Register
//             </Button>
//           </div>
//         </form>
//     </div>
//   );
// }