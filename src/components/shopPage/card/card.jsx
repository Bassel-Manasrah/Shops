// Import the library
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./card.css";
import { useDispatch } from "react-redux";
import { addToCart, deleteItem } from "../../../redux/bazarSlice";

// Main component to export
export const Card = ({
  id,
  imageUrl,
  title,
  price,
  howMuchToIncrease,
  typeOfProduct,
  changeTheList,
  isClickMain,
  quntatyMain,
  funcToRemovePrice,
}) => {
  const dispatch = useDispatch();

  const [quntaty, setQuntaty] = useState(quntatyMain);
  const [isClicked, setIsClicked] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});

  useEffect(() => {
    if (isTrue === false) {
      if (isClicked) {
        changeTheList(selectProduct, isClicked);
      } else {
        changeTheList(id, isClicked);
      }
    }
  }, [selectProduct]);

  useEffect(() => {
    if (isTrue === false) {
      if (isClicked) {
        let NewSelectProduct = {
          idProduct: id,
          nameOfProduct: title,
          QuantityOfProduct: quntaty * 100,
          PriceProduct: price,
          totalPrice: quntaty * price,
          imagePath: imageUrl,
        };
        setSelectProduct(NewSelectProduct);
      } else {
        setSelectProduct({});
      }
    }
  }, [isClicked]);

  function handleClick() {
    if (quntaty > 0) {
      if (isTrue) {
        setIsTrue(false);
        dispatch(deleteItem(id));
        funcToRemovePrice(quntaty * price);
      } else {
        setIsClicked(!isClicked);
      }
    }
  }

  useEffect(() => {
    if (isClickMain) {
      setIsTrue(true);
    }
  }, []);

  return (
    <div className="card">
      <img src={imageUrl} alt="product" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title} </h2>
        <div className="card-qunataty-container">
          <p
            className="card-increment"
            onClick={() => {
              quntaty < 50 &&
              isClicked === false &&
              isTrue === false
                ? setQuntaty(quntaty + 1)
                : setQuntaty(quntaty);
            }}
          >
            +
          </p>
          <h2 className="card-title-quantaty">{quntaty * howMuchToIncrease}</h2>
          <p
            className="card-decrease"
            onClick={() => {
              quntaty > 0 && isClicked === false && isTrue === false
                ? setQuntaty(quntaty - 1)
                : setQuntaty(quntaty);
            }}
          >
            -
          </p>
        </div>
        <h2 className="card-title-price">
          {price} ש"ח ל {howMuchToIncrease} {typeOfProduct}
        </h2>
        <button
          className={
            isClicked || isTrue
              ? "card-btn card-btn-red"
              : "card-btn card-btn-green"
          }
          onClick={handleClick}
        >
          {isClicked || isTrue ? "הסרה מהסל" : "הוספה לסל"}
        </button>
      </div>
    </div>
  );
};
