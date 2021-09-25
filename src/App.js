import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
// *********** initially of project this used ***********
// const initialExpenses = [
//   { id: v4(), charge: "rent", amount: 1000 },
//   { id: v4(), charge: "card payment", amount: 2000 },
//   { id: v4(), charge: "credit card bill", amount: 4000 },
// ];
// **********************

// const initialExpenses = localStorage.getItem("expenses") ?
// JSON.parse(localStorage.getItem("expenses")):
// [];
const getlocalItems = () => {
  let list = localStorage.getItem("expenses");
  if (list) {
    return JSON.parse(localStorage.getItem("expenses"))
  }
};

function App() {
  const [expenses, setExpenses] = useState(getlocalItems());
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [alert, setAlert] = useState({ show: false });

  // useEffect for localStorage

  useEffect(() => {
    console.log("hello");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  const handleCharge = (e) => {
    console.log(`charge : ${e.target.value}`);
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
    console.log(`amount : ${e.target.value}`);
  };
  const handleAlert = (type, text) => {
    setAlert({ show: true, type, text });

    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
    console.log(text, type);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited successfully !" });
      } else {
        const singleExpense = { id: v4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item Added successfully !" });
      }
      setAmount("");
      setCharge("");
    } else {
      handleAlert({ type: "danger", text: "Please fill the fie  lds !" });
    }
  };
  // clear all items
  const clearItems = () => {
    handleAlert({ type: "danger", text: "All items deleted !!" });
    setExpenses([]);
  };
  // handleDelete
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  // handleEdit
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    console.log(expense);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </div>
  );
}

export default App;
