import { isAuthenticated } from 'src/core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Beo from './pages/beo';


export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  BEO: '/'
};


const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.BEO);
    }
  };
};


export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: Beo,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: requireUnauth(getState)
      }
    ]
  };
};
