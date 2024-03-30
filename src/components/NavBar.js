import React, { useEffect, useState, useRef} from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {
    const [searchValue, setsearchValue] = useState('')
    const navigate = useNavigate();
    const isFirstRender = useRef(0);

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (searchValue !== '') {
                props.setQuery(searchValue);
                props.setForceUpdateKey((prevKey) => prevKey + 1);
                navigate('/searchPage');
                console.log('Debounce', searchValue);
            }
        }, 1000);

        if (isFirstRender.current >= 2 && searchValue === ''){
            console.log('navigate hhhhhhhhhh');
            navigate('/');
        }
        isFirstRender.current += 1;
        console.log(isFirstRender , isFirstRender.current > 1 , searchValue, searchValue === '');

        return () => {
            clearTimeout(timeout);
        }
    }, [searchValue])


    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewsMonkey</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/general">General</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology">Technology</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchValue} onChange={(e) => setsearchValue(e.target.value)} />
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default NavBar
