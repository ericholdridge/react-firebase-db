import React, { useState, createContext, useEffect } from "react";
import firebase from "../../db/firebase";
import { v4 as uuidv4 } from "uuid";

export const FormContext = createContext();
export const FormProvider = ({ children }) => {
  const ref = firebase.firestore().collection("users");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [formValues, setFormValues] = useState([]);


  const handleOutputFormValues = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFormValues(items);
    });
  };

  useEffect(() => {
    handleOutputFormValues();
  }, []);

  const clearInputValues = () => {
    setName("");
    setAddress("");
    setEmail("");
  };

  const handleAddUser = (newUser, e) => {
    // Prevent the page from refreshing after the submit button is clicked
    e.preventDefault();
    ref
      .doc(newUser.id)
      .set(newUser)
      .catch((error) => {
        console.log(error);
      });
    // Clear the input values after the user submits the form
    clearInputValues();
  };

  // Delete a user
  const handleRemoveUser = (item) => {
    ref
      .doc(item.id)
      .delete()
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditUser = (item) => {
    console.log(item)
  }

  return (
    <FormContext.Provider
      value={{
        name,
        setName,
        address,
        setAddress,
        email,
        setEmail,
        formValues,
        handleAddUser,
        handleRemoveUser,
        handleEditUser
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
