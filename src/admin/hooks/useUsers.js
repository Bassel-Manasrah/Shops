import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebase";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const usersCollection = collection(database, "users");

  const fetchUsers = () => {
    onSnapshot(usersCollection, (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setUsers(users);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promoteToMember = async (userID) => {
    const docRef = doc(database, "users", userID);
    await updateDoc(docRef, { isMember: true });
  };

  const demoteToUser = async (userID) => {
    const docRef = doc(database, "users", userID);
    await updateDoc(docRef, { isMember: false });
  };

  return { users, loading, promoteToMember, demoteToUser };
}
