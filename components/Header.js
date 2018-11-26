import Link from 'next/link'
const Header = () => (
    <div>
        <Link href="/"><h2 className="title">My News</h2></Link>
        <style jsx>{`
            .title {
                font-family: "Arial";
                padding: 5px;
            }
        `}</style>
    </div> 
 )
 
 export default Header;