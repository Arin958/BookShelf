import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import ShelfPage from "./pages/Shelf";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/shelf" element={<ShelfPage />} />
      </Routes>
    </>
  );
}

export default App;
