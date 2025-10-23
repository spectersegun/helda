import { useState } from "react";
import { ConfigProvider, Form } from "antd";
import GreenWrapper from "../components/common/GreenWrapper";
import type { LoginValues } from "../types";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { validateLogin } from "../data/userCredentials";
import { useAuth } from "../contexts/AuthContext";
import { useAllPageNavigation } from "../contexts/AllPagesNavigationContext";

export default function HospitalLogin2() {
  const [form] = Form.useForm<LoginValues>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const { navigateTo } = useAllPageNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async (values: LoginValues) => {
    console.log({ values });

    setLoading(true);
    setEmailError("");
    setPasswordError("");

    try {
      const validation = await validateLogin(
        values.email,
        password,
        "hospital"
      );

      const success = await login(values.email, password, "hospital");

      console.log({ success });

      if (!validation.isValid) {
        if (validation.error === "email") {
          setEmailError("You have entered an incorrect email");
        } else if (validation.error === "password") {
          setPasswordError("You have entered an incorrect password");
        }
      } else {
        if (success) {
          navigateTo("loading");
        }
      }
    } catch (error) {
      console.error("Login validation error:", error);

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
          borderRadius: 999,
        },
      }}
    >
      <GreenWrapper>
        <div className="grid grid-cols-24 gap-[3.3] !p-[4.2vw] h-full  ">
          {/* <div className="!w-full !h-full col-span-12  ">
            <img
              src="/images/hospital_pic_login.png"
              alt="hospitalLogin"
              className="!w-full !h-full object-cover rounded-[1vw]"
            />
          </div> */}

          <div className="col-span-12 bg-[url('/images/hospital_pic_login.png')] !h-full !w-full bg-no-repeat bg-cover rounded-[1vw] "></div>

          <div className="col-span-12 relative flex justify-center items-start h-full overflow-y-auto hide-native-scrollbar ">
            <div className="text-center !py-[2vh] ">
              <div className="flex justify-center">
                <img
                  src="/images/logo1.png"
                  alt="Logo"
                  className="!h-[12.7vh]  !w-auto"
                />
              </div>

              <div>
                <h1
                  id="healthcare-heading"
                  className="!text-[2.24vw] !text-center !text-black !mt-[4vw] !font-bold   !mb-[1.7vh] "
                >
                  Welcome to Helda Insights
                </h1>

                <div className="flex justify-center ">
                  <p className="!mb-[1.6vw] text-[#5B5B5B]  !text-[1vw]">
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
                  className="!max-w-[21vw] !mx-auto "
                >
                  <Form.Item
                    label={
                      <span className="text-[0.9vw] text-black">Email</span>
                    }
                    name="email"
                    className={emailError ? "!mb-0" : "!mb-[2vw"}
                  >
                    <input
                      className={`!h-[2.7vw] !text-[0.8vw]  placeholder-[#ACACAC]  !w-full !outline-none !py-4 !px-[1.4vw] !border !text-black !rounded-[1.9vw]  !transition !duration-200 ${
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
                    <div className="!pl-[1.4vw] !text-[#FD0303] !mt-1.5 font-medium flex !mb-3">
                      {emailError}
                    </div>
                  )}

                  <Form.Item
                    label={
                      <span className="text-[0.9vw] text-black">Password</span>
                    }
                    name="password"
                    className={passwordError ? "!mb-0" : "!mb-0"}
                  >
                    <div className="relative !w-full">
                      <input
                        className={`!h-[2.7vw] !text-[0.8vw] !border-[#1F664B33] placeholder-[#ACACAC] focus:!border-[#1F664B] !w-full !outline-none !py-4 !px-[1.4vw] !border  !text-black !rounded-[1.9vw] !transition !duration-200 ${
                          passwordError
                            ? "!border-[#FD0303]"
                            : "focus:!border-[#1F664B] !border-[#1F664B33]"
                        } `}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
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
                      <div className="!pl-[1.4vw] !text-[#FD0303] !mt-1.5 font-medium flex ">
                        {passwordError}
                      </div>
                    )}
                  </Form.Item>

                  <div className="flex justify-center ">
                    <button
                      disabled={loading}
                      type="submit"
                      className="
                    !mt-[6.0vh] flex justify-center items-center w-[11.7vw] !h-[2.4vw] !rounded-full !outline-none
                    !bg-[#1F664B] !text-white !text-[0.8vw] font-medium
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
