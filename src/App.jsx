import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import { BrowserRouter, Routes, Route } from "react-router";
import MenuDetails from './components/MenuDetails/MenuDetails';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import TrackOrder from './components/TrackOrder/TrackOrder';
import Auth from './components/Auth/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CartSaver from './components/CartSaver/CartSaver';
import SearchedFood from './components/SearchedFood/SearchedFood';
// import './App.css';


function App() {

  return (
    <BrowserRouter>
      <CartSaver/>
      <Header/>
      <Routes>
          <Route  path="/home" element={<Home />} />
          <Route index  element={<Home />} />
          <Route path='/search' element={<SearchedFood/>} />
          <Route path="/menu/:id"  element={<MenuDetails />} />
          <Route path="/placeorder" element={
            <PrivateRoute>
              <PlaceOrder/>
            </PrivateRoute>
          } />
          <Route path='/trackOrder' element={
            <f>
              <TrackOrder/>
            </f>
          } />
          <Route path='/auth' element={<Auth/>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
