import mainReducer from '@/store/reducers/main'
import userReducer from '@/store/reducers/user'
import addressReducer from '@/store/reducers/address'
import indonesiAreaReducer from '@/store/reducers/indonesia-area'

export default {
  main: mainReducer,
  user: userReducer,
  address: addressReducer,
  indonesiaArea: indonesiAreaReducer
}