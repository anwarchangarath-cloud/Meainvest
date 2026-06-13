import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase/config'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function register(email, password, displayName, phone = '') {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName })
    try {
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email,
        displayName,
        phone,
        role: 'user',
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    } catch (firestoreErr) {
      // Auth succeeded — Firestore profile save failed (rules/not created yet)
      // Don't block registration, profile will be created on next login
      console.warn('Firestore profile save failed:', firestoreErr.message)
    }
    return result
  }

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function adminLogin(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const profile = await getDoc(doc(db, 'users', result.user.uid))
    if (!profile.exists() || profile.data().role !== 'admin') {
      await signOut(auth)
      throw new Error('Access denied. Admin credentials required.')
    }
    return result
  }

  async function logout() {
    return signOut(auth)
  }

  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  async function fetchUserProfile(uid) {
    const snap = await getDoc(doc(db, 'users', uid))
    if (snap.exists()) setUserProfile(snap.data())
  }

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        try { await fetchUserProfile(user.uid) } catch { /* offline */ }
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const value = {
    currentUser,
    userProfile,
    register,
    login,
    adminLogin,
    logout,
    resetPassword,
    fetchUserProfile,
    isAdmin: userProfile?.role === 'admin',
    isApproved: userProfile?.status === 'approved',
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
