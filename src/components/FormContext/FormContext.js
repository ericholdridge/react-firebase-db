import React, { useState, createContext, useEffect } from "react";
import firebase from "../../db/firebase";

export const FormContext = createContext();
export const FormProvider = ({ children }) => {
  const ref = firebase.firestore().collection("users");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactId, setContactId] = useState(null);
  const [btnText, setBtnText] = useState("Submit");
  const [formValues, setFormValues] = useState([]);

  // Show the firestore contacts on the page.
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
  }, [contactId]);

  // Add a user when the user submits the form
  const handleAddUser = (newUser) => {
    ref
      .doc(newUser.id)
      .set(newUser)
      .catch((error) => {
        console.log(error);
      });
    // Clear the input values after the user submits the form
    clearInputValues();
  };

  const handleSubmit = (newUser, e) => {
    e.preventDefault();
    setContactId(null);
    !contactId ? handleAddUser(newUser) : handleUpdateUser();
    clearInputValues();
  };

  // Delete a user from the firestore database
  const handleRemoveUser = (item) => {
    // Gets a reference to the contact id in the firestore database and calls the delete method on that id.
    ref
      .doc(item.id)
      .delete()
      .catch((error) => {
        console.log(error);
      });
  };

  // Populate the form input values to the contact that the user clicked on
  const handleEditUser = (item) => {
    setName(item.name);
    setEmail(item.email);
    setAddress(item.address);
    setContactId(item.id);
    // Change the button text to "Update" once the user clicks on the edit button
    setBtnText("Update")
  };

  // If the user clicks on edit and doesn't want to update the contact
  const handleCancelUpdate = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setAddress("");
    // Changed the btnText back to submit so the cancel button is hidden and the text is "Submit"
    setBtnText("Submit")
  }

  // Update a specific user in the firestore databse
  const handleUpdateUser = () => {
    setFormValues(
      formValues.map((contact) =>
        // Gets a reference to the contact id in the firestore db. If the contactId in the firestore database
        // equals the contact id of the contact the user clicked on, update the contact object.
        ref
          .doc(contact.id)
          .update(
            contact.id === contactId
              ? { ...contact, name: name, email: email, address: address }
              : contact
          )
          .catch((error) => {
            console.log(error);
          })
      )
    );
    setBtnText("Submit")
  };

  // Clear the input values when the user submits the form
  const clearInputValues = () => {
    setName("");
    setAddress("");
    setEmail("");
  };

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
        handleRemoveUser,
        handleEditUser,
        handleSubmit,
        btnText,
        handleCancelUpdate
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
