import React,{ useEffect, useState } from "react";

export default function Register() {
  const [isButtonDisable, setIsButtonDisable] = useState(true)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/getUser")
    .then(res=>{
      // res.status(200).json({message:'tag'})
      console.log(res);
      
    })
    .catch((error)=>{
      console.error(error);
      
    })
    // getUsers();
    email && password ? 
        setIsButtonDisable(false) 
    : 
        setIsButtonDisable(true)
  }, [email, password])
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Empêche le formulaire de se soumettre de manière traditionnelle

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }

      const data = await response.json();
      console.log(data); // Affiche la réponse du serveur
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
    return(
        <div>
          <div className='mx-auto mt-3 w-50 p-3 border'>
            <form onSubmit={handleSubmit} action="/" method="post" className=''>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  className='form-control'
                  type="email" 
                  placeholder='email' 
                  id='email'
                   onChange={(e)=>setEmail(e.target.value)} 
                 />
               </div>
               <div className="mb-3">
                 <label htmlFor="password">Password</label>
                 <input 
                   className='form-control'
                   type="password" 
                   placeholder='password' 
                   id='password' 
                   onChange={(e)=>setPassword(e.target.value)} />
               </div>
               <button type="submit" disabled={isButtonDisable} className='btn btn-danger'>inscrire</button>
             </form>
           </div>
        </div>
    )
};
