import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useCustomHook } from "../../hooks/myCustomHook";

import './Layout.css'
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button} from 'antd'


export const PageLayout = ({children}) => {

    const {Header, Content, Footer, Sider} = Layout;
    const navigate = useNavigate()
    const [number, setNumber] = useState(0)

    //const value = useCustomHook()
    
    useEffect(() => {
        //alert('Component mount')

        return (() => {
          alert('Component mount')
        })
    }, [number])

    //const increment = () => {
        //setNumber(number + 1)
    //}
    // useMemo
    // useCallback

    //const textareaRef = useRef()

    const menuItems = [
      { id: 1, label: 'Главная', key: 1, link: '/dashboard'},
      { id: 2, label: 'Инфо', key: 2, link: '/dashboard/info'},
      { id: 3, label: 'Пользователь', key: 3, link: '/dashboard/user'},
      { id: 4, label: 'Вход/Региcтрация', key: 4, link: '/auth/login'},
    ]

    const accountItems = [
      {id: 1, label: children.name, key: 3, link: '/account/'}
    ]

    const handleNavigate = (key) => {
      let link = menuItems.find((item) => item.key == key) 
      
      if (link) {
        navigate(link.link)
      }
    }

    return (
        <Layout>
          <Header style={{display: 'flex', alignItems: 'center'}}>
            <Menu
              items={menuItems}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              onClick={({key}) => handleNavigate(key)}
            />
            <Header>
              <div style={{
                paddingLeft: '65vw',
                position: 'absolute'
              }}>
                <Button onClick={() => navigate('/account/')}>{children.name}</Button>
              </div>
            </Header>
          </Header>
          <Content>
            <Layout>
              <Sider theme="light"> <Menu items={menuItems}/> </Sider>
              <Content style={{ height: '100vh', overflowY: 'auto', margin: '0 auto'}}> <Outlet /> </Content>
            </Layout>
          </Content>
          <Footer></Footer>
        </Layout>
    )
}


class LayoutClass extends React.Component {

    constructor(props){

      super(props)
      this.state = {
        number: 10,
        number1: 11,
        number2: 12,
        number3: 13,
        number4: 14,
        number5: 15,
      }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }
    render() {

        const { number, number1, number2, number3, number4, number5 } = this.state
        return (
          <div>
            <p>Class component</p>
            <p>state number: {number}</p>
            <p>state number1: {number1}</p>
            <p>state number2: {number2}</p>
            <p>state number3: {number3}</p>
            <p>state number4: {number4}</p>
            <p>state number5: {number5}</p>
            <input type="button" value={'incr'} onClick={() => this.setState({ ...this.state, number: number + 1})} />
            <input type="button" value={'incr number5'} onClick={() => this.setState({ number5: number5 + 1})} />
          </div>
        )
    }

}
