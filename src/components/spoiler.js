import React, { useState } from "react"
import "../styles/spoiler.css"


export default function Spoiler({ children }) {
  const [shown, setShown] = useState(false)

  return (
    <div className="spoiler-container">
      <button
        onClick={() => setShown(!shown)}
        className="spoiler-toggle"
        aria-expanded={shown}
      >
        {shown ? "Unspoil" : "Spoil"}
      </button>
      <div className={`spoiler-content ${shown ? "show" : ""}`}>
        {children}
      </div>
    </div>
  )
}