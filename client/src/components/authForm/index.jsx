import React from 'react'
import { useState } from 'react'
import "./style.scss"
import axios from 'axios'

const AuthForm = ({setshowForm}) => {

const [isLogin, setIsLogin] = useState(true)    

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        // fetching
        try{
            const response = await axios.post(`http://localhost:8000/api/auth/${isLogin ? 'login' : 'signup'}`, data)
            const {status} = response
            if(status === 200 || status === 201){
                //Set cookie to front side

                //Navigate Accaunt Page
                
                alert('Nice!')
            }
        } catch(err){
            alert(err.response.data.error)
            console.log(`sign up catch err: ${err.message}`);
        }

    }

  return (
    <form  className='authForm' onSubmit={handleSubmit}>
        <h1 >{isLogin ? 'Login' : "Register"}</h1>
        <p onClick={()=>setshowForm(false)}>X</p>
        {
            !isLogin
            ?
            <>
                <input type="text" placeholder='Enter your Full Name' name='fullName'/>
                <select name="gender" id="">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </>
            :
            ""
        }
        <input type="text" placeholder='Enter your username' name='username'/>
        <input type="password" placeholder='Enter your password' name='password'/>
        {
            !isLogin
            ?
            <>
                <input type="password" placeholder='Confirm password' name='confirmPassword'/>
            </>
            :
            ""
        }
        <span onClick={()=>setIsLogin(!isLogin)}>{isLogin ? 'create account' : 'back to login'}</span>
        <button type='submit'>{isLogin ? 'Login' : 'Register'}</button>
    </form>
  )
}

export default AuthForm