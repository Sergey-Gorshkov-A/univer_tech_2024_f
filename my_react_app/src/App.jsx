import { useEffect, useState } from 'react';
import './App.css';
import { PageLayout } from './components/Layout/Layout';
import { LoginPage } from './components/LoginPage/LoginPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';

import {Routes, Route, useParams, useLocation, useNavigate} from 'react-router-dom';
import { Button, Card, Result } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from './store/reducer/userSlice/userSlice';
import { AccountPage } from './components/AccountPage/AccountPage';


function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, token} = useSelector((state) => state.userReducer)
  
  const getLocalStorageItems = (key) => {
    return localStorage.getItem(key)
  }
  if (Object.keys(user).length === 0 && !token) {
    dispatch(setUser({ user: JSON.parse(getLocalStorageItems('user')) }))
    dispatch(setToken({token: getLocalStorageItems('token')}))
  }

  const isAuth = (element) => (user.id && token ? element : <Result 
    status='403' 
    title='403' 
    subTitle="Вы не авторизованы!"
    extra={<Button type='primary' onClick={() => navigate('/auth/login/')}>Авторизоваться</Button>}
  />)

  const [state, setState] = useState(null)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  const callBackendAPI= async () => {
    const response = await fetch('/express_backend')
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }


  useEffect(() => {
    callBackendAPI()
    .then(res => setState(res.express))
    .catch(err => console.log(err))
    getPosts()
    getUsers()
  }, [])

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(res => setPosts(res))
  }

  const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res1 => res1.json())
    .then(res1 => setUsers(res1))
  }

  //const userA = {
    //name: 'Ivan',
    //age: '28',
    //role: 'admin'
  //}
  //const isAdmin = (element) => ( userA.role == 'admin' ? element : <Navigate to='/error/' />)
  

  return (

      
      <Routes>
        <Route path='*' element={<Result
            status='404' 
            title='404' 
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type='primary'>Back Home</Button>}
            />}/>
          <Route path='/dashboard/*' element={isAuth(<PageLayout children={user}/>)}>
          <Route index element={<HomeComponent posts={posts} users={users}/>} />
          <Route path='info' element={<InfoPage state={state}/>} />
          <Route path='user' element={<>user: {user.name}</>} />
          <Route path='post/:postId/' element={<PostInfoPage posts={posts} users={users}/>} />
        </Route>

        <Route path='/auth/'>
          <Route index element={<HomeComponent posts={posts} users={users}/>} />
          <Route path='login' element={<LoginPage />} />
          <Route path='reg' element={<RegisterPage />} />
          <Route path='resetpassword' element={<>user</>} />
        </Route>

        <Route path='/error/' element={<PageLayout />}>
          <Route index element={<>У вас нет роли администратора</>} />
          <Route path='login' element={<InfoPage />} />
          <Route path='resetpassword' element={<>user</>} />
        </Route>

        <Route path='/account/' element={<AccountPage account={user} />}>
          
        </Route>
      </Routes>
  );
}

export default App;

const HomeComponent = ({posts, users}) => {

  const params = useParams()
  const location = useLocation()
  console.log("🚀 ~ HomeComponent ~ location:", location)

  console.log("🚀 ~ HomeComponent ~ params:", params)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '64em',
      margin: '0 auto',
      marginTop: '20px',
    }}>
      {posts.map((post, index) => <PostComponent postData={post} userData={users} />)}
    </div>
  )
}

const PostComponent = ({ postData, userData }) => {
  const navigate = useNavigate()
  let user = userData.find((item) => item.id === postData.userId)
  let postlink = `/post/${postData.id}`


  return (
    <div>
      <Card 
        hoverable
        style={{
          border: '1px solid #333',
          padding: '12px',
          borderRadius: '8px',
        }}
        title={`${user.username}: ${postData.title}`}
        extra={postData.id}
        onClick={() => navigate(postlink)}
      > {postData.body} </Card>
    </div>
  )
}

const CommentComponent = ({ commentData }) => {

  return (
    <div>
      <Card 
        hoverable
        title={commentData.name}
        extra={`email: ${commentData.email}`}
      > {commentData.body} </Card>
    </div>
  )
}

const InfoPage = ({state}) => {
  const location = useLocation()

  //const { tel} = location.state
  console.log("🚀 ~ InfoPage ~ location:", location)
  return (
    <>
      info: {state}
    </>
  )
}

//const PageError = () => {
  //const params = useParams()
  //const location = useLocation()

  //const { tel} = location.state
  //console.log("🚀 ~ InfoPage ~ location:", location)
  //console.log("🚀 ~ InfoPage ~ params:", params)
  //return (<>Error</>)
//}

const PostInfoPage = ({posts, users}) => {
  const params1 = useParams()
  let post = posts.find((item) => item.id === params1.postId)
  let user = users.find((item) => item.id === post.userId)

  const [comments, setComments] = useState([])
  
  useEffect(() => {

    getComments()
  }, [])

  const getComments = () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${params1.postId}`)
    .then(res2 => res2.json())
    .then(res2 => setComments(res2))
  }

  console.log("🚀 ~ PostInfoPage ~ params:", params1)
  return (
    <div>
      <p style={{
        width: '64em',
        margin: '0 auto',
        marginTop: '20px',
        }}>
      <h2>
        Пост №{params1.postId}:</h2>
      </p>
      <Card 
        style={{
          border: '1px solid #333',
          padding: '12px',
          borderRadius: '8px',
          width: '64em',
          margin: '0 auto',
          marginTop: '5px',
        }}
        title={`${user.username}: ${post.title}`}
      > {post.body} </Card>
      <p style={{
        width: '64em',
        margin: '0 auto',
        marginTop: '20px',
        }}>
        <h2>Об авторе:</h2>
        <h5>Никнеим: {user.username};</h5>
        <h5>Имя: {user.name};</h5>
        <h5>Электронная почта: {user.email};</h5>
        <h5>Адрес: {user.address.city}, {user.address.street}, {user.address.suite};</h5>
        <h5>Zip-код: {user.address.zipcode};</h5>
        <h5>Геолокация: {user.address.geo.lat}, {user.address.geo.lng};</h5>
        <h5>Телефон: {user.phone};</h5>
        <h5>Сайт: {user.website};</h5>
        <h5>Компания: {user.company.name} ("{user.company.catchPhrase}", {user.company.bs});</h5>
        <h2>Комментарии:</h2>
      </p>
      <p style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '64em',
        margin: '0 auto',
        marginTop: '20px',
      }}>
      {comments.map((comment, index) => <CommentComponent commentData={comment} />)}
      </p>
    </div>
    )
}