import { createContext, useState } from "react";

const Context = createContext({
  currentUser: {},
  setcurrentUser: () => {},
  userToken: "",
  setUserToken: () => {},
  surveys: [],
  questionTypes: [],
});
const products = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    images:
      "https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/03/cover.jpg?fit=1200%2C600&ssl=1",
  },
  {
    id: 33450,
    title: "Key Holder",
    description:
      "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    price: 30,
    discountPercentage: 2.92,
    rating: 4.92,
    stock: 54,
    brand: "Golden",
    category: "home-decoration",
    thumbnail: "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg",
    images: "https://miro.medium.com/v2/resize:fit:1400/0*92EtfQXxrWp8Pk_a",
  },
  {
    id: 3053,
    title: "Key Holder",
    description:
      "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    price: 30,
    discountPercentage: 2.92,
    rating: 4.92,
    stock: 54,
    brand: "Golden",
    category: "home-decoration",
    thumbnail: "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg",
    images:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aJKSGtM2NxtbjYXzTdMqvpV-lQQHEljxLikaMtaNb5jMQnvt3givZfNtNLG_bR7LbU0&usqp=CAU",
  },
  {
    id: 33540,
    title: "Key Holder",
    description:
      "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    price: 30,
    discountPercentage: 2.92,
    rating: 4.92,
    stock: 54,
    brand: "Golden",
    category: "home-decoration",
    thumbnail: "https://cdn.dummyjson.com/product-images/30/thumbnail.jpg",
    images: "https://miro.medium.com/v2/resize:fit:1400/0*92EtfQXxrWp8Pk_a",
  },
];

export function ContextProvider({ children }) {
  const [currentUser, _setcurrentUser] = useState(
    localStorage.getItem("current_user")
  );
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("current_user_token")
  );
  const [surveys, setSurveys] = useState(products);
  const [questionTypes, setQuestionTypes] = useState([
    "text",
    "select",
    "checkbox",
    "radio",
    "textarea",
  ]);

  const setcurrentUser = (user) => {
    // debugger
    if (user) {
      _setcurrentUser(user);
      localStorage.setItem("current_user", { user });
    } else {
      localStorage.removeItem("current_user");
    }
  };

  const setUserToken = (token) => {
    if (token) {
      _setUserToken(token);
      localStorage.setItem("current_user_token", token);
    } else {
      _setUserToken(null);
      localStorage.removeItem("current_user_token");
    }
  };

  return (
    <Context.Provider
      value={{
        currentUser,
        setcurrentUser,
        userToken,
        setUserToken,
        surveys,
        questionTypes,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
