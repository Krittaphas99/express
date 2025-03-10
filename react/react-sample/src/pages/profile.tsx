import { AuthenAPI } from "@/service/auth";
import { user } from "@/types/User";
import { useEffect, useState } from "react";

export default function Profile() {
  const [User, setUser] = useState<user>();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const fetchCurrentUser = async () => {
        try {
          const response = await AuthenAPI.currentUser();
          console.log(response.data);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };
      fetchCurrentUser(); // เรียกใช้งาน
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          className="w-1/3 h-48 object-cover"
          src={User?.image}
          alt="Placeholder"
        />
        <div className="p-4 w-2/3">
          <h2 className="text-xl font-bold">
            {User?.firstName} {User?.lastName}
          </h2>
          <p className="text-gray-600 mt-2">Email: {User?.email}</p>
          <p className="text-gray-600 mt-2">Age: {User?.age}</p>
          <p className="text-gray-600 mt-2">
            BirthDate: {User?.birthDate.replace(/-/g, " / ")}
          </p>
          <p className="text-gray-600 mt-2">Gender: {User?.gender}</p>
          <p className="text-gray-600 mt-2">Phone: {User?.phone}</p>
        </div>
      </div>
    </div>
  );
}

function setIsLoggedIn(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setUser(data: user) {
  throw new Error("Function not implemented.");
}
