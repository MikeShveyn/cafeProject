import React from "react";
import { Route, Routes } from "react-router-dom";

import Container from "./components/ui/Layout/MainLayout";
import Main from "./pages/Main/Main";
import SignIn from "./pages/SignUp/AuthPage";
import Order from "./pages/Order/Order";
import Menu from "./pages/Menu/Menu";


function App() {
  return (
    <React.Fragment>
      <Container>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/Menu" element={<Menu />}></Route>
          <Route path="/Order" element={<Order />}></Route>
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
