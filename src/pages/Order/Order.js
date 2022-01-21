import React from "react";
import Button from '../../components/ui/Button/Button';
import classes from './Order.module.css';


function Order() {
    return(
            <div className={classes.mainD}>
                please, check where do you want to seat:
                <div className={classes.optionDiv}>
                    <Button label={'Inside'}/>
                    <Button label={'Outside'}/>
                </div>
            </div>
    )
}

export default Order;