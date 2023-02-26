import { Suspense } from 'react';
import PrivateRouting from './routing/PrivatRouting';
import AuthRouting from './routing/AuthRouting';
import './styles/style.scss';
import './utils/i18n';
import { useSelector } from 'react-redux';

function App() {

const {user} = useSelector(store => store.user);

  return (
    <Suspense fallback={'...loading'} className="App">
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
