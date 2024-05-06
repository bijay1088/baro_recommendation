import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <div className='footer'>
      <p>© 2024 Bijay1088.</p>
      {/* <ul>
            <li>
                <a href="https://github.com/bijay1088" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faReact} />
              </a>
            </li>

        </ul> */}
    </div>
  )
}

export default Footer
