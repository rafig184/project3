import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFollowersCountByVacationIdService, getFollowersReportService } from "./api/followers"


export interface IFollowers {
    followers: Array<any>
    followerCount: Array<any>
    // followersCheck: Array<any>
}


const initialState: IFollowers = {
    followers: [],
    followerCount: [],
    // followersCheck: []
}



export const fetchFollowersReportsAsync = createAsyncThunk(
    "followers/getFollowersReportService",
    async () => {
        const response = await getFollowersReportService()
        // console.log(response);
        return response
    }
)


export const fetchFollowersAmountAsync = createAsyncThunk(
    "followers/getFollowersCountByVacationIdService",
    async () => {
        const response = await getFollowersCountByVacationIdService()
        // console.log(response);
        return response
    }
)
// export const fetchFollowersByUserIdAsync = createAsyncThunk(
//     "followers/getFollowersByUserIdService",
//     async () => {
//         const response = await getFollowersByUserIdService()
//         // console.log(response);
//         return response
//     }
// )



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

        builder.addCase(fetchFollowersAmountAsync.pending, (state) => {
            state.followerCount = []
        })
            .addCase(fetchFollowersAmountAsync.fulfilled, (state, action) => {

                // state.value += action.payload
                state.followerCount = action.payload

            })
            .addCase(fetchFollowersAmountAsync.rejected, (state) => {

                state.followerCount = []

            })

        // builder.addCase(fetchFollowersByUserIdAsync.pending, (state) => {
        //     state.followersCheck = []
        // })
        //     .addCase(fetchFollowersByUserIdAsync.fulfilled, (state, action) => {

        //         // state.value += action.payload
        //         state.followersCheck = action.payload

        //     })
        //     .addCase(fetchFollowersByUserIdAsync.rejected, (state) => {

        //         state.followersCheck = []

        //     })
    },

})



// export const { addLike } = followersSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default followersSlice.reducer
