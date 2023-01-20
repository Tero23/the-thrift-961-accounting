import "./ItemForm.css";
import { useState } from "react";
import axios from "axios";

const ItemForm = (props) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const costChangeHandler = (e) => {
    setCost(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const dateChangeHandler = (e) => {
    setDate(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newItem = {
      name,
      cost,
      price,
      createdAt: new Date(date),
    };
    await axios.post("http://localhost:8000/items", newItem, {
      "content-type": "application/json",
    });
    props.onSaveItemData(newItem);
    setName("");
    setCost("");
    setPrice("");
    setDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Name</label>
          <input type="text" value={name} onChange={nameChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Cost</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={cost}
            onChange={costChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Price</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={price}
            onChange={priceChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={date}
            min="2023-01-01"
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Item</button>
      </div>
    </form>
  );
};

export default ItemForm;
