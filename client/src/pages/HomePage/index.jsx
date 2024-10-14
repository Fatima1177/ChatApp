import React from 'react'
import AuthForm from '../../components/authForm'
import Header from '../../components/header'
import { useState } from 'react'


const HomePage = () => {
  const [showForm, setshowForm] = useState(false)

  return (
    <div className='homePage'>
      {showForm ? <AuthForm setshowForm = {setshowForm}/> : ""}
        <Header setshowForm = {setshowForm}/>
        <section className="hero">
          <h1>Hello</h1>
          
        </section>
    </div>
  )
}

export default HomePage