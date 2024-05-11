import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useCallback, useContext, useState } from 'react'


const snackContext = createContext()

export default function SnackBarProvider({ children }) {

  const [isSnackOpen, setSnackOpen] = useState(false);
  const [snackColor, setSnackColor] = useState();
  const [snackMessage, setSnackMessage] = useState();

  const setSnack = useCallback((color, message) => {
    setSnackOpen(true);
    setSnackColor(color);
    setSnackMessage(message);
  }, [])

  return (
    <>
      <Snackbar open={isSnackOpen} autoHideDuration={4000} 
      onClose={() => setSnackOpen((prev) => !prev)}
      anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
        <Alert variant='filled' severity={snackColor}>
          {snackMessage}
        </Alert>
      </Snackbar>
      <snackContext.Provider value={setSnack}>
        {children}
      </snackContext.Provider>
    </>
  )
}
  export const useSnack=()=>{
    const context = useContext(snackContext)
    return context
  }
