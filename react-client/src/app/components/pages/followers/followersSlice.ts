import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFollowersReportService } from "./api/followers"


export interface IFollowers {
    followers: Array<any>
}


const initialState: IFollowers = {
    followers: []
}


// export const fetchFollowersAsync = createAsyncThunk(
//     "followers/getFollowersService",
//     async () => {
//         // const response = await getFollowersService()
//         console.log(response);
//         return response
//     }
// )

export const fetchFollowersReportsAsync = createAsyncThunk(
    "followers/getFollowersService",
    async () => {
        const response = await getFollowersReportService()
        console.log(response);
        return response
    }
)

export const followersSlice = createSlice({
    name: "followers",
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
        builder.addCase(fetchFollowersReportsAsync.pending, (state) => {
            state.followers = []
        })
            .addCase(fetchFollowersReportsAsync.fulfilled, (state, action) => {

                // state.value += action.payload
                state.followers = action.payload

            })
            .addCase(fetchFollowersReportsAsync.rejected, (state) => {

                state.followers = []

            })
    },

})

// export const { addLike } = followersSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default followersSlice.reducer
