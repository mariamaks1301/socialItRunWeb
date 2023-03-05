import { Suspense } from 'react';
import PrivateRouting from './routing/PrivatRouting';
import AuthRouting from './routing/AuthRouting';
import './styles/style.scss';
import './utils/i18n';
import { useSelector } from 'react-redux';
import { userSelector } from './redux/reselect';

function App() {

const {user} = useSelector(userSelector);

  return (
    <Suspense fallback={'...loading'}>
        {
                !user.login.length ?
                    <AuthRouting/>
                    :
                   <PrivateRouting/>
        }     
    </Suspense>
  );
}

export default App;
