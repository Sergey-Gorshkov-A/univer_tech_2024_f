import React, { useContext } from "react";
import { MyStore } from "../../store/Context";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate()
    const store = useContext(MyStore)

    //console.log('store', store)

    const id = 'testID'
    const uuid = 'testUUID'

    const handleNavigate = () => {
        window.location.href = '/user'
    }

    return (
        <div style={{ border: '1px solid #333', height: '40px', position: 'fixed', width: '100%', background: '#fff'}}>

            <ul style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
              <div><Link to={`/${id}/${uuid}`}>Главная</Link></div>
              <div onClick={() => navigate('/info', { state: {tel: '8800-35-35'}})}>Инфо</div>
              <div onClick={() => handleNavigate()}>Пользователь</div>
            </ul>
        </div>
    )
}
