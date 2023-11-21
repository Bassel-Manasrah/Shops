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
  desc,
  howMuchToIncrease,
  typeOfProduct,
  changeTheList,
  isClickMain,
  quantityMain: quantityMain,
  funcToRemovePrice,
}) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(isNaN(quantityMain) ? 0 : quantityMain);
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
          QuantityOfProduct: quantity * 100,
          PriceProduct: price,
          totalPrice: quantity * price,
          imagePath: imageUrl,
        };
        setSelectProduct(NewSelectProduct);
      } else {
        setSelectProduct({});
      }
    }
  }, [isClicked]);

  function handleClick() {
    if (quantity > 0) {
      if (isTrue) {
        setIsTrue(false);
        dispatch(deleteItem(id));
        funcToRemovePrice(quantity * price);
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
        <p className="card-description">{desc}</p>
        <div className="card-qunataty-container">
          <p
            className="card-increment"
            onClick={() => {
              quantity < 5000 &&
              isClicked === false &&
              isTrue === false
                ? setQuantity(quantity + 1)
                : setQuantity(quantity);
            }}
          >
            +
          </p>
          <div className="card-quantity-input-container">
            <input
              type="text"
              className="card-quantity-input"
              value={quantity * howMuchToIncrease}
              onChange={(e) => {
                // Handle manual input validation
                const value = e.target.value.trim(); // Remove leading and trailing whitespaces
                if (value === "" || (!isNaN(value) && value >= 0 && value <= 5000)) {
                  setQuantity(value === "" || value === "0" ? 0 : parseFloat(value) / howMuchToIncrease);
                }
              }}
            />
          </div>
          <p
            className="card-decrease"
            onClick={() => {
              quantity > 0 && isClicked === false && isTrue === false
                ? setQuantity(quantity - 1)
                : setQuantity(quantity);
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
