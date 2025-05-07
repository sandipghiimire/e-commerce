"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (!confirm("Do you really want to log out?")) return;
    try {
      const res = await fetch("/api/logout", {
        method: "GET",      // ← make it POST
      });
      if (!res.ok) throw new Error(`Logout failed (${res.status})`);
      toast.success("Signed out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  

  return (
    <>
      {user ? (
        <button
          onClick={handleLogout}
          className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100 transition"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      ) : null}
    </>
  );
}
