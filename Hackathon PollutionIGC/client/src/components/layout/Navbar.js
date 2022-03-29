import React from 'react';

function navbar() {
  return (
    <nav className="navbar navbar-expand-lg  gradient shadow-small">
    <div className="container">
        <a className="navbar-brand logo" href="#" style={{color: "black"}}>I.G.C</a>
        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navbarNav">
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon" style={{color: "black"}}><i className="fa-solid fa-bars"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link" style={{color: "black"}} href="index.html">Home</a></li>
                <li className="nav-item"><a className="nav-link" style={{color: "black"}} href="project-page.html">Nodes</a></li>
                <li className="nav-item"><a className="nav-link" style={{color: "black"}} href="contact.html">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>
  )
}

export default navbar;
