import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'

function Dashboard() {
    const getRandomColors = () => {
        let colorValues = ["#e4717a", "#ff0800", "#ff0038", "#d0f0c0", "#b0e0e6", "#8ab9f1", "#a2a2d0", "#f0e68c", "#fffacd", "#e8f48c", "#addfad", "#3cd070"];
        return colorValues[Math.floor(Math.random() * colorValues.length)];
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

    useEffect(() => {
        if(isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getGoals())

        return () => {
            dispatch(reset())
        }
    },[user, navigate, isError, message, dispatch])

    if(isLoading) {
        return <Spinner/>
    }
  return (
    <>
    <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>  
    </section>

    <GoalForm/>

    <section className="content">
    {goals.length > 0 ? (<div className="goals">
        {goals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} color={getRandomColors()} />
        ))}
    </div>
    ) : (<h3>You have not set any goals</h3>)}
    </section>
    </>
  )
}

export default Dashboard