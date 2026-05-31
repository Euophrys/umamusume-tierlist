import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./Main.jsx"

try {
  // try to detect if we're in a cross-domain iframe by deliberately triggering a CORS violation (we can't inspect any
  // properties of the parent page directly, but we can exploit that to determine if we're being embedded)
  window.parent && window.parent.location.hostname
  const container = document.getElementById("root")
  const root = ReactDOM.createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (e) {
  if (e instanceof DOMException) {
    document.getElementById("root").innerHTML =
      '<p style="font-size:22px"><span style="border:3px solid orange;border-radius:3em;color:orange;display:inline-block;font-weight:bold;height:1.8em;line-height:1.8em;text-align:center;width:1.8em">!</span> You are probably on some kind of scummy ad-infested rehosting site. Pecan\'s words, not mine. The official URL for the Uma Support Card Tier List is <a href="https://euophrys.github.io/uma-tiers/#/global" target="_blank">https://euophrys.github.io/uma-tiers/#/global</a>.</p>'
  } else {
    throw e
  }
}
