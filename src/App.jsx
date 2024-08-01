import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Meal from "./components/Meal";
import { Cart } from "./components/UI/Cart";
import { CartContectProvider } from "./components/store/CartContext";
import { UserPogressContextProvider } from "./components/store/UserProgress";

function App() {
  return (
    <UserPogressContextProvider>
      <CartContectProvider>
        <Header />
        <Meal />
        <Cart />
        <CheckOut />
      </CartContectProvider>
    </UserPogressContextProvider>

  );
}

export default App;
