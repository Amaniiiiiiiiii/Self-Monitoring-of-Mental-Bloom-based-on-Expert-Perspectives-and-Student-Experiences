import React, { useState, useContext  } from 'react'; //importing react packages 
import { FaEyeSlash, FaEye } from 'react-icons/fa'; //
import { TbLoader3 } from "react-icons/tb"; //
import "./Authentication.css"; //
import { useNavigate  } from "react-router-dom";//redirection 
import MyContext from '../MyContext'; 

function Authentication() {
  const [formData, setFormData] = useState({ email: '', password: '' }); //login inputs 
  const [showPassword, setShowPassword] = useState(false); 
  const [showSpinner, setShowSpinner] = useState(false);
  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState(true)
  const navigate = useNavigate(); //screen after login
  const context = useContext(MyContext);

  const handleSubmit = (event) => {
    event.preventDefault()
    const newErrors = {};
    if (formData.email === '') {
      newErrors.email = 'Email is required';
    }
    if (formData.password === '') {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);

    

    if (Object.keys(newErrors).length === 0) {
      setShowSpinner(flag=>!flag)

      fetch(`http://localhost:8000/${login?'authenticate_user':'add_user'}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if(data.success){
          context.setUser(true)
          navigate('/form');
          setShowSpinner(flag=>!flag)
        }else{
          setErrors({
            ...errors,
            invalid: data.message});
            setShowSpinner(flag=>!flag)
        }
      })
      .catch(error => console.error(error));
    }

    
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    setErrors({});
  };

  const handleSwitch = () => {
    setFormData(login?{ email: '', password: '' }:{ name:'' ,email: '', password: '' })
    setErrors({});
    setLogin(flag=>!flag);
  };

  function handleShowHide() {
    setShowPassword(flag=>!flag);
  }
  
  return (
    <div className="login-container">
      <div className="background-shapes">
        <div className="circle" />
      </div>
      <svg viewBox="0 0 323.9 265.47" style={{zIndex:'1', position:'absolute', bottom:0, right:0}}>
          <defs>
            <linearGradient id="linear-gradient" x1="284.83" y1="369.56" x2="481.5" y2="172.22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor ="#fff"/>
              <stop offset="1" stopColor="#b700ff"/>
            </linearGradient>
            <linearGradient id="linear-gradient-2" x1="356.33" y1="234.41" x2="337" y2="361.08" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3f14a3" stopOpacity="0"/>
              <stop offset="1" stopColor="#b700ff"/>
            </linearGradient>
          </defs>
          <g id="OBJECTS">
            <g>
              <path className="cls-1" d="M147.6,378.33H471.5V112.86c-30,3.86-47.92,27.77-53.72,40.67-9,20-24,32.75-50.75,29.5s-42.75,4.5-59.25,39.25c-14.55,30.62-30.25,23.25-91.75,38s-44.5,55.5-57.25,97.39A58.23,58.23,0,0,1,147.6,378.33Z" transform="translate(0 -112.86)" opacity={0.2}/>
              <path className="cls-2" d="M292,321.91C259,323,212.77,341.7,197.23,378.33H471.5V204.27c-40-.65-78.08,20.36-91,56.79C366.36,301.19,331,320.63,292,321.91Z" transform="translate(0 -112.86)"/>
            </g>
          </g>
      </svg>


      <div className="login-wrapper">
        <h1 className='header'>{login?'Login':'Signup'}</h1>
        <form onSubmit={handleSubmit}>

          <label htmlFor='email'>Email</label>
          <input className='authentication-input' type="text" name="email" value={formData.email} onChange={handleChange} style={{border:(errors.email||errors.invalid) ? "1px solid red":"1px solid transparent"}}/>
          {!login &&
            <>
              <label htmlFor='name'>Full Name</label>
              <input className='authentication-input' type="text" name="name" value={formData.name} onChange={handleChange}/>
            </>
          }
          <label htmlFor='password'>Password</label>
          <div style={{ position: 'relative'}} >
            <input className='authentication-input' type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} style={{border:(errors.password||(errors.invalid&&login)) ? "1px solid red":"1px solid transparent"}}/>
            {formData.password.length>0 &&
              <>
                {showPassword?
                  <FaEyeSlash onClick={handleShowHide} className='showPasswordIcon'/> 
                  : 
                  <FaEye onClick={handleShowHide} className='showPasswordIcon'/> 
                }
              </>
            }
          </div>

          <div style={{display:'flex', flexDirection:'column', width:'100%' ,alignItems:'center', marginTop:'20px'}}>
            <div style={{height:"30px"}}>
              {errors.invalid && <span className="error-message">{errors.invalid}</span>}
            </div>
            <button type="submit" className='submitButton'>Submit</button>
            <div>{login?"Don't have an account?":"Already have an account?"}&nbsp;
              <span className='signupButton' onClick={handleSwitch}>{!login?'Login':'Signup'}</span>
            </div>
            
          </div>
        </form>
      </div>
          
      {showSpinner &&
        <div className='spinner'>
          <div style={{ animation: 'spin 1s linear infinite' }}>
            <TbLoader3 size={48} color='#8e2de2'/>
          </div>
        </div>
      }
    </div>
  );
}

export default Authentication;