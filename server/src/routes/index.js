import authRouter from './auth'
import insertRouter from './insert'
import categoryRouter from './category'
import postRouter from './post'
import priceRouter from './price'
import acreageRouter from './acreage'
import provinceRouter from './province'
import mailerRouter from './mailer'
import userRouter from './user'
import adminRouter from './admin'
import blogRouter from './blog'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/insert', insertRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/post', postRouter)
    app.use('/api/v1/price', priceRouter)
    app.use('/api/v1/acreage', acreageRouter)
    app.use('/api/v1/province', provinceRouter)
    app.use('/api/v1/mailer', mailerRouter)
    app.use('/api/v1/admin', adminRouter)
    app.use('/api/v1/blog', blogRouter)

    return app.use('/', (req, res) => {
        res.send('server on ...')
    })
}

export default initRoutes