import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal, color }) {
    const dispatch = useDispatch()

  return (
    <div className="goal" style={{backgroundColor: color}}>
        <div>
            { new Date(goal.createdAt).toLocaleDateString('en-IN') }
        </div>
        <h3>{goal.text}</h3>
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">X</button>
    </div>
  )
}

export default GoalItem