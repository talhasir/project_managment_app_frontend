import { createContext, useState } from "react";

const Context = createContext({
  currentUser: {},
  setcurrentUser: () => {},
  userToken: "",
  setUserToken: () => {},
  questionTypes: [],
  isModalOpen: false,
  setIsModalOpen: ()=>{},
});

export function ContextProvider({ children }) {
  const [currentUser, _setcurrentUser] = useState(
    localStorage.getItem("current_user")
  );
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("current_user_token")
  );
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
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
        questionTypes,
        isModalOpen,
        setIsModalOpen
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
