import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../../store"
import { getVacationsService } from "./api"

// import { fetchCount } from "./counterAPI"

export interface IVacationsAdmin {
  vacationsData: Array<any>
  // followers: Array<any>
}



const initialState: IVacationsAdmin = {
  vacationsData: [],
  // followers: []
}

export const fetchVacationsAsync = createAsyncThunk(
  "adminVacations/getVacationsService",
  async () => {
    const response = await getVacationsService()
    // console.log(response);
    return response
  }
)
// export const fetchFollowersAsync = createAsyncThunk(
//   "adminVacations/getFollowersService",
//   async () => {
//     const response = await getFollowersService()
//     console.log(response);
//     return response
//   }
// )

export const vacationSlice = createSlice({
  name: "vacations",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // addLike: (state, action: PayloadAction<string>) => {
    //   const index = state.vacationsData.findIndex(v => v.destination.toLowerCase() === action.payload)
    //   if (index !== -1) {
    //     state.vacationsData[index].likes++
    //     state.totalFollowers = state.vacationsData.reduce(
    //       (sum, current) => sum + current.likes,
    //       0
    //     );
    //   }
    // },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacationsAsync.pending, (state) => {

        state.vacationsData = []
      })
      .addCase(fetchVacationsAsync.fulfilled, (state, action) => {

        // state.value += action.payload
        state.vacationsData = action.payload

      })
      .addCase(fetchVacationsAsync.rejected, (state) => {

        state.vacationsData = []

      })

    // builder.addCase(fetchFollowersAsync.pending, (state) => {
    //   state.followers = []
    // })
    //   .addCase(fetchFollowersAsync.fulfilled, (state, action) => {

    //     // state.value += action.payload
    //     state.followers = action.payload

    //   })
    //   .addCase(fetchFollowersAsync.rejected, (state) => {

    //     state.followers = []

    //   })
  },

})

// export const { addLike } = vacationSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default vacationSlice.reducer
