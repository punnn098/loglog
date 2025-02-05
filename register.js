import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const db = getFirestore(app);

// การสมัครสมาชิก
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = ""; // ล้างข้อความเก่าก่อน

  // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
  if (!name || !email || !password || !confirmPassword) {
    errorMessage.textContent = "กรุณากรอกข้อมูลให้ครบถ้วน!";
    return;
  }

  // ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
  if (password !== confirmPassword) {
    errorMessage.textContent = "รหัสผ่านไม่ตรงกัน กรุณาลองใหม่อีกครั้ง!";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // บันทึกข้อมูลผู้ใช้ใน Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      email: email,
      createdAt: new Date(),
    });

    alert("สมัครสมาชิกสำเร็จ!");
    window.location.href = "login.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      errorMessage.textContent = "อีเมลนี้ถูกใช้ไปแล้ว!";
    } else if (error.code === "auth/weak-password") {
      errorMessage.textContent = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร!";
    } else {
      errorMessage.textContent = "เกิดข้อผิดพลาด: " + error.message;
    }
    console.error(error);
  }
});
