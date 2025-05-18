import style from "./Navbar.module.css";
import { useState } from "react";

function Navbar() {
  const [mode, setMode] = useState(false);
  const [modal, setModal] = useState(false);

  function darkmode() {
    setMode(!mode);
    mode === false
      ? document.body.classList.add("darkMode")
      : document.body.classList.remove("darkMode");
  }

  function showModal() {
    setModal(!modal);
  }

  return (
    <>
      <nav className={style.mainContainer}>
        <div>
          <h1 className={style.logo}>╔═STORE════╗</h1>
        </div>
        <div className={style.buttons}>
          <button onClick={darkmode} className={style.button}>
            {mode === false ? "☾" : "☀"}
          </button>
          <button className={style.button} onClick={showModal}>
            ✉
          </button>
        </div>
      </nav>

      {modal && (
        <div className={style.modalContainer} onClick={showModal}>
            <div className={style.textModal}></div>
          <h1>Contact: XXX.XXX.XXX</h1>
          <h2>Email: XXXXX@XXX.com</h2>
          <p>This is a random message</p>
        </div>
      )}
    </>
  );
}

export default Navbar;
