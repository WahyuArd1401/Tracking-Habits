import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { AppDispatch, RootState } from '../store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircle } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Habit, removeHabit, toggleHabit } from '../store/habit-slice'

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits)
  const dispatch = useDispatch<AppDispatch>();

  const today = new Date().toISOString().split('T')[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if(habit.completedDates.includes(dateString)){
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4}}>
    {habits.map((habit) => {
      return <Paper key={habit.id} elevation={2} sx={{ p: 2}}>
        <Grid container alignItems={'center'}>
          <Grid xs={12} sm={6}>
            <Typography variant={'h6'}>{habit.name}</Typography>
            <Typography variant={'subtitle1'}>Frequency: {habit.frequency}</Typography>
          </Grid>
          <Grid xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1}}>
              <Button 
              variant='outlined' 
              color= {habit.completedDates.includes(today)? "success" : "primary"}
              startIcon={<CheckCircle />}
              onClick={() => {
                dispatch(toggleHabit({id: habit.id, date: today}))
              }}
              > {habit.completedDates.includes(today)? "Completed" : "Mark Completed"}</Button>
              <Button 
              variant='outlined' 
              color='error'
              startIcon={<DeleteIcon />}
              onClick={() => {
                dispatch(removeHabit({id: habit.id}))
              }}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2}}>
          <Typography variant='body2'>
              current streak : {getStreak(habit)} days
          </Typography>
        </Box>
      </Paper>
    })}
  </Box>
}

export default HabitList