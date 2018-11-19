// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';


export default class News extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newsSource: "the-irish-times",
      newsSourceName: "The Irish Times",
      articles: []
    }
  }

  setNewsSource = input => {
    this.setState({
      newsSource: input.value,
      newsSourceName : input.label
    })
  }

  // Method to render the page
  render() {
    // If state.articles is empty then copy value from props
    if (this.state.articles.length == 0) {
      this.state.articles = this.props.articles;
    }

    // Return the page content
    return (
      <div>
        <div style={{"max-width" : "60%"}}>
          <SearchForm setNewsSource={this.setNewsSource} sources={this.props.sources} />
        </div>
        <div>
          <h3>News from {this.state.newsSourceName}</h3>
          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author}&nbsp;&nbsp;-&nbsp;&nbsp;{new Date(article.publishedAt).toLocaleString()}</p>
              <img src={article.urlToImage} alt="article image" className="article-img"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link href={article.url}><a>Read More</a></Link></p>
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
  static async getInitialProps() {
    const newsSource = "the-irish-times";
    const apiKey = "751db7e54ff74e09a364481e79fb466d";
    const url = `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    const sourceUrl = `https://newsapi.org/v2/sources?&apiKey=${apiKey}`;
    const sourceRes = await fetch(sourceUrl);
    const sourceData = await sourceRes.json();

    return {
      articles: data.articles,
      sources : sourceData.sources
    }
  }


  async componentDidUpdate(prevProps, prevState) {
    console.log(`update news: ${this.state.newsSource}`);

    if (this.state.newsSource !== prevState.newsSource) {
      const apiKey = '751db7e54ff74e09a364481e79fb466d';
      const url = `https://newsapi.org/v2/top-headlines?sources=${this.state.newsSource}&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      this.state.articles = data.articles;
      this.setState(this.state);
    }

  }
}