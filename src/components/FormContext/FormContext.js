import React, { useState, createContext, useEffect } from "react";
import firebaseDb from "../../db/firebase";
import { v4 as uuidv4 } from "uuid";

export const FormContext = createContext();
export const FormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    address: "",
    email: "",
    id: uuidv4(),
  });
  const [dbContacts, setDbContacts] = useState({});

  // Update the form values object with the users input
  const updateFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
      id: uuidv4(),
    }));
  };

  // Add the form values object to the firebaseDB
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Check if the form values are not empty
    if (
      formValues.fullName.trim() &&
      formValues.address.trim() &&
      formValues.email.trim() !== ""
    ) {
      // If form values aren't empty, add the form values to the firebaseDB
      handleAddingValuesToFirebase(formValues);
      // Clear the input values after the form submit
      setFormValues({
        fullName: "",
        address: "",
        email: "",
      });
    } else {
      return alert("The form is invalid. Try again");
    }
  };

  // Create contacts key in the firebaseDB and push the form values object
  const handleAddingValuesToFirebase = (obj) => {
    firebaseDb.ref("contacts").push(obj, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  // Get the contact values in the firebaseDB and store them in a new state object
  useEffect(() => {
    firebaseDb.ref("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setDbContacts({
          ...snapshot.val(),
        });
      }
    });
  }, []);

  // Delete the object that is clicked on by the user
  const handleDeleteContact = (item) => {
    firebaseDb.ref(`contacts/${item}`).remove((err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  return (
    <FormContext.Provider
      value={{
        formValues,
        updateFormValues,
        handleFormSubmit,
        dbContacts,
        handleDeleteContact,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
