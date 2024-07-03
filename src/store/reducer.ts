import { createSlice } from '@reduxjs/toolkit'

interface IArea {
text: string,
bold: boolean;
italic: boolean
}

interface IState {
  past: Array<IArea>,
  present: IArea,
  future: Array<IArea>
}

const initialState: IState = {
  past: [],
  present: {
    text: "",
    bold: false,
    italic: false
  }, 
  future: []
}

export const textSlice = createSlice({
  name: 'text',
  initialState: initialState,
  reducers: {
    bold: (state) => {
     return {
      past: [...state.past, state.present],
      present: {...state.present, bold: !state.present.bold},
      future: state.future
     }
    },
    italic: (state) => {
      return {
      past: [...state.past, state.present],
      present: {...state.present, italic: !state.present.italic},
      future: state.future
     }
    },
    undo: (state) => {
      const previous = state.past[state.past.length - 1]
      const newPast = state.past.slice(0, state.past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future]
      }
    },
    redo: (state) => {
      const next = state.future[0]
      const newFuture = state.future.slice(1)
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture
      }
    },
    change: (state, action) => {
      console.log(state.present.text)
      console.log(state.past[state.past.length-1]?.text)
      console.log(action.payload)
      return {
        past: [...state.past, state.present],
        present: {...state.present, text: action.payload},
        future: state.future
      }
    }
  },
})

export const { bold, italic, undo, redo, change} = textSlice.actions

export default textSlice.reducer
