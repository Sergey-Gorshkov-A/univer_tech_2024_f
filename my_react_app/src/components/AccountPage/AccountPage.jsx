import { Button, Input, Typography, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useLazyAccountUserQuery } from "../../services/userService/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducer/userSlice/userSlice";

export const AccountPage = (account) => {
    console.log(account.account)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ email, setEmail ] = useState(account.account.email)
    const [ name, setName ] = useState(account.account.name)
    const [ password, setPassword ] = useState(account.account.password)
    const [ avatar, setAvatar ] = useState(account.account.avatar)
    const [ number, setNumber ] = useState(account.account.number)
    const [ updateUser ] = useLazyAccountUserQuery()

    const [ messageApi, contextHolder] = message.useMessage();

    const methodUpdateUser = () => {

        if (!name) {
            messageApi.error({
                content: 'Поля для заполнения обязательны'
            })
        }
        else {
            updateUser({ email, name, number }).unwrap().then(res => {
                if ( res?.ok ) {
                    localStorage.setItem('user', JSON.stringify(res.user))

                    dispatch(setUser({user: res.user}))

                    navigate('/dashboard/')
                }
            })
        }
        
    }
    return (
        <div style={{
            width: '450px',
            height: 'max-content',
            background: '#61fadb',
            padding: '20px',
            position: 'absolute',
            left: '35vw',
            top: '25vh'
        }}>
        {contextHolder}
        <Card>
          <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
          }}>
            <div style={{
                textAlign: 'center'
            }}>
                <Typography.Title>Личный кабинет пользователя</Typography.Title>
            </div>
          
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                <div>
                    <Typography.Text>Email</Typography.Text>
                    <Typography.Text>{email}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>Имя</Typography.Text>
                    <Input required name="name" placeholder="Имя" value={name} onChange={(el) => setName(el.target.value)}/>
                </div>
                <div>
                    <Typography.Text>Аватар</Typography.Text>
                    <Typography.Text>{avatar}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>Номер</Typography.Text>
                    <Input name="name" placeholder="Номер" value={number} onChange={(el) => setNumber(el.target.value)}/>
                </div>
            </div>
            <div>
                <Button title="Сохранить" onClick={() => methodUpdateUser()}>Сохранить</Button>
            </div>
            <div>
                <Button title="Выйти" onClick={() => navigate('/dashboard/')}>Выйти</Button>
            </div>
            </div>
          </Card>
        </div>
    )
}