import React, { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
  resetCart,
} from "../redux/bazarSlice";

const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.bazar.productData);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleResetCart = () => {
    setShowConfirmation(true);
    document.body.classList.add("overflow-hidden");
  };

  const confirmResetCart = () => {
    dispatch(resetCart());
    setShowConfirmation(false);
    document.body.classList.remove("overflow-hidden");
  };

  const cancelResetCart = () => {
    setShowConfirmation(false);
    document.body.classList.remove("overflow-hidden");
  };
  
  return (
    <div className="w-9/12 pr-10">
      <div className="w-full">
        <h2 className="hebrewTexts text-2xl">סל קניות</h2>
        <div>
          <div>
            {productData.map((item) => (
              <div
                key={item.idProduct}
                className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6"
              >
                <div className="flex items-center gap-1">
                  <AiOutlineCloseSquare
                    onClick={() => dispatch(deleteItem(item.idProduct))}
                    
                    className="text-xxl text-white hover:text-red-600 cursor-pointer duration-300"
                  />
                  <img
                    className="w-32 h-32 object-cover"
                    src={item.imagePath}
                    alt="productImg"
                  />
                </div>
                <h2 className="w-40">{item.nameOfProduct}</h2>
                <p className="w-10">₪{item.PriceProduct}</p>
                <div className="w-52 flex items-center justify-between text-white gap-4 border p-3">
                  <p className="text-sm">
                    כַּמוּת ב-{item.isGrams ? "גרמים" : "יחידים"}
                  </p>
                  <div className="flex items-center gap-4 text-sm font-semibold">
                    <span
                      onClick={() =>
                        dispatch(
                          decrementQuantity({
                            idProduct: item.idProduct,
                            nameOfProduct: item.nameOfProduct,
                            imagePath: item.imagePath,
                            price: item.PriceProduct,
                            QuantityOfProduct: item.isGrams ? 100 : 1,
                          })
                        )
                      }
                      className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                    >
                      -
                    </span>
                    {item.isGrams ? item.QuantityOfProduct: item.QuantityOfProduct/100}
                    <span
                      onClick={() =>
                        dispatch(
                          increamentQuantity({
                            idProduct: item.idProduct,
                            nameOfProduct: item.nameOfProduct,
                            imagePath: item.imagePath,
                            PriceProduct: item.PriceProduct,
                            QuantityOfProduct: item.isGrams ? 100 : 1,
                          })
                        )
                      }
                      className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                    >
                      +
                    </span>
                  </div>
                </div>
                <p className="w-18">
                ₪{(item.QuantityOfProduct * item.PriceProduct) / 100}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={handleResetCart}
            className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300"
          >
            ריקון סל קניות
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-200 border border-black w-96 p-6 overflow-y-auto">
            <p className="text-center">
              האם אתה בטוח שברצונך לרוקן את סל הקניות?
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={confirmResetCart}
                className="bg-red-500 hover:bg-gray-400 text-white px-4 py-2 mr-4"
              >
                כן
              </button>
              <button
                onClick={cancelResetCart}
                className="bg-green-500 hover:bg-gray-400 text-gray-700 px-4 py-2"
              >
                לא
              </button>
            </div>
          </div>
        </div>
      )}

      <Link to="/stores">
        <button className="mt-8 ml-7 flex items-center gap-1 text-black hover:bg-red-500 duration-300 text-2xl">
          <span>
            <HiOutlineArrowRight />
          </span>
          חזרה לחנות
        </button>
      </Link>
    </div>
  );
  
};

export default CartItem;
