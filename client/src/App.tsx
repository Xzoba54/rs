import "./styles/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthProvider";

import { Container, Layout } from "./styles/common";

import Navbar from "./components/navbar/Navbar";

import Product from "./pages/Product";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />

          <Container>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:slug" element={<Product />} />
              </Routes>
            </Layout>
          </Container>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
