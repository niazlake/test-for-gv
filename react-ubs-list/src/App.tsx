import React, {useCallback, useEffect, useState} from 'react';
import style from './App.module.css';
import {getUserByIds, getUsersList, UserById} from './api/mock';
import UserDescription from "./modals/UserDescription";

function App() {
    const [countOfDonating, setCountOfDonating] = useState(1);
    const [userDetailsList, setUserDetailsList] = useState<UserById[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalUser, setModalUser] = useState<UserById>(null);
    const increaseDonate = () => {
        setCountOfDonating(count => count + 1);
    }

    const decreaseDonate = () => {
        setCountOfDonating(count => count - 1);
    }

    const getUsers = useCallback(async () => {
        const userList: string[] = (await getUsersList()).data;
        const usersDetails = (await getUserByIds(userList)).data;
        setUserDetailsList(usersDetails);
    }, [])

    const usersListByCount = () => (
        userDetailsList.slice(0, countOfDonating)
    )

    const openModal = (userById: UserById) => {
        setModalUser(userById);
        setShowModal(true);
    }

    const hideModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        getUsers().catch(console.error);
    }, [getUsers])

    return (
        <div className="App">
            <div>
                <button onClick={increaseDonate}>+</button>
                <div>{countOfDonating}</div>
                <button disabled={countOfDonating === 1} onClick={decreaseDonate}>-</button>
            </div>
            <div className={style.userList}>
                {usersListByCount().map(user => (
                    <div className={style.userCard} key={user.id}>
                        <span className={style.userInfo}>{user.name} , {user.age}</span>
                        <span className={style.userInfo}> {user.village} ,{user.location} </span>
                        <span className={style.userInfo}>
                            {user.description}
                        </span>
                        <button onClick={() => openModal(user)}>read more</button>
                    </div>
                ))}
            </div>
            <UserDescription show={showModal} handleClose={hideModal} userById={modalUser}></UserDescription>
        </div>
    );
}

export default App;
