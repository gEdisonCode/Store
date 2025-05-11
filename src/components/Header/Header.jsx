import style from "./Header.module.css";
import { useState, useEffect } from "react";

function Header() {
  const [check, setCheck] = useState(false);
  const [store, setStore] = useState([]);
 

  function handleCheck() {
    setCheck(!check);
  }

  useEffect(() => {
    async function storeFetch() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setStore(data);
        
      } catch (error) {
        console.error("error");
      }
    }
    storeFetch();
  }, []);

  if (!store) throw new Error("error");

  return (
    <>
      <div className={style.mainContainer}>
        {store && store.slice(0,4).map((item, index) =>
          <div className={style.cardContainer} onClick={() => handleCheck(index)} key={item.id}>
            <div className={style.imgContainer}>
              <img src={store[index].image} alt="img" className={style.img} />
            </div>
            <div className={style.textContainer}>
              <h1>{store[index].title}</h1>
              <h2>{store[index].category}</h2>
              <h3>{store[index].price} $</h3>
            </div>
            {check === true && <button className={style.checkButton}>✓</button>}
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
