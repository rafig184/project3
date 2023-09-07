import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFollowersCountByVacationIdService, getFollowersReportService } from "./api/followers"


export interface IFollowers {
    followers: Array<any>
    followerCount: Array<any>
}


const initialState: IFollowers = {
    followers: [],
    followerCount: [],
}



export const fetchFollowersReportsAsync = createAsyncThunk(
    "followers/getFollowersReportService",
    async () => {
        const response = await getFollowersReportService()
        return response
    }
)


export const fetchFollowersAmountAsync = createAsyncThunk(
    "followers/getFollowersCountByVacationIdService",
    async () => {
        const response = await getFollowersCountByVacationIdService()
        return response
    }
)




export const followersSlice = createSlice({
    name: "followers",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {


    },
    extraReducers: (builder) => {
        builder.addCase(fetchFollowersReportsAsync.pending, (state) => {
            state.followers = []
        })
            .addCase(fetchFollowersReportsAsync.fulfilled, (state, action) => {

                state.followers = action.payload

            })
            .addCase(fetchFollowersReportsAsync.rejected, (state) => {

                state.followers = []

            })

        builder.addCase(fetchFollowersAmountAsync.pending, (state) => {
            state.followerCount = []
        })
            .addCase(fetchFollowersAmountAsync.fulfilled, (state, action) => {

                state.followerCount = action.payload

            })
            .addCase(fetchFollowersAmountAsync.rejected, (state) => {

                state.followerCount = []

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
