import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchHabits } from '../store/habit-slice';
import { LinearProgress, Paper, Typography } from '@mui/material';

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector((state: RootState) => state.habits)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits())
  },[]);

  if(isLoading){
    return <LinearProgress />
  }

  if(error){
    return <Typography variant="h6" color="error">{error}</Typography>
  }
  
  return (
    <Paper elevation={2} sx={{ p: 2 , mt: 4}}>
      <Typography variant="h5">Habit Stats</Typography>
      <Typography variant="subtitle1">Total Habits: {habits.length}</Typography>
      <Typography variant="subtitle1">Total Completed Habits: {habits.filter((habit) => habit.completedDates.length > 0).length}</Typography>

    </Paper>
  )
}

export default HabitStats