import { Routes, Route } from 'react-router-dom';
import { path } from './utils/path';
import { Home, Login, Register } from './container/Public/index';

function App() {
  return (
    <div className='App bg-primary'>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
