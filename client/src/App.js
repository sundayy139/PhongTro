import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { path } from './utils/path';
import { DetailPost, Home, HomePage, Login, Register, LeasePage, SearchDetail, Contact, Blog, DetailBlog, ForgotPassword, ResetPassword } from './container/Public/index';
import { CreatePost, ManageProfile, ManagePost, System, ChangePassword, ManageUser, ManagePostAdmin, ManagePage, CreateBlog, ManageBlog, StatisticsByMonth, StatisticsByDay } from './container/System/index';
import { Auth, IsAdmin } from './middleware/authMiddleware'
import { useDispatch, useSelector } from 'react-redux';
import *  as actions from './store/actions'

function App() {

  const { isLoggedIn } = useSelector(state => state.auth)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getCategories());
    dispatch(actions.getAcreages());
    dispatch(actions.getPrices());
    dispatch(actions.getProvinces());
  }, [])

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUser())
    }, [1000])
  }, [isLoggedIn])

  return (
    <div className='App bg-primary w-full h-full' >
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />
          <Route path={path.HOME__PAGE} element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<LeasePage />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<LeasePage />} />
          <Route path={path.NHA_CHO_THUE} element={<LeasePage />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<LeasePage />} />
          <Route path={path.TIM_NGUOI_O_GHEP} element={<LeasePage />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.LIEN_HE} element={<Contact />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.DETAIL_BLOG__BLOGID} element={<DetailBlog />} />
          <Route path={path.DETAIL_POST__POSTID} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<Auth><System /></Auth>}>
          <Route path={path.SYSTEM} element={<ManagePage />} />
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.MANAGE_PROFILE} element={<ManageProfile />} />
          <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={path.MANAGE_USERS} element={<ManageUser />} />
          <Route path={path.MANAGE_BLOG} element={<ManageBlog />} />
          <Route path={path.CREATE_BLOG} element={<CreateBlog />} />
          <Route path={path.MANAGE_POSTS_ADMIN} element={<ManagePostAdmin />} />
          <Route path={path.STATISTICS_MONTH} element={<StatisticsByMonth />} />
          <Route path={path.STATISTICS_DAY} element={<StatisticsByDay />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
