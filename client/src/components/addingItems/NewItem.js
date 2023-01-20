import "./NewItem.css";
import "../ItemForm";
import ItemForm from "../ItemForm";

const NewItem = (props) => {
  const saveItemDatahandler = (enteredItemData) => {
    props.onAddItem(enteredItemData);
  };
  return (
    <div className="new-expense">
      <ItemForm onSaveItemData={saveItemDatahandler} />
    </div>
  );
};

export default NewItem;
