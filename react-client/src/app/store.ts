import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import vacationSlice from "./components/pages/adminVacations/vacationSlice"


export const store = configureStore({
  reducer: {
    vacations: vacationSlice
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
