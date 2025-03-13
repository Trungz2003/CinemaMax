import { initializeApp } from "firebase/app";
import { ShowToast } from "../ultils/ToastUtils";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnj34hoQG_YQ0FT0yqYMENfSmn0pB-f2s",
  authDomain: "streamphim-a02d9.firebaseapp.com",
  projectId: "streamphim-a02d9",
  storageBucket: "streamphim-a02d9.appspot.com",
  messagingSenderId: "925379556839",
  appId: "1:925379556839:web:dc0e61b7821ba7bce67942",
  measurementId: "G-71QPNZR870",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  console.log("Starting Google sign-in...");
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-in successful:", result.user);

    return result.user;
  } catch (error) {
    console.error("Error during sign-in with Google:", error);
    ShowToast("error", "Lỗi server firebase!");
  }
};

// Hàm đăng xuất
const logOut = () => signOut(auth);

export { auth, signInWithGoogle, logOut };
