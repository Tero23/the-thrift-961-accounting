import Item from "./components/Item";
import NewItem from "./components/addingItems/NewItem";
import Header from "./components/Header";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [revenueLeb, setRevenueLeb] = useState("");
  const [revenueDolar, setRevenueDolar] = useState("");
  const [cost, setCost] = useState("");
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
    setRevenueLeb(revenue.data.lebanese.total_amount_lebanese);
    setRevenueDolar(revenue.data.dolar.total_amount_dolar);
  };

  const getCost = async () => {
    const cost = await axios.get("http://localhost:8000/items/totalCost");
    setCost(cost.data.total_cost);
  };

  useEffect(() => {
    getRevenue();
  }, [items]);

  useEffect(() => {
    getCost();
  }, [items]);

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
        <h2>
          Revenue:{" "}
          {revenueLeb === null && revenueDolar === null
            ? "0"
            : `${revenueLeb}L.L.   $${revenueDolar}`}
        </h2>
        <h2>Cost: {cost === null ? "0" : cost}</h2>
        <h2>Profit: {`${revenueLeb - cost}   $${revenueDolar}`}</h2>
      </div>
    </div>
  );
}

export default App;
