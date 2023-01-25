import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const RestrictedRoute = ({ ...rest }) => {

    //Redux Store
    const authState = useSelector((state:any) => state.auth)

    const AuthCheck = (props) => {
        let auth, auth_token

        if (authState.user) {
            auth = authState
            auth_token = authState.auth_token
        } else {
            // Local Storage
            const storage = JSON.parse(localStorage.getItem('persist:storage') as any)
            if (storage) {
                // auth = storage.auth
                // auth_token = JSON.parse(auth).auth_token                
                auth = JSON.parse(storage.auth)
                auth_token = auth.auth_token
            }
        }
        // console.log(auth_token , auth , auth.user)
        if (auth && auth.user) {
            //window.alert(auth.user.verification_required)
            
            return <Redirect to='/dashboard/home' />
        }
         else
            return <Redirect to='/auth/login' />
    }

    return (
        <Route
            {...rest}
            render={props => AuthCheck(props)}
        />
    );
};

export default RestrictedRoute;
