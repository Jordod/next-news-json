// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default class Search extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.articles.length == 0 ? <h3>No similar Articles found</h3> : <p></p>}
        <div>
          {this.props.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author}&nbsp;&nbsp;-&nbsp;&nbsp;{new Date(article.publishedAt).toLocaleString()}</p>
              {!article.urlToImage ? <p></p> : <img src={article.urlToImage} alt="article image" className="article-img"></img>}
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link href={article.url}><a>Read More</a></Link></p>
              <Link href="/"><a>Back to Homepage</a></Link>
            </section>
          ))}
        </div>

        <style jsx>{`
            section {
                width: 60%;
                min-width: 540px;
                border: 1px solid gray;
                background-color: rgb(32,32,32);
                padding: 1em;
                margin: 1em;
                box-shadow: 5px 5px 5px #333333;
                color: rgb(239,239,239);
            }

            h2, h3 {
                font-family: "Arial";
                color: rgb(239,239,239);
                padding: 5px;
            }

            a {
                text-decoration: none;
            }

            a:hover {
                font-weight: bold;
            }

            a:link {
                color: #fcce5a;
            }

            a:visited {
                color: white;
            }

            .date {
                font-style: italic;
                font-size: 0.8em;
            }

            .article-img {
                max-width: 50%;
            }
        `}</style>

      </div>

    );

  }
  static async getInitialProps(req) {
    const query = req.query.q;
    const apiKey = "751db7e54ff74e09a364481e79fb466d";
    var url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const uri = encodeURI(url)

    const res = await fetch(uri);
    const data = await res.json();

    return {
      articles: data.articles,
    }
  }
}