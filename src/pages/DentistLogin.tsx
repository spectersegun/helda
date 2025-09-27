import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Form } from "antd";
import GreenWrapper from "../components/common/GreenWrapper";
import type { LoginValues } from "../types";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { validateLogin } from "../data/userCredentials";
import { notify } from "../utils/notify";

export default function DentistLogin() {
  const [form] = Form.useForm<LoginValues>();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async (values: LoginValues) => {
    console.log({ values });

    setLoading(true);
    setEmailError("");
    setPasswordError("");

    console.log(values.email, password, "hospital");

    try {
      const validation = await validateLogin(values.email, password, "dentist");
      console.log({ validation });

      if (!validation.isValid) {
        if (validation.error === "email") {
          setEmailError("You have entered an incorrect email");
        } else if (validation.error === "password") {
          setPasswordError("You have entered an incorrect password");
        }
      } else {
        notify.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login validation error:", error);

      // Handle unexpected errors gracefully
      setEmailError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1F664B",
          colorBorder: "#1F664B33",
          colorText: "#0B0B0B",
          borderRadius: 999, // round inputs nicely
        },
      }}
    >
      <GreenWrapper>
        <div className="grid grid-cols-2 gap-16 !px-20 h-full  ">
          <div className="!w-full !h-full !py-12  ">
            <img
              src="/images/DentistLogin.png"
              alt="hospitalLogin"
              className="!w-full !h-full object-cover rounded-[20px]"
            />
          </div>
          <div className="!py-12 relative flex justify-center items-center h-full overflow-y-auto hide-native-scrollbar ">
            <div className="text-center !py-6  ">
              <div className="flex justify-center !mb-12">
                <img
                  src="/images/logo1.png"
                  alt="Logo"
                  className="w-16 h-auto   "
                />
              </div>

              <div>
                <h2 className="!text-[42px] font-extrabold login-title !mb-4 ">
                  Welcome to Helda Insights
                </h2>
                <div className="flex justify-center ">
                  <p className="!mb-10 text-[#5B5B5B]  !text-base">
                    Enter your email and password to access your account
                  </p>
                </div>
              </div>

              <div>
                <Form<LoginValues>
                  form={form}
                  name="loginHospital"
                  layout="vertical"
                  requiredMark={false}
                  onFinish={onFinish}
                  autoComplete="off"
                  className="space-y-3 !max-w-[420px] !mx-auto "
                >
                  <Form.Item
                    label={<span className="text-sm text-black">Email</span>}
                    name="email"
                    className={emailError ? "!mb-0" : ""}
                  >
                    <input
                      className={`!h-12 text-base  placeholder-[#ACACAC]  !w-full !outline-none !py-4 !px-7 !border !text-black !rounded-[40px]  !transition !duration-200 ${
                        emailError
                          ? "!border-[#FD0303]"
                          : "focus:!border-[#1F664B] !border-[#1F664B33]"
                      } `}
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Item>
                  {emailError && (
                    <div className="!pl-7 !text-[#FD0303] !mt-1.5 font-medium flex !mb-3">
                      {emailError}
                    </div>
                  )}

                  <Form.Item
                    label={<span className="text-sm text-black">Password</span>}
                    name="password"
                    className={passwordError ? "!mb-0" : ""}
                  >
                    <div className="relative !w-full">
                      <input
                        className={`!h-12 text-base !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !w-full !outline-none !py-4 !px-7 !border  !text-black !rounded-[40px] !transition !duration-200 ${
                          passwordError
                            ? "!border-[#FD0303]"
                            : "focus:!border-[#1F664B] !border-[#1F664B33]"
                        } `}
                        type={showPassword ? "text" : "password"} // toggle between text and password
                        placeholder="Enter your password"
                        value={password} // always bind to real password state
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#1F664B]"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOutlined style={{ color: "black" }} />
                        ) : (
                          <EyeInvisibleOutlined style={{ color: "black" }} />
                        )}
                      </span>
                    </div>
                    {passwordError && (
                      <div className="!pl-7 !text-[#FD0303] !mt-1.5 font-medium flex ">
                        {passwordError}
                      </div>
                    )}
                  </Form.Item>

                  <div className="flex justify-center ">
                    <button
                      disabled={loading}
                      type="submit"
                      className="
                    !mt-8 flex justify-center items-center w-[232px] !h-12 !rounded-full !outline-none
                    !bg-[#1F664B] !text-white !text-base font-medium
                    transition-colors duration-300 ease-out
                    hover:!bg-white hover:!text-[#1F664B] !border-2 !border-[#1F664B] 
                    active:!shadow-[0_4px_7.3px_-1px_#1F664B]
                     active:!bg-[#1F664B]  active:!text-white
                  "
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </GreenWrapper>
    </ConfigProvider>
  );
}
