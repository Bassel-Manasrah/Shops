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
  setSelectStore,
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
  const [productsForSelectionStore, setProductsForSelectionStore] = useState([]);
  const [storeName, setStoreName] = useState([]);
  const [selectedStore, setSelectedStore] = useState({});
  const [listOfImg, setListOfImg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const storesCollectionRef = collection(database, "stores");
  const productsCollectionRef = collection(database, "products");
  const imgRefrence = ref(storage, "productsImages/");

  const getTheProduct = async () => {
    if (storeName.length > 0) {
      let ourProducts = [];
      storeName[selectedStore["index"]]["products"].forEach(function (element) {
        products.forEach(function (elem) {
          if (element === elem["id"]) {
            ourProducts = [...ourProducts, elem];
          }
        });
      });
      setProductsForSelectionStore(ourProducts);
    }
  };

  useEffect(() => {
    getTheProduct();
  }, [selectedStore]);

  let bazarSelectStore = useSelector((state) => state.bazar.selectStore);

  useEffect(() => {
    const getStoreList = async () => {
      try {
        const stores = await getDocs(storesCollectionRef);
        const filterStores = stores.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((obj) => obj !== undefined);

        filterStores.sort((a, b) => a["name"].localeCompare(b["name"]));

        const products = await getDocs(productsCollectionRef);
        const filterProducts = products.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(filterProducts);

        let listOfStores = filterStores.map((obj) => ({
          name: obj.name,
          id: obj.id,
        }));

        if (Object.keys(bazarSelectStore).length === 0) {
          setSelectedStore({
            name: listOfStores[0]["name"],
            test: "test",
            id: listOfStores[0]["id"],
            index: 0,
          });
          dispatch(
            setSelectStore({
              name: listOfStores[0]["name"],
              test: "test",
              id: listOfStores[0]["id"],
              index: 0,
            })
          );
        } else {
          setSelectedStore(bazarSelectStore);
        }

        setStoreName(filterStores);

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
    getStoreList();
  }, []);

  const addToListOfProduct = (selectProduct, addProduct) => {
    setListOfProduct((prevListOfProduct) => {
      if (addProduct) {
        const newListOfProduct = [...prevListOfProduct, selectProduct];
        dispatch(addToCart(selectProduct));
        dispatch(setPrice(totalPrice + selectProduct.totalPrice));
        setTotalPrice((prevTotalPrice) => prevTotalPrice + selectProduct.totalPrice);
        return newListOfProduct;
      } else {
        const updatedListOfProduct = prevListOfProduct.filter(
          (obj) => obj.idProduct !== selectProduct
        );
        const index = prevListOfProduct.findIndex(
          (element) => element.idProduct === selectProduct
        );
        if (index !== -1) {
          dispatch(deleteItem(selectProduct));
          dispatch(setPrice(totalPrice - prevListOfProduct[index].totalPrice));
          setTotalPrice((prevTotalPrice) => prevTotalPrice - prevListOfProduct[index].totalPrice);
        }
        return updatedListOfProduct;
      }
    });
  };
  

  const func = (product) => {
    for (let i = 0; i < listOfImg.length; i++) {
      if ("productsImages/" + product["id"] === listOfImg[i]["path"]) {
        return listOfImg[i]["img"];
      }
    }
  };

  const selectStore = (store) => {
    setSelectedStore(store);
    dispatch(resetCart());
    dispatch(setSelectStore(store));
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
                stores={storeName.map((obj) => ({
                  name: obj.name,
                  id: obj.id,
                }))}
                setSelectedOption={selectStore}
                selectedOption={selectedStore}
              />
              <div className="ContainerOfCard">
                {productsForSelectionStore.map((product, index) => {
                  let isTrue = false;
                  let quantity = 0;
                  if (bazarProduct.length > 0) {
                    let check = bazarProduct.findIndex(
                      (item) => item.idProduct === product["id"]
                    );
                    if (check !== -1) {
                      isTrue = true;
                      quantity = bazarProduct[check]["QuantityOfProduct"] / 100;
                    }
                  }

                  // Fetch isGrams from Firebase and set typeOfProduct accordingly
                  const isGrams = product.isGrams; // Assuming isGrams is a field in your Firebase data

                  return (
                    <Card
                      id={product["id"]}
                      key={product["id"]}
                      imageUrl={func(product)}
                      title={product["name"]}
                      price={product["price"]}
                      desc={product["desc"]}
                      howMuchToIncrease={isGrams ? 100 : 1}
                      typeOfProduct={isGrams ? "גרם" : "יחידים"}
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
            marginBottom: "171px",
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