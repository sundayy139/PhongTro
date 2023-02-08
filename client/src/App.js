import { Routes, Route } from 'react-router-dom';
import { path } from './utils/path';
import { DetailPost, Home, HomePage, Login, Register, LeasePage, SearchDetail } from './container/Public/index';
import { CreatePost, System } from './container/System/index';
import { Auth, IsAdmin } from './middleware/authMiddleware'

function App() {
  return (
    <div className='App bg-primary'>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={path.HOME__PAGE} element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<LeasePage />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<LeasePage />} />
          <Route path={path.NHA_CHO_THUE} element={<LeasePage />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<LeasePage />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAIL_POST} element={<DetailPost />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<Auth><System /></Auth>}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
