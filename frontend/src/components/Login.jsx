import { Brain, Eye } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function Login({toggleLogin, isVisible, toggleVisibility}){
    const {formData, setFormData,setGameStarted} = useContext(UserContext);
    const [loginError, setLoginError] = useState('');
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev,[name]:value}));
        setLoginError('');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            if(response.ok){
                setGameStarted(true);
                setLoginError('');
            }else {
                setLoginError(data.message || 'Failed to login');
            }
        }catch(err){
            console.log('Error during login');
            alert('Error during login',err);
        }
    }
    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white max-w-md w-full p-12 rounded-2xl shadow-lg">
                    {/* <div className="text-5xl font-bold text-center text-blue-300 mb-4">O</div> */}
                    <div className="flex gap-5 p-3 ml-5">
                        <Brain className="text-blue-500 h-12 w-12"/>
                        <h1 className="text-2xl font-extrabold text-center mb-4 flex gap-2">Welcome to <p className="text-blue-500">fern.</p></h1>
                    </div>
                    <div className="flex justify-center mb-4">
                        <h1 className="text-lg font-bold text-blue-400">Login</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <input name="username" value={formData.username} onChange={handleChange} className="border rounded w-full mb-6 p-3" placeholder="Enter your username" type="text" />
                            <div className="text-xs absolute top-12 left-3 text-red-700">{loginError}</div>
                        </div>
                        <div className="relative">
                            <input name="password" value={formData.password} onChange={handleChange} className="border rounded w-full mb-6 p-3" type={isVisible ? 'text' : 'password'} placeholder="Enter your password" />
                            <div className="absolute top-3 right-4 text-gray-600 cursor-pointer" onClick={toggleVisibility}>
                                <Eye/>
                            </div>
                        </div>
                        <button disabled={!(formData.password.trim() && formData.username.trim())} type="submit" className="bg-blue-400 rounded-lg p-3 w-full font-bold disabled:bg-gray-400 text-white disabled:cursor-not-allowed">Start Quiz</button>
                    </form>
                    <div className="flex justify-center gap-3 mt-3">
                        <h1>New user?</h1>
                        <h1 className="text-blue-400 font-semibold cursor-pointer" onClick={toggleLogin}>Register</h1>
                    </div>
                </div>
            </div>
    );
}
export default Login;