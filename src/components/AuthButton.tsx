import { Link } from "react-router-dom"

const AuthButton = () => {
  return (
    <div className="flex items-center gap-6">
      <Link to="#" className="border border-primary px-6 py-3 text-[14px] font-medium rounded hover:bg-gray-100">
        Connexion
      </Link>
      <Link to="#" className="bg-primary px-6 py-3 text-white text-[14px] font-medium rounded hover:opacity-85">
        Inscription
      </Link>
    </div>
  )
}

export default AuthButton