import 'animate.css/animate.min.css';
import { Outlet } from 'react-router-dom';
// import Carousel from './components/Carousel'
// import Services from './components/Services';
// import Testimonials from './components/Testimonials';
// import About from './components/About';
// import Products from './components/Products';
// import DotNavigation from './components/DotNavigation';
// import Contact from './components/Contact';
// import NewFooter from './components/NewFooter';
// import Home from './components/Home';

function App() {

  let isAdmin = true;

  return (
<>
    {isAdmin && (<Outlet/>) }
</>
  );
}

export default App;
