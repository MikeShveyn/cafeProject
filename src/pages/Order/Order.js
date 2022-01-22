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
                Please, check where do you want to seat:
                <div className={classes.optionDiv}>
                    <Button label={'Inside'} onClick={()=>ButtonHandler('Inside')}/>
                    <Button label={'Outside'} onClick={()=>ButtonHandler('Outside')}/>
                    <Button label={'Take away'} onClick={()=>ButtonHandler('TakeAway')}/>
                </div>
            </div>
    )
}

export default Order;