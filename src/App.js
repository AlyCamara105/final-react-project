import { BrowserRouter, Route, Routes } from "react-router-dom";
import Database from "./pages/Database";
import GameObject from "./pages/GameObject";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Database/:filter/:page" element={<Database />} />
        <Route path="/:filter/:id" element={<GameObject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
