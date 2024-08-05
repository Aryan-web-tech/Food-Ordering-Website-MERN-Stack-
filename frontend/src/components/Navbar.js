//type rfc and Enter -->> due to ES& package
import React, { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import Cart from '../pages/Cart'
import { useCart } from './ContextReducer'

export default function Navbar() {
  let data = useCart()
  const [cartView,setCartView]=useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                  Mycart  {" "}
                  <Badge pill bg="danger"> {data.length} </Badge>
                </div>
                {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
//The me-auto class is applied to the first child, pushing it to the left and any subsequent flex items to the right.