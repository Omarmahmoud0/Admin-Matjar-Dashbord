import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import type { AddDoc, AuthForm } from "~/types/types";

export function TopPage() {
  return window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export async function Login(user: AuthForm) {
  try {
    const login = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    if (!login) throw Error;
    return login;
  } catch (error) {
    console.log(error);
  }
}

export async function LogOut() {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const prods = querySnapshot?.docs?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!querySnapshot) throw Error;

    return prods;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductByID(id: string) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addToDoc(product: AddDoc) {
  try {
    const Collec = collection(db, "products");

    const docRef = await addDoc(Collec, {
      name: product.name,
      deitals: product.details,
      imageUrl: product.imageUrl,
      specifications: product.specifications,
      category: product.category,
      brand: product.brand,
      stock: product.stock,
      price: product.price,
      status: product.status,
      color: product.color,
    });
    if (!Collec) throw Error;
    return docRef;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductCartQty(id: string, qty: number) {
  if (!id) return;
  try {
    await updateDoc(doc(db, "cart", id), {
      qty: qty,
    });

    return "updated";
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFromDoc(id: string, Collection: string) {
  try {
    const docRef = await deleteDoc(doc(db, Collection, id));

    return docRef;
  } catch (error) {
    console.log(error);
  }
}

export async function searchForProducts(search: string) {
  try {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);
    const prods = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((product: any) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 12);

    if (!querySnapshot) throw Error;
    return prods;
  } catch (error) {
    console.log(error);
  }
}

// Stripe functions //
export async function getOrdersCustomer(customerId: string) {
  try {
    const res = await fetch(
      `https://matjarapp-production.up.railway.app/account/orders/${customerId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.status === 404) throw Error("not fount Payments");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Payment Error", error);
  }
}

// Stripe functions //

export async function clearCart(productId: string[]) {
  try {
    for (let i = 0; i < productId.length; i++) {
      const cart = await deleteDoc(doc(db, "cart", productId[i]));
      return cart;
    }
  } catch (error) {
    console.log("Error happend Clear cart", error);
  }
}
