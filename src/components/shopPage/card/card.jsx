// Import the library
import { useEffect, useState } from "react";
import "./card.css";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../../redux/bazarSlice";

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
  isGrams,
  availableQuantity,
  discount,
  isMember,
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
          totalPrice: isMember
          ? +(quantity * price * (1 - discount / 100)).toFixed(2)
          : +(quantity * price).toFixed(2),
          imagePath: imageUrl,
          isGrams: isGrams,
          availableQuantity: availableQuantity,
          discount: discount,
          isMember: isMember,
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
        price = isMember
        ? +(price * (1 - discount / 100)).toFixed(2)
        : price;
        funcToRemovePrice(quantity * price);
      } else {
        // Check if there is enough quantity available before adding to the cart
        if (quantity * howMuchToIncrease <= availableQuantity) {
          setIsClicked(!isClicked);
        } else {
          // Show a message or handle the case where there is not enough quantity available
          if(isGrams){
            alert(`יש רק ${availableQuantity} גרמים במלאי`);
          }
          else{
            alert(`יש רק ${availableQuantity} יחידים במלאי`);
          }
        }
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
              quantity < availableQuantity &&
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
                if (value === "" || (!isNaN(value) && Number.isInteger(parseFloat(value)) && parseFloat(value) >= 0)) {
                  setQuantity(value === "" || value === "0" ? 0 : parseFloat(value) / howMuchToIncrease);
                }
              }}
              disabled={availableQuantity === 0}
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
        <p style={{ color: 'red' }}>
          {isMember && discount !== 0 && discount !== null && availableQuantity!=0? "הנחת חבר מעודון " + discount + "%" : null}
        </p>
        <h2 className="card-title-price">
          {price} ש"ח ל {howMuchToIncrease} {typeOfProduct}
        </h2>
        <button
          className={
            (isClicked || isTrue) ? "card-btn card-btn-red" : "card-btn card-btn-green"
          }
          onClick={handleClick}
          disabled={availableQuantity === 0}
        >
          {isClicked || isTrue ? "הסרה מהסל" : "הוספה לסל"}
        </button>
      </div>
    </div>
  );
};
