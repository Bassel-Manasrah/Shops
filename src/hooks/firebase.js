import {
  getDocs,
  collection,
  addDoc,
  doc,
  // deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const eventsCollectionRef = collection(db, "events");
const productsCollectionRef = collection(db, "products");
const usersCollectionRef = collection(db, "users");
const ordersCollectionRef = collection(db, "orders");

export async function createLocation(newLocation) {
  const locationCollection = collection(db, "locations");
  await addDoc(locationCollection, {
    value: newLocation,
  });
}

export async function createEvent(newEvent) {
  const eventCollection = collection(db, "events");
  await addDoc(eventCollection, newEvent);
}

export async function fetchLocations() {
  const locationCollection = collection(db, "locations");
  const response = await getDocs(locationCollection);
  const locationObjects = response.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return locationObjects.map((locationObject) => locationObject.value);
}

export async function getEvents() {
  const data = await getDocs(eventsCollectionRef);
  const filteredData = data.docs.map((doc) => {
    const event = doc.data();

    return {
      ...event,
      id: doc.id,
    };
  });

  return filteredData;
}

export async function getProducts() {
  const imageListRef = ref(storage, "productsImages/");

  const list = await listAll(imageListRef);

  const imageList = await Promise.all(
    list.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return {
        productID: item.name,
        imageUrl: url,
      };
    })
  );

  const data = await getDocs(productsCollectionRef);
  const productList = data.docs.map((doc) => {
    const product = doc.data();
    return {
      ...product,
      id: doc.id,
    };
  });

  const combinedList = productList.map((product) => {
    const { id, name, price } = product;
    const { imageUrl } =
      imageList.find((image) => image.productID === id) || {};
    return { id, name, price, imageUrl };
  });

  return combinedList;
}

export async function getUsers() {
  const data = await getDocs(usersCollectionRef);
  const filteredData = data.docs.map((doc) => {
    const user = doc.data();
    return {
      ...user,
      id: doc.id,
    };
  });
  return filteredData;
}

export async function getOrders() {
  const data = await getDocs(ordersCollectionRef);
  const orders = data.docs.map((doc) => {
    const order = doc.data();

    return {
      ...order,
      id: doc.id,
    };
  });

  const flattenedOrders = orders.flatMap((order) => {
    const { id, firstName, lastName, products, eventDate, eventLocation } =
      order;
    return products.map((product) => ({
      orderID: id,
      firstName,
      lastName,
      eventDate,
      eventLocation,
      paid: (product.quantity / 100) * product.productPrice,
      ...product,
    }));
  });

  return flattenedOrders;
}

export async function updateEvent(id, update) {
  const docToUpdate = doc(db, "events", id);
  await updateDoc(docToUpdate, update);
}

export async function updateUser(id, update) {
  const docToUpdate = doc(db, "users", id);
  await updateDoc(docToUpdate, update);
}

export async function updateOrder(id, update) {
  const docToUpdate = doc(db, "orders", id);
  await updateDoc(docToUpdate, update);
}

export async function updateProduct(id, update) {
  if (update.image) {
    const imageRef = ref(storage, `productsImages/${id}`);
    uploadBytes(imageRef, update.image);
  } else {
    const docToUpdate = doc(db, "products", id);
    await updateDoc(docToUpdate, update);
  }
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours().toString().padStart(2, "0"); // Add leading zero if needed
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero if needed
  const formattedTime = hours + ":" + minutes;

  return formattedTime;
}
