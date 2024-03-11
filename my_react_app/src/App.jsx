import { useEffect, useState } from 'react';
import './App.css';
import { PageLayout } from './components/Layout/Layout';

import {Routes, Route, useParams, useLocation, Navigate, useNavigate} from 'react-router-dom';
import { Card } from 'antd'

function App() {

  
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])


  useEffect(() => {

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

  const user = {
    name: 'Ivan',
    age: '28',
    role: 'admin'
  }
  const isAdmin = (element) => ( user.role == 'admin' ? element : <Navigate to='/error/' />)
  

  return (

      
      <Routes>
        <Route path='/*' element={isAdmin(<PageLayout />)}>
          <Route index element={<HomeComponent posts={posts} users={users}/>} />
          <Route path='info' element={<InfoPage />} />
          <Route path='user' element={<>user</>} />
          <Route path='post/:postId/' element={<PostInfoPage posts={posts} users={users}/>} />
          <Route path='*' />
        </Route>

        <Route path='/auth/'>
          <Route index element={<HomeComponent posts={posts} users={users}/>} />
          <Route path='login' element={<InfoPage />} />
          <Route path='resetpassword' element={<>user</>} />
        </Route>

        <Route path='/error/' element={<PageLayout />}>
          <Route index element={<>У вас нет роли администратора</>} />
          <Route path='login' element={<InfoPage />} />
          <Route path='resetpassword' element={<>user</>} />
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
  let user = userData.find((item) => item.id == postData.userId)
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

const InfoPage = () => {
  const location = useLocation()

  //const { tel} = location.state
  console.log("🚀 ~ InfoPage ~ location:", location)
  return (
    <>
      info:
    </>
  )
}

const PostInfoPage = ({posts, users}) => {
  const params1 = useParams()
  let post = posts.find((item) => item.id == params1.postId)
  let user = users.find((item) => item.id == post.userId)

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
      <h2>Пост №{params1.postId}:</h2>
      <Card 
        style={{
          border: '1px solid #333',
          padding: '12px',
          borderRadius: '8px',
        }}
        title={`${user.username}: ${post.title}`}
      > {post.body} </Card>
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
      <p style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        margin: '0 auto',
        marginTop: '20px',
      }}>
      {comments.map((comment, index) => <CommentComponent commentData={comment} />)}
      </p>
    </div>
    )
}