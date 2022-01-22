import React from "react";
import { Link } from "react-router-dom";
import { useContext , useState} from "react";
import css from "./TopNavBar.module.css";
import AuthContext from "../../store/data-context";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button/Button";
import CafeDialog from "../ui/Dialog/CafeDialog";
import {addOrder} from "../../store/firebase";


function TopNavBar() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useNavigate();
  const [openDialog, setDialogOpen] = useState(false);

  const openCard = () => {
    console.log('Open card' ,authCtx.data);
    setDialogOpen(true);
  };


  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  const onDialogSubmit = async (data) => {
    console.log("dialog submit", data);
    try {
      await addOrder(data);
      setDialogOpen(false);
    } catch (er) {
      console.error(er);
    }
  };

  const logOutButtonHandler = () => {
    authCtx.logout();
    history("/");
  };

  return (
    <header className={css.fixed}>
      <div className={css.logoTitle}>
        <img src="assets/imgs/logo.png" alt="header" />
        <span>
          <Link to="/">Coffeen Bar</Link>
        </span>
      </div>
      <nav>
        <ul>
          {(isLoggedIn && authCtx.user.type === "Admin") && (
            <li>
              <Link to="/Menu">Menu</Link>
            </li>
          )}

          {(isLoggedIn && authCtx.user.type === "Admin") && (
            <li>
              <Link to="/Tables">Tables</Link>
            </li>
          )}
          <li>
            <Link to="/Order">Order</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/SignIn">LogIn</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <div className="classes.welcome">
                <p>
                  Hello, {authCtx.user.name}
                </p>
              </div>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className={css.logOut} onClick={logOutButtonHandler}>
                LogOut
              </button>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Button label={'card'} onClick={()=>{openCard()}}/>
            </li> 
          )}
        </ul>
      </nav>
      <CafeDialog
        openDialog={openDialog}
        dataType={'card'}
        menuData={{menu: authCtx.data, table :authCtx.table}}
        onDialogClose={() => handleDialogClose()}
        onDialogSubmit={onDialogSubmit}
      />
    </header>
  );
}

export default TopNavBar;
