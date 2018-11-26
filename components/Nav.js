// Site Navigation menu
// https://www.sitepoint.com/responsive-fluid-width-variable-item-navigation-css/
// https://www.w3schools.com/Css/css_navbar.asp

import Link from 'next/link'

const Nav = () => (
   <div>
       <nav>
           <ul>
            <li><Link href="/index"><a>Home</a></Link></li>
           </ul>
       </nav>
       <style jsx>{`
        nav {
            max-width: 200px;
            border: 1px solid #ccc;
            border-right: none;
        }


        nav ul {
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            list-style: none;
            float: left;
            flex-grow: 1;
            text-align: center;
            border-left: 1px solid #fff;
            border-right: 1px solid #ccc;
            width: 16.6667%; /* fallback for non-calc() browsers */
            width: calc(100% / 6);
            box-sizing: border-box;
            padding: 5px;
        }

        nav ul li input {
            display : inline
        }

        nav ul li:first-child {
            border-left: none;
        }

        nav ul li a {
            font-size: 0.8em;
            text-decoration: none;
            color: rgb(239,239,239);
            margin: 50px 0;
        }

        nav ul li:hover {
            background: black;
        }
        nav ul li a:hover {
            color: white;
        }

        `}</style>
   </div> 
)

export default Nav;

