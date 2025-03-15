import { useContext } from 'react';
import './App.css';
import { PostsProvider } from './context/PostsContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';
import DeletePost from './pages/DeletePost';
import AddProduct from './pages/AddProduct';
import EditPost from './pages/EditPost';
import AddReview from './pages/AddReview';

function App() {



  return (
    <div className="App">

      <PostsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={PostList}/>
            <Route path="/:id" Component={PostDetails}/>
            <Route path="/delete/:id" Component={DeletePost}/>
            <Route path="/add-product" Component={AddProduct}/>
            <Route path='/edit-post/:id' Component={EditPost}/>
            <Route path='/add-review/:id' Component={AddReview}/>
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </div>
  );
}

export default App;
