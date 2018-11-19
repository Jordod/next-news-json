// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const source = 'the-irish-times';


// Pass this content as 'props' to child components
const News = props => (
    <div>
        <h2>News from {source.split("-").join(" ")}</h2>


        <style jsx>{`
          /* css for this page */
          
        `}</style>
    </div>
  );
  
export default News;
