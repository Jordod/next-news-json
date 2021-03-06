// This is the Link API
import Link from 'next/link';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';

export default class News extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newsSource: "the-irish-times",
      newsSourceName: "The Irish Times",
      articles: [],
      category : null,
      searchTerm : null
    }
  }

  setNewsSource = input => {
    this.setState({
      newsSource: input.value,
      newsSourceName : input.label,
    })
  }

  handleSearchTermSubmit = event => {
    event.preventDefault();
    Router.push(`/search?q=${this.state.searchTerm}`);
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm : event.target.value
    })
  }

  setNewsCategory = input => {
    this.setState({
      category : input.value
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
        <div style={{maxWidth : "60%"}}>
          <SearchForm setNewsSource={this.setNewsSource} setNewsCategory={this.setNewsCategory} sources={this.props.sources} categories={this.props.categories}/>
          <div className="SearchBar">
          <form>
            <input 
              placeholder = "Search for a story"
              name='search'
              value={this.state.searchTerm} 
              onChange={e => this.handleSearchChange(e)}/>
            <button onClick={(e) => this.handleSearchTermSubmit(e)}>Search</button> 
          </form>
          </div>
        </div>
        <div>
          <h3>News from {!(this.state.newsSourceName == null) ? <span>{this.state.newsSourceName}</span> : <span>{this.state.category}</span>}</h3>
          {this.state.articles.map((article, index) => (
            <section key={index}>
              <h3>{article.title}</h3>
              <p className="author">{article.author}&nbsp;&nbsp;-&nbsp;&nbsp;{new Date(article.publishedAt).toLocaleString()}</p>
              {!article.urlToImage ? <p></p> : <img src={article.urlToImage} alt="article image" className="article-img"></img>}
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link href={article.url}><a>Read More</a></Link></p>
              <p><Link href={{pathname : "/search", query : { q : article.title}}}><a>Find More Like This</a></Link></p>
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

            .SearchBar form input {
              min-width : 85%;
              padding: 0.8em;
            }

            .SearchBar form {
              min-width : 100%;
            }

            .SearchBar {
              min-width : 100%;
            }

            .SearchBar form button {
              max-width : 20%;
              min-height: 100%;
              display :inline;
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
      sources : sourceData.sources,
      categories : ["business", "entertainment", "general", "health", "science", "sports", "technology"]
    }
  }


  async componentDidUpdate(prevProps, prevState) {

    if (this.state.newsSource !== prevState.newsSource) {
      const apiKey = '751db7e54ff74e09a364481e79fb466d';
      const url = `https://newsapi.org/v2/top-headlines?sources=${this.state.newsSource}&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      this.state.articles = data.articles;
      this.setState(this.state);
    }

    if (this.state.category !== prevState.category) {
      const apiKey = '751db7e54ff74e09a364481e79fb466d';
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.state.category}&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      this.state.articles = data.articles;
      this.state.newsSourceName = null;
      this.setState(this.state);
    }

  }
}