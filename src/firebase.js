import { initializeApp } from "firebase/app"
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth"
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
	orderBy,
	Timestamp,
} from "firebase/firestore"
const firebaseConfig = {
	apiKey: "AIzaSyA1Yv6Xy7-3eul2KGSTOfB2rXR9nMWZa04",
	authDomain: "todo-app-c2762.firebaseapp.com",
	projectId: "todo-app-c2762",
	storageBucket: "todo-app-c2762.appspot.com",
	messagingSenderId: "542138691675",
	appId: "1:542138691675:web:1b40a5d497fa9464350f7e",
	measurementId: "G-JZTY86BKY5",
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider)
		const user = res.user
		const q = query(collection(db, "users"), where("uid", "==", user.uid))
		const docs = await getDocs(q)
		if (docs.docs.length === 0) {
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name: user.displayName,
				authProvider: "google",
				email: user.email,
			})
		}
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const logInWithEmailAndPassword = async (email, password) => {
	try {
		const response = await signInWithEmailAndPassword(auth, email, password)
		console.log("login response:", response)
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password)
		const user = res.user
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
		})
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email)
		alert("Password reset link sent!")
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const logout = () => {
	signOut(auth)
}

const grabTodos = async (user) => {
	const response = await getDocs(
		collection(db, "todos"),
		where("uid", "==", user),
		orderBy("createdAt", "desc")
	)
	response.forEach((doc) => {
		console.log(doc.id, "=>", doc.metadata)
	})
}

const postTodo = async (user, todo) => {
	const response = await addDoc(collection(db, "todos"), {
		username: user,
		todoValue: todo,
		createdAt: Timestamp.fromDate(new Date("December 10, 1815")),
	})
	console.log("Add Doc Response:", response)
}
export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	grabTodos,
	postTodo,
}
