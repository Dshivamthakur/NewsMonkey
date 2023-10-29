import React from 'react'

const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;

        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{ position: 'absolute', right: '0', display:'flex' }}>
                        <span className="badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..." style={{ height: 300 + 'px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
