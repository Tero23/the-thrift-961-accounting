import "./ItemDate.css";
const ItemDate = (props) => {
  console.log(props.date);
  const month = props.date.toLocaleString("en-US", {
    month: "long",
  });
  const day = props.date.createdAt.toLocaleString("en-US", {
    day: "2-digit",
  });
  const year = props.date.createdAt.getFullYear();
  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
};

export default ItemDate;
