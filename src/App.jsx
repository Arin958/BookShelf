import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import ShelfPage from "./pages/Shelf";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/shelf"
          element={
            <ProtectedRoute>
              <ShelfPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
