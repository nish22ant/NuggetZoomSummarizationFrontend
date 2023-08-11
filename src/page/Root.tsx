import {Outlet} from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';

const Root = () => {
    return (<>
        <Navigation/>
        <div><Outlet/></div>
        <Footer/>
    </>)
}

export default Root;