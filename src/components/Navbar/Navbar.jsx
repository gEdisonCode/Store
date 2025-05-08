import style from "./Navbar.module.css";
import {useState} from "react"

function Navbar() {
    const [mode, setMode] = useState(false)

    function darkmode() {
        setMode(!mode)
        mode === false ? document.body.classList.add("darkMode") : document.body.classList.remove("darkMode")
    }

  return (
    <>
      <nav className={style.mainContainer}>
        <div ><h1 className={style.logo}>Logo</h1></div>
        <div className={style.buttons}>
            <button onClick={darkmode} className={style.button}>Theme</button>
            <button className={style.button}>About</button>
        </div>
      </nav>
    </>
  );
}
 

export default Navbar