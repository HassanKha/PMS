
import "./../../styles/LogoLoader.css"
import logo from "../../assets/loading.png";
export default function LoadingPage() {
  return (
    <div className="loading-container">
      <div className="glow-ring"></div>
      <img src={logo} alt="PMS Logo" className="loading-logo" />
    </div>
  )
}
