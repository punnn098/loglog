import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// ตั้งค่า Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAOZcn13yUYbUBQDw6umzF-1qwAac1Ri7U",
  authDomain: "login2-e4d5e.firebaseapp.com",
  projectId: "login2-e4d5e",
  storageBucket: "login2-e4d5e.appspot.com",
  messagingSenderId: "620721591803",
  appId: "1:620721591803:web:e4805ed0916e1bd0f5a75e",
  measurementId: "G-F6DSW6MF57",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// การเข้าสู่ระบบ
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = ""; // ล้างข้อความเก่าก่อน

  if (!email || !password) {
    errorMessage.textContent = "กรุณากรอกอีเมลและรหัสผ่าน!";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    alert("เข้าสู่ระบบสำเร็จ!");
    window.location.href = "https://sites.google.com/sbtc.ac.th/mainit2it2567/Mainit2";
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      errorMessage.textContent = "ไม่พบบัญชีผู้ใช้ในระบบ!";
    } else if (error.code === "auth/wrong-password") {
      errorMessage.textContent = "รหัสผ่านไม่ถูกต้อง!";
    } else {
      errorMessage.textContent = "เกิดข้อผิดพลาด: " + error.message;
    }
    console.error(error);
  }
});
