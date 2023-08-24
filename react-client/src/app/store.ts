import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import vacationSlice from "./components/pages/adminVacations/vacationSlice"
import followersSlice from "./components/pages/reports/followersSlice"


export const store = configureStore({
  reducer: {
    vacations: vacationSlice,
    followers: followersSlice
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
