import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Brain, Eye, EyeOff } from "lucide-react";
import Login from "./Login";
function Register(){
    const {error, setError,formData, setFormData,setGameStarted} = useContext(UserContext);
    const [isVisible, setIsVisible] = useState(false);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const toggleVisibility = () => {
        setIsVisible((isVisible) => !isVisible);
    }
    const [switchLogin, setSwitchLogin] = useState(true);
    const toggleLogin = () => {
        setSwitchLogin((switchLogin) => !switchLogin);
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev,[name]: value}));
        setError('');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${baseUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            if(response.ok){
                setGameStarted(true);
            } else {
                setError(data.message || 'Failed to register.');
            }
        }catch(err){
            console.log("Error during registration.",err);
            alert("Error during registration.",err);
        }
    }

    if(switchLogin){
        return(
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white max-w-md w-full p-12 rounded-2xl shadow-lg">
                    {/* <div className="text-5xl font-bold text-center text-blue-300 mb-4">O</div> */}
                    <div className="flex gap-5 p-3 ml-5">
                        <Brain className="text-blue-500 h-12 w-12"/>
                        <h1 className="text-2xl font-extrabold text-center mb-4 flex gap-2">Welcome to <p className="text-blue-500">fern.</p></h1>
                    </div>
                    <div className="flex justify-center mb-4">
                        <h1 className="text-lg font-bold text-blue-400">Register</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <input name="username" value={formData.username} onChange={handleChange} className="border rounded w-full mb-6 p-3" placeholder="Enter your username" type="text" />
                            <div className="text-red-700 absolute top-12 left-3 text-xs">
                                {error}
                            </div>
                        </div>
                        <input name="email" value={formData.email} onChange={handleChange}  className="border rounded w-full mb-6 p-3" type="text" placeholder="Enter your email" />
                        <div className="relative">
                            <input name="password" value={formData.password} onChange={handleChange} className="border rounded w-full mb-6 p-3" type={isVisible ? "text" : "password"} placeholder="Enter your password" />
                            <div className="absolute top-3 right-4 text-gray-600 cursor-pointer" onClick={toggleVisibility}>
                                {isVisible ? <EyeOff/> : <Eye/>}
                            </div>
                        </div>
                        <button type="submit" disabled={!(formData.username.trim() && formData.email.trim() && formData.password.trim())} className="bg-blue-400 rounded-lg p-3 w-full font-bold disabled:bg-gray-400 text-white disabled:cursor-not-allowed">Start Quiz</button>
                    </form>
                    <div className="flex justify-center gap-3 mt-3">
                        <h1>Already registered?</h1>
                        <h1 className="text-blue-400 font-semibold cursor-pointer" onClick={toggleLogin}>Login</h1>
                    </div>
                </div>
            </div>
        );
    }
    if(!switchLogin){
        return(
            <Login isVisible = {isVisible} setIsVisible={setIsVisible} toggleLogin={toggleLogin} toggleVisibility={toggleVisibility}/>
        )
    }
}
export default Register;