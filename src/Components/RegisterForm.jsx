import { useEffect, useState } from "react";
import { loginUser } from "../utils/userSlice";
import { registerUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLoggedIn = useSelector(store => store.users.isLogin);

  // for the UI conditional rendering
  const [isLogin, setIsLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const user = {username, email, password};
    // if (!isLogin) formData.username = username;
    if(!username || !email || !password){
      alert("Kindly fill all the fields!")
      return;
    }
    try{
      // awaiting thunk middleware promise
      const payload = await dispatch(registerUser(user)).unwrap();
      console.log(payload);
      alert(payload.message || "User has been Registered!!");
      setUsername("");
      setEmail("");
      setPassword("");
      setIsLogin(true);
    }catch(err){
      setPassword("");
      setIsLogin(true);
      alert(err || "Unable to register!!");
    }
  }

  async function handleLogin(e){
    e.preventDefault();
    const user = {email, password};

    if(!email || !password){
      alert("Kindly fill all the fields!")
      return;
    }

    try{
      // awaiting thunk middleware promise
      const payload = await dispatch(loginUser(user)).unwrap();
      navigate("/mainContainer");
    }catch(err){
      alert(err || "Unable to register!!");
    }

  };

  // when user reload the page and user was not logout before, redirect to main landing page
  useEffect(() => {
      if(isUserLoggedIn){
        navigate("/mainContainer");
      }
  }, [])

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>{isLogin ? "Log In" : "Register"}</h2>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter a username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="submit-btn">{isLogin ? "Log In" : "Register"}</button>
        </form>

        <div className="toggle-form">
          {isLogin ? (
            <>
              <p>Don't have an account?</p>
              <button onClick={() => setIsLogin(false)}>Sign up</button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <button onClick={() => setIsLogin(true)}>Log in</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;