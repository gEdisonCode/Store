import style from "./Header.module.css";
import { useState, useEffect } from "react";

function Header() {
  const [check, setCheck] = useState([]);
  const [store, setStore] = useState([]);
  const [filter, setFilter] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  function handleCheck(checkList) {
    setCheck((element) =>
      element.includes(checkList)
        ? element.filter((id) => id !== checkList)
        : [...check, checkList]
    );
  }

  function filterMan() {
    const man = store.filter((item) => item.category === "men's clothing");
    setFilter(man);
    handleMenu()
  }

  function filterWomen() {
    const women = store.filter((item) => item.category === "women's clothing");
    setFilter(women);
    handleMenu()
  }

  function filterJewlery() {
    const jewlery = store.filter((item) => item.category === "jewelery");
    setFilter(jewlery);
    handleMenu()
  }
  function filterTech() {
    const tech = store.filter((item) => item.category === "electronics");
    setFilter(tech);
    handleMenu()
  }
  function handleMenu() {
    setShowMenu(!showMenu);
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
        <div className={style.menuContainer}>
          <div>
            <button className={style.cart}>cart</button>
          </div>

          <button onClick={handleMenu} className={style.showMenu}>
            Category
          </button>
        </div>

        {showMenu === true && (
          <div className={style.storeMenu}>
            <div className={style.menuButton}>
              <button className={style.button} onClick={filterMan}>
                Men's clothing
              </button>
              <button className={style.button} onClick={filterWomen}>
                Women's clothing
              </button>
              <button className={style.button} onClick={filterJewlery}>
                Jewelery
              </button>
              <button className={style.button} onClick={filterTech}>
                Electronics
              </button>
            </div>
          </div>
        )}

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
