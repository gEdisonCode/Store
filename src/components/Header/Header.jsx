import style from "./Header.module.css";
import { useState, useEffect } from "react";

function Header() {
  const [check, setCheck] = useState([]);
  const [store, setStore] = useState([]);
  const [filter, setFilter] = useState([])

  function handleCheck(checkList) {
    setCheck((element) =>
      element.includes(checkList)
        ? element.filter((id) => id !== checkList)
        : [...check, checkList]
    );
  }


  function filterMan() {
    const man = store.filter((item) => item.category === "men's clothing")
    setFilter(man)
  }

  function filterWomen() {
    const women = store.filter((item) => item.category === "women's clothing")
    setFilter(women)
  }

  function filterJewlery() {
    const jewlery = store.filter((item) => item.category === "jewelery")
    setFilter(jewlery)
  }
function filterTech() {
  const tech = store.filter((item) => item.category === "electronics")
  setFilter(tech)
}

  useEffect(() => {
    async function storeFetch() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setStore(data);
        setFilter(data);
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
      
         <div className={style.storeMenu}>
          <button className={style.menuButton} onClick={filterMan}>Men's clothing</button>
          <button className={style.menuButton} onClick={filterWomen}>Women's clothing</button>
          <button className={style.menuButton} onClick={filterJewlery}>Jewelery</button>
          <button className={style.menuButton} onClick={filterTech}>Electronics</button>
         </div>

        {filter &&
          filter.slice(0, 4).map((item, index) => (
            <div
              className={style.cardContainer}
              onClick={() => handleCheck(item.id)}
              key={item.id}>
              <div className={style.imgContainer}>
                <img src={item.image} alt="img" className={style.img} />
              </div>
              <div className={style.textContainer}>
                <h1 className={style.title}>{`${item.title}`.slice(0, 20)}</h1>
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
