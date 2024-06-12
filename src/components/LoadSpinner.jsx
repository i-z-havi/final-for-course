import React from 'react'
import { MoonLoader } from 'react-spinners'

export default function LoadSpinner() {
  return (
    <MoonLoader size={30}
                    cssOverride={{
                        display: "block",
                        margin: "0 auto",
                        position: "absolute",
                        top: "50%",
                        left:"50%"
                    }}
                />
  )
}
