import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

 const DefaultImageURL = 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png';

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, []);

  

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

    return (
      <>
        <h1 className='text-center' style={{marginTop: '60px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          style={{overflow:'hidden'}}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
            <div className="container">
              <div className="row">
                {articles.map((element, index) => {
                  return <div className="col-md-4" key={index}>

                    <NewsItem title={element.title !== null ?  element.title : ''}

                      description={element.description !== null ?  element.title : ''}

                      imageUrl={element.urlToImage === null ? DefaultImageURL : element.urlToImage} newsUrl={element.url}

                      author={element.author === null ? 'Unknown' : element.author}

                      date={element.publishedAt}
                      
                      source = {element.source.name}/>

                  </div>
                })}
              </div>
            </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
