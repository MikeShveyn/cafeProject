import React from "react";
import Button from '../../components/ui/Button/Button';
import classes from './Order.module.css';
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../store/data-context";
import { useContext} from "react";

function Order() {
    const history=useNavigate();
    const authCtx = useContext(AuthContext);

    function ButtonHandler(opt) {
        authCtx.clearCard();
        history('/PlaceOrder/' + opt);
    }
    return(
            <div className={classes.mainD} >
                <img src={require('../../olam.jpeg')} alt="header" />
                <div className={classes.content}>
                <h1>Please, check where do you want to seat:</h1>
                <div className={classes.optionDiv}>
                    <Button label={'Inside'} onClick={()=>ButtonHandler('Inside')}/>
                    <Button label={'Outside'} onClick={()=>ButtonHandler('Outside')}/>
                    <Button label={'Take away'} onClick={()=>ButtonHandler('TakeAway')}/>
                </div>
                </div>
             
            </div>
    )
}

export default Order;