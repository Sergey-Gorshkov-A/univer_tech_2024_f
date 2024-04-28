import { userService } from './../../services/userService/userService.js'
import counterSlice from './CounterSlice/CounterSlice.js'
import userSlice from './userSlice/userSlice.js'

const reducers = {
    counterReducer: counterSlice,
    userReducer: userSlice,

    [userService.reducerPath]: userService.reducer
}

export default reducers