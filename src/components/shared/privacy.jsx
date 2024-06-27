import React from 'react'
import { Link } from 'react-router-dom'

const Privacy = () => {
  return (
    <div className="text-sm pb-4 mt-16 md:pb-0 md:mt-2 font-copy">
      &copy;Copyright {new Date().getFullYear()} All rights reserved,
      <Link to="#" className="text-orange-500 text-sm font-semibold">
        Terms and Conditions
      </Link> |
      
      <Link to="#" className="text-orange-500 text-sm font-semibold">
        Privacy & Policy
      </Link>
    </div>
  )
}

export default Privacy
 