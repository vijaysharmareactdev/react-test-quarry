import React, { useState } from "react";
import "./styles.css";

type ContactArrType = {
  type: string;
  value: string;
};

export default function App() {
  const [title, setTitle] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [contact, setContact] = useState("");
  const [contactVal, setContactVal] = useState("");

  const [contactsArr, setContactsArr] = useState<ContactArrType[]>([]);

  const submitForm = (e: any) => {
    e.preventDefault();
    let objToSend: any = {};
    if (contactsArr?.length) {
      objToSend["title"] = title;
      objToSend["first_name"] = fName;
      objToSend["last_name"] = lName;
      objToSend["contacts_arr"] = contactsArr;

      console.log("objToSend", objToSend);
    } else {
      alert("Please add a contact");
    }
  };

  const getContactValueType = () => {
    let toReturn = "text";
    if (contact === "1") {
      toReturn = "tel";
    } else if (contact === "2") {
      toReturn = "email";
    }
    return toReturn;
  };

  const addContact = (e: any) => {
    e.preventDefault();
    if (contact?.length && contactVal?.length) {
      let regexToTest =
        contact === "1"
          ? /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/
          : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (regexToTest.test(contactVal)) {
        let oldVal = [...contactsArr];
        oldVal.push({ type: contact, value: contactVal });
        setContactsArr([...oldVal]);
        setContact("");
        setContactVal("");
      } else {
        alert(
          `Please add correct ${contact === "1" ? "mobile number" : "email id"}`
        );
      }
    } else {
      alert("Please Add Contact");
    }
  };

  const deleteContact = (index: number) => {
    let oldContactsArr = [...contactsArr];
    oldContactsArr.splice(index, 1);
    setContactsArr([...oldContactsArr]);
  };

  return (
    <div className="App">
      <form className="form-container">
        <input
          type="text"
          value={title}
          placeholder="Title"
          className={"input-class"}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          required
          type="text"
          value={fName}
          placeholder="First Name"
          className={"input-class"}
          onChange={(e) => setFName(e.target.value)}
        />
        <input
          type="text"
          value={lName}
          placeholder="Last Name"
          className={"input-class"}
          onChange={(e) => setLName(e.target.value)}
        />
        <select
          value={contact}
          className={"contact-class"}
          onChange={({ target }) => setContact(target.value)}
        >
          <option value={""} disabled>
            {"contact type"}
          </option>
          <option value={"1"}>{"Mobile No"}</option>
          <option value={"2"}>{"Email Id"}</option>
        </select>
        <input
          required
          value={contactVal}
          className={"input-class"}
          placeholder="Contact Value"
          type={getContactValueType()}
          onChange={(e) => setContactVal(e.target.value)}
        />
        <button onClick={addContact}>{"Add Contact"}</button>

        {contactsArr.map((item, i) => {
          let contactTypeStr = item.type === "1" ? "Mobile No" : "Email Id";
          return (
            <div key={`contact-${i}`} className={"contact-row"}>
              <span>{contactTypeStr}</span>
              <span>{item.value}</span>
              <button onClick={() => deleteContact(i)}>{"Delete"}</button>
            </div>
          );
        })}

        <input
          className="submit-class"
          type="submit"
          value="submit form"
          onClick={submitForm}
        />
      </form>
    </div>
  );
}
