import "./Item.css";
import ItemDate from "./ItemDate";
import axios from "axios";

const Item = (props) => {
  const clickHandler = async (e) => {
    e.preventDefault();
    console.log(props.id);
    const updatedItem = await axios.patch(
      `http://localhost:8000/items/${props.id}`,
      null
    );
    props.onUpdateItemData(updatedItem);
  };
  return (
    <div className="expense-item">
      {/* <ItemDate date={props.date} /> */}
      <div className="expense-item__description">
        <h2>{props.name}</h2>
        <div className="expense-item__price">Cost: {props.cost}L.L.</div>
        <div className="expense-item__price">Price: {props.price}L.L.</div>
        <div className="new-expense__actions">
          <button onClick={clickHandler}>Sold</button>
        </div>
      </div>
    </div>
  );
};

export default Item;
