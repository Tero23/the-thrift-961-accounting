import Item from "./components/Item";
import NewItem from "./components/addingItems/NewItem";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const addItemHandler = (item) => {
    setItems((prev) => {
      return [item, ...prev];
    });
  };
  const updatedItemDataHandler = (item) => {
    setItems((prev) => {
      return prev.filter((i) => i.id !== item.id);
    });
  };

  const fetchItems = async () => {
    const data = await axios.get("http://localhost:8000/items");
    setItems(data.data);
  };

  useEffect(() => {
    fetchItems();
  }, [items]);

  // const revenue = (async function () {
  //   const rev = await axios.get("http://localhost:8000/items/totalRevenue");
  //   return rev.data.total_amount;
  // })();

  const clickHandler = async () => {
    const revenue = await axios.get("http://localhost:8000/items/totalRevenue");
    console.log(revenue.data.total_amount);
    return revenue.data.total_amount;
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <NewItem onAddItem={addItemHandler} />
      {items.map((item) => (
        <Item
          onUpdateItemData={updatedItemDataHandler}
          id={item.id}
          key={item.id}
          name={item.name}
          cost={item.cost}
          price={item.price}
          date={item.createdAt}
        />
      ))}
      <div>
        <button onClick={clickHandler}>Calculate Revenue</button>
      </div>
    </div>
  );
}

export default App;
