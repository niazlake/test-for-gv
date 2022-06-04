import React from 'react';
import style from './userDescription.module.css'
import {UserById} from "../api/mock";

const UserDescription = (props: { handleClose: (() => void), show: boolean, userById: UserById }) => {
    const {handleClose, show, userById} = props;
    const showHideClassName = show ? `${style.modal} ${style.displayBlock}` : `${style.modal} ${style.displayNone}`;

    return (
        <div className={showHideClassName}>
            <section className={style.modalMain}>
                {userById && Object.keys(userById).map(value => (
                    <span className={style.info}>
                       {value} : {userById[value]}
                    </span>
                ))}
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};
export default UserDescription;