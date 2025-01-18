// import {
//   createContext,
//   Provider,
//   useContext,
//   useState,
//   useEffect,
// } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState({});
//   // const [accessToken, setAccessToken] = useState("");
//   // const [getRefreshToken, setGetRefreshToken] = useState("");
//   const [products, setProducts] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [getProductItems, setGetProductItems] = useState([]);

//   const register = async (data) => {
//     try {
//       const formData = new FormData();

//       formData.append("avatar", data.avatar[0]);
//       formData.append("userName", data.userName);
//       formData.append("email", data.email);
//       formData.append("address", data.address);
//       formData.append("mobile", data.mobile);
//       formData.append("identity", data.identity);
//       formData.append("password", data.password);

//       const response = await axios.post(
//         `http://localhost:5000/api/v1/users/register`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(response);
//     } catch (error) {
//       console.log("register failed", error.response?.data || error.message);
//     }
//   };

//   const login = async (data) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/v1/users/login`,
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json; charset=utf-8",
//           },

//           withCredentials: true,
//         }
//       );
//       // console.log("login response", response.data);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.log("login error", error.response?.data || error.message);
//     }
//   };

//   const logout = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/v1/users/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       // console.log("logout response", response.data);
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.log("logout error", error.response?.data || error.message);
//     }
//   };

//   const getUserdata = async () => {
//     const response = await axios.get(
//       `http://localhost:5000/api/v1/users/getCurrentUser`,
//       {
//         withCredentials: true,
//       }
//     );
//     if (isLoggedIn) {
//       setUser(response.data.user);
//     } else {
//       setUser({});
//     }
//   };

//   // const refreshTokens = async () => {
//   //   try {
//   //     const response = await axios.post(
//   //       `http://localhost:5000/api/v1/users/refreshToken`,
//   //       {},
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     );
//   //     const { accessToken: accessToken, getRefreshToken: newRefreshToken } =
//   //       response.data;
//   //     // console.log(response);

//   //     setAccessToken(accessToken);
//   //     setGetRefreshToken(newRefreshToken);

//   //     setIsLoggedIn(true);

//   //     return accessToken;
//   //   } catch (error) {
//   //     console.error(
//   //       "Failed to refresh tokens:",
//   //       error.response?.data || error.message
//   //     );
//   //   }
//   // };
//   // useEffect(() => {
//   //   const initializeAuth = async () => {
//   //     await refreshTokens();
//   //   };

//   //   if(!isLoggedIn){
//   //     initializeAuth()
//   //   }else{
//   //     setAccessToken(false)
//   //   }
//   // }, []);

//   const changeUserAvatar = async (data) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/api/v1/users/changeAvatar`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.log("error while updating avatar", error.message);
//     }
//   };

//   const updateUsernameAndEmail = async (data) => {
//     const formData = new FormData();
//     formData.append("userName", data.userName);
//     formData.append("email", data.email);
//     const response = await axios.patch(
//       `http://localhost:5000/api/v1/users/updateUser`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );
//     // console.log(response)
//   };

//   const updatePassword = async (data) => {
//     const response = await axios.post(
//       `http://localhost:5000/api/v1/users/changePassword`,
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );
//     // console.log(response)
//   };

//   const getAllProducts = async () => {
//     const response = await axios
//       .get(`http://localhost:5000/api/v1/products/`, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       })
//       .then((response) => {
//         setProducts(response.data);
//         // console.log(response.data);
//       })
//       .catch((error) => {
//         console.log("error while getting products", error);
//       });
//   };

//   const Addproducts = async (data) => {
//     const formData = new FormData();
//     formData.append("productImages", data.productImages[0]);
//     formData.append("productName", data.productName);
//     formData.append("discription", data.discription);
//     formData.append("productPrice", data.productPrice);

//     try {
//       const Response = await axios.post(
//         `http://localhost:5000/api/v1/products/addProducts`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//     } catch (error) {
//       console.log("error while adding product ", error);
//     }
//   };

//   const getproductById = async (item) => {
//     const response = await axios.get(
//       `http://localhost:5000/api/v1/products/${item}`,
//       {
//         headers: {
//           "Content-Type": "application/json; charset=utf-8",
//         },

//         withCredentials: true,
//       }
//     );
//     // setGetProductItems((prevItem) => [...prevItem, response.data.product])
//     // console.log(response.data.product.productName);
//     setGetProductItems(response.data.product);
//   };

//   const increament = () => {
//     setCartCount(cartCount + 1);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         login,
//         logout,
//         getUserdata,
//         user,
//         register,
//         // refreshTokens,
//         // accessToken,
//         // getRefreshToken,
//         changeUserAvatar,
//         updateUsernameAndEmail,
//         updatePassword,
//         getAllProducts,
//         products,
//         Addproducts,
//         increament,
//         cartCount,
//         getproductById,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
