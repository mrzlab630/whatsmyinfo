/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-02
 * Time: 18:31
 * About:
 *
 */
import { createSlice } from '@reduxjs/toolkit'
import {initialStateRoot} from '../initialState'
import {IinitialStateRoot} from '../initialState/root'



export const rootSlice = createSlice({
    name: 'root',
    initialState:initialStateRoot,
    reducers: {
        getIntro:(state:IinitialStateRoot) =>
        {
            state.intro
        }
    }
})




export const { getIntro } = rootSlice.actions
export default rootSlice.reducer