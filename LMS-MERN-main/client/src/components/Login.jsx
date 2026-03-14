import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from "../GlobalContext";
import Toast from "./Toast";
import { API_BASE } from '../api';
import { supabase } from '../config/supabaseClient';

const Login= () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    let {login,setLogin,userAuth,setUserAuth} = useGlobalContext()
  
    const [userLoginData, setUserLoginData] = useState({
      name: '',
      email: ''
    });
    let handleChange = (e) => {
      setUserLoginData({ ...userLoginData, [e.target.name]: e.target.value })
    }

    const showToast = (message, duration = 2000) => {
        setToast({ message });
        return new Promise((resolve) => {
          setTimeout(() => {
            setToast(null);
            resolve();
          }, 1000);
        });
      };
  
    let handleSubmit = async (e) => {
      e.preventDefault();
     try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userLoginData.email,
            password: userLoginData.password
        });

        if (error) {
            showToast(error.message);
            return;
        }

        let role = data.user.user_metadata?.role || 'student';
        setLogin(true);

        if (role === 'student' || role === 'faculty' || role === 'teacher' || role === 'admin') {
            await showToast("Login Successful");
            localStorage.setItem('token', data.session.access_token);
            setUserAuth(true);
            setTimeout(() => {
                if (role === 'student') navigate('/studentMain');
                else if (role === 'faculty' || role === 'teacher') navigate('/teacherMain');
                else if (role === 'admin') navigate('/admin-dashboard');
            }, 2000);
        } else {
            showToast("Role not recognized!");
        }

     } catch (error) {
        console.error(error)
        showToast("Something went wrong!");
     }
    }



    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" id='flex-container' >
                <div id='animation-contanier' style={{ marginBottom: '0' }}>
                    <div>
                        <a className="flex items-center ps-2.5 mb-3">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white" style={{ fontSize: '1.8rem', marginRight: '15px' }}>E-learning</span>
                        </a>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" style={{ fontSize: '1.8rem' }}>
                    <form className="space-y-6"  onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={userLoginData.email}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900" style={{ fontSize: '1.0rem' }}>
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    value={userLoginData.password}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                style={{ fontSize: '1.0rem' }}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                </div>
                    <span className='mt-4 text-sm'>New user? <a href="/ask">Register</a></span>
                    {toast && <Toast message={toast.message} onClose={toast.onClose} />}
            </div>

        </div>

    )
}

export default Login