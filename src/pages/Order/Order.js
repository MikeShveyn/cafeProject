import React from "react";
import Button from '../../components/ui/Button/Button';
import classes from './Order.module.css';
import {useNavigate} from 'react-router-dom';

function Order() {
    const history=useNavigate();

    function ButtonHandler(opt) {
        history('/Menu/:' + opt);
    }
    return(
            <div className={classes.mainD} >
                please, check where do you want to seat:
                <div className={classes.optionDiv}>
                    <Button label={'Inside'} onClick={()=>ButtonHandler('Inside')}/>
                    <Button label={'Outside'} onClick={()=>ButtonHandler('Outside')}/>
                    <Button label={'Take away'} onClick={()=>ButtonHandler('Take away')}/>
                </div>
            </div>
    )
}

export default Order;