import Item from "./components/Item";
import NewItem from "./components/addingItems/NewItem";
import Header from "./components/Header";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [revenue, setRevenue] = useState("");
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

  const deletedItemDatahandler = (item) => {
    setItems((prev) => {
      return prev.filter((i) => i.id !== item.id);
    });
  };

  const fetchItems = async () => {
    const data = await axios.get("http://localhost:8000/items");
    setItems(data.data);
  };
  const getRevenue = async () => {
    const revenue = await axios.get("http://localhost:8000/items/totalRevenue");
    setRevenue(revenue.data.total_amount);
  };

  useEffect(() => {
    getRevenue();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [items]);

  return (
    <div className="App">
      <Header />
      <NewItem onAddItem={addItemHandler} />
      {items.map((item) => (
        <Item
          onUpdateItemData={updatedItemDataHandler}
          onDeleteItemData={deletedItemDatahandler}
          id={item.id}
          key={item.id}
          name={item.name}
          cost={item.cost}
          price={item.price}
          date={item.createdAt}
        />
      ))}
      <div className="footer">
        <h2>Revenue: {revenue ? "0" : revenue}</h2>
      </div>
    </div>
  );
}

export default App;
