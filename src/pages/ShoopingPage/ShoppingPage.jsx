// CSS Import
import "./ShoopingPage.css";

// Import components
import { Dropdown } from "../../components/shopPage/dropDownMenue/Dropdown";
import { Card } from "../../components/shopPage/card/card";
import { Footer } from "../../components/shopPage/footer/footer";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteItem,
  resetCart,
  setSelectShop,
  setPrice,
} from "../../redux/bazarSlice";
import Header from "../../components/homePage/Header";
import HomeFooter from "../../components/homePage/Footer";

// Import from Firebase
import { database, storage } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export function ShoppingPage() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.bazar.isLogin);
  const dataFetchedRef = useRef(false);

  let bazarProduct = useSelector((state) => state.bazar.productData);
  let bazarTotal = useSelector((state) => state.bazar.total);

  const [totalPrice, setTotalPrice] = useState(0);
  const [listOfProduct, setListOfProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsForSelectionShop, setProductsForSelectionShop] = useState([]);
  const [shopName, setShopName] = useState([]);
  const [selectedShop, setSelectedShop] = useState({});
  const [listOfImg, setListOfImg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const shopsCollectionRef = collection(database, "shops");
  const productsCollectionRef = collection(database, "products");
  const imgRefrence = ref(storage, "productImages/");

  const getTheProduct = async () => {
    if (shopName.length > 0) {
      let ourProducts = [];
      shopName[selectedShop["index"]]["products"].forEach(function (element) {
        products.forEach(function (elem) {
          if (element === elem["id"]) {
            ourProducts = [...ourProducts, elem];
          }
        });
      });
      setProductsForSelectionShop(ourProducts);
    }
  };

  useEffect(() => {
    getTheProduct();
  }, [selectedShop]);

  let bazarSelectShop = useSelector((state) => state.bazar.selectShop);

  useEffect(() => {
    const getShopList = async () => {
      try {
        const shops = await getDocs(shopsCollectionRef);
        const filterShops = shops.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((obj) => obj !== undefined);

        filterShops.sort((a, b) => a["name"].localeCompare(b["name"]));

        const products = await getDocs(productsCollectionRef);
        const filterProducts = products.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(filterProducts);

        let listOfShops = filterShops.map((obj) => ({
          name: obj.name,
          id: obj.id,
        }));

        if (Object.keys(bazarSelectShop).length === 0) {
          setSelectedShop({
            name: listOfShops[0]["name"],
            test: "test",
            id: listOfShops[0]["id"],
            index: 0,
          });
          dispatch(
            setSelectShop({
              name: listOfShops[0]["name"],
              test: "test",
              id: listOfShops[0]["id"],
              index: 0,
            })
          );
        } else {
          setSelectedShop(bazarSelectShop);
        }

        setShopName(filterShops);

        listAll(imgRefrence).then((response) => {
          response.items.forEach((img) => {
            getDownloadURL(img).then((url) => {
              setListOfImg((prev) => [
                ...prev,
                { img: url, path: img["_location"]["path_"] },
              ]);
            });
          });
        });

        if (bazarTotal !== 0) {
          setTotalPrice(bazarTotal);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getShopList();
  }, []);

  const addToListOfProduct = (selectProduct, addProduct) => {
    if (addProduct) {
      setTotalPrice(totalPrice + selectProduct.totalPrice);
      dispatch(setPrice(totalPrice + selectProduct.totalPrice));

      setListOfProduct((addListOfProduct) => [
        ...addListOfProduct,
        selectProduct,
      ]);

      dispatch(addToCart(selectProduct));
    } else {
      let index = listOfProduct.findIndex(
        (element) => element.idProduct === selectProduct
      );

      if (index !== -1) {
        setTotalPrice(totalPrice - listOfProduct[index].totalPrice);
        dispatch(setPrice(totalPrice - listOfProduct[index].totalPrice));

        setListOfProduct((addListOfProduct) =>
          addListOfProduct.filter(
            (obj) => obj.idProduct !== selectProduct
          )
        );

        dispatch(deleteItem(selectProduct));
      }
    }
  };

  const func = (product) => {
    for (let i = 0; i < listOfImg.length; i++) {
      if ("productImages/" + product["id"] === listOfImg[i]["path"]) {
        return listOfImg[i]["img"];
      }
    }
  };

  const selectShop = (shop) => {
    setSelectedShop(shop);
    dispatch(resetCart());
    dispatch(setSelectShop(shop));
  };

  const updateTheTotal = (decrease) => {
    setTotalPrice(totalPrice - decrease);
  };

  return (
    <>
      <Header />
      {isLogin ? (
        <>
          {isLoading ? (
            <div className="center">טוען...</div>
          ) : (
            <>
              <Dropdown
                shops={shopName.map((obj) => ({
                  name: obj.name,
                  id: obj.id,
                }))}
                setSelectedOption={selectShop}
                selectedOption={selectedShop}
              />
              <div className="ContainerOfCard">
                {productsForSelectionShop.map((product, index) => {
                  let isTrue = false;
                  let quantity = 0;
                  if (bazarProduct.length > 0) {
                    let check = bazarProduct.findIndex(
                      (item) => item.idProduct === product["id"]
                    );
                    if (check !== -1) {
                      isTrue = true;
                      quantity =
                        bazarProduct[check]["QuantityOfProduct"] / 100;
                    }
                  }
                  return (
                    <Card
                      id={product["id"]}
                      key={product["id"]}
                      imageUrl={func(product)}
                      title={product["name"]}
                      price={product["price"]}
                      howMuchToIncrease={100}
                      typeOfProduct="גרם"
                      changeTheList={addToListOfProduct}
                      isClickMain={isTrue}
                      quantityMain={quantity}
                      funcToRemovePrice={updateTheTotal}
                    />
                  );
                })}
              </div>
              <Footer getPrice={totalPrice} />
            </>
          )}
        </>
      ) : (
        <>
          <div
            className="flex flex-col items-center mx-auto"
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              minHeight: "200px",
              marginBottom: "145px",
            }}
          >
            <p className="text-3xl mt-4 font-medium text-red-500">
              אתה צריך להיכנס לחשבונך כדי לראות את החנות
            </p>
          </div>
          <HomeFooter />
        </>
      )}
    </>
  );
}