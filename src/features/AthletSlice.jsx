import { createSlice } from '@reduxjs/toolkit'

export const athletSlice = createSlice({
  name: 'athletes',
  initialState: {
    chosenAthlete: null 
  },
  reducers: {
    choose: (state, action) => {
        state.chosenAthlete = action.payload
         
    },
   
  }
})

// Action creators are generated for each case reducer function
export const { choose } = athletSlice.actions

export default athletSlice.reducer