import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { req_authenLogin } from "@/types/auth_login";
import { AuthenAPI } from "@/service/auth";

// กำหนดประเภทของ props ที่จะรับเข้ามา
interface AuthPopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, setIsOpen ,setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    console.log("Logging in with", email, password);
    const loginData: req_authenLogin = {
      username: email,
      password: password,
    };

    
      AuthenAPI.login(loginData)
        .then((response) => {
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          
          alert("Login Success!");
          setIsLoggedIn(true);
          setIsOpen(false)
        })
        .catch((error) => {
            alert("Login Failed!");
          console.error(
            "Login Failed:",
            error.response?.data?.message || error.message
          );
        });
    
    // setTimeout(() => {

    //   alert("Login successful!");
    //   setIsOpen(false); // ปิด Dialog หลังจากการล็อกอินเสร็จ
    // }, 30000);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        {/* Overlay ที่ป้องกันไม่ให้คลิกปิด */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed bg-white p-6 rounded-lg w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* ปุ่มปิด */}
          <button
            onClick={() => setIsOpen(false)} // ปิด Dialog เมื่อคลิกปุ่มนี้
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
          >
            Login
          </button>

          <button className="theme-light w-full h-[40px] rounded-full mb-4 bg-white border border-solid border-[#dadce0] hover:bg-[#f8fafe] hover:border-[#d2e3fc] hover:transition">
            <div className="flex flex-row justify-center content-center space-x-1.5 ">
              <span
                className="w-6 h-6 flex place-center cursor-pointer text-grey-600 "
                data-testid="icon-wrapper"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    fill="#0053cf"
                    d="M9 3a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6 6 6 0 00-6-6z"
                  ></path>
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M9.876 14.931V10.67h1.639l.257-1.665H9.875v-.91c0-.692.226-1.305.873-1.305h1.04V5.336l-.01-.001c-.187-.025-.572-.077-1.289-.077-1.524 0-2.418.805-2.418 2.639v1.108H6.504v1.665h1.567v4.248a5.953 5.953 0 001.804.013z"
                  ></path>
                </svg>
              </span>
              <span className="self-center font-inter-regular text-sm font-light text-[#3c4043]">
                Sign in with Facebook
              </span>
            </div>
          </button>
          <button className="theme-light w-full h-[40px] rounded-full bg-white border border-solid border-[#dadce0] hover:bg-[#f8fafe] hover:border-[#d2e3fc] hover:transition">
            <div className="flex flex-row justify-center content-center space-x-1.5">
              <span
                className="w-6 h-6 flex place-center cursor-pointer text-grey-600"
                data-testid="icon-wrapper"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="LgbsSe-Bz112c"
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
              </span>
              <span className="self-center font-inter-regular text-sm font-light text-[#3c4043]">
                Sign in with Google
              </span>
            </div>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthPopup;
function setIsLoggedIn(arg0: boolean) {
    throw new Error("Function not implemented.");
}

