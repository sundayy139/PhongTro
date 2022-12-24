import { Routes, Route } from 'react-router-dom';
import { path } from './utils/path';
import { DetailPost, Home, HomePage, Login, Register, RentalApartment, RentalHouse, RentalPremises, RentalRoom } from './container/Public/index';

function App() {
  return (
    <div className='App bg-primary'>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={path.HOME__PAGE} element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<RentalApartment />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<RentalPremises />} />
          <Route path={path.NHA_CHO_THUE} element={<RentalHouse />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalRoom />} />
          <Route path={path.DETAIL_POST} element={<DetailPost />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
