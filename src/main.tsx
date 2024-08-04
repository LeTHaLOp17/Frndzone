//createRoot ReactDOM mai nhi hoat hai esliye /client se kar rahe hai
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App';

//Starting point hai application ka
ReactDOM.createRoot(document.getElementById('root')!).render(
    //this means now browerRouter will control our application
    <BrowserRouter> 
    <App />
    </BrowserRouter>
)