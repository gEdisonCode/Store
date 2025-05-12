import style from "./Header.module.css";
import { useState, useEffect } from "react";

function Header() {
  const [check, setCheck] = useState([]);
  const [store, setStore] = useState([]);

  function handleCheck(checkList) {
    setCheck((element) =>
      element.includes(checkList)
        ? element.filter((id) => id !== checkList)
        : [...check, checkList]
    );
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
        {store &&
          store.slice(0, 4).map((item, index) => (
            <div
              className={style.cardContainer}
              onClick={() => handleCheck(item.id)}
              key={item.id}>
              <div className={style.imgContainer}>
                <img src={item.image} alt="img" className={style.img} />
              </div>
              <div className={style.textContainer}>
                <h1 className={style.title}>{item.title}</h1>
                <h2 className={style.category}>{store[index].category}</h2>
                <h3 className={style.price}>{store[index].price} $</h3>
              </div>
              {check.includes(item.id) && (
                <button className={style.checkButton}>✓</button>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default Header;
