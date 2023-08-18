import { useSelector, useDispatch } from 'react-redux'
import { Error, Success } from '../store/model'
import Notification from './notification'

const Notify = () => {

   const state = useSelector(state => state);
   const dispatch = useDispatch();
   const { model } = state

   return (
    <div>
       {model.error && <Notification msg={{msg: model.error, title: "Error"}} handleShadow={() => dispatch(Error(''))} bgColor="bg-danger"/>}
       {model.success && <Notification msg={{msg: model.success, title: "Success"}} handleShadow={() => dispatch(Success(''))} bgColor="bg-success"/>}
    </div>
   )
}

export default Notify