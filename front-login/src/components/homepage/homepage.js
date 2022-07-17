import React, { useState, useEffect } from 'react';
import "./homepage.css"
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Homepage = ({setLoginUser, user}) => {
    const navigate = useNavigate()
    const [repos, setRepos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [img, setImg] = useState([]);
    const { username } = useParams();
    let userGit = user?user.gituser:username;
    let nameGit = user?user.name:username;

    useEffect(() => {
        async function gitrepo() {
            const  result  = await axios(`https://api.github.com/users/${userGit}/repos`);
            setImg(result.data[0].owner.avatar_url);
            setRepos(result.data);
        }
        gitrepo();
      }, []);

      const listRepos = 
        repos.length>0?(
            repos.map((item) => <tr key={item.id}><td>{item.name}</td><td><i title='Add to Favorites' className="fa-solid fa-star" onClick={() => {
                setFavorites([
                  ...favorites,
                  { name: item.name, id: item.id },
                ]);
              }}></i></td></tr>)
        ) : (
            <tr><td>No repos found with the username {userGit}</td></tr>
        )


        const listFav = 
        favorites.length>0?(
            favorites.map((item) => <tr key={item.id}><td>{item.name}</td><td><i title='Remove from Favorites' className="fa-solid fa-circle-minus" onClick={() => {
                setFavorites([
                  ...favorites.filter(
                    (rep) => rep.name !== item.name
                  ),
                ]);
              }}></i></td></tr>)
        ) : (
            <tr><td>No favorite repos</td></tr>
        )
        
      
    return(
        <div className='homepage'>
            <nav className="navbar sticky-top navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        {/* {console.log(repos[0])} */}
                    <img src={img} alt="" width="30" height="24" className="d-inline-block align-text-top"></img>
                    {nameGit}
                    </a>
                    <div className="d-flex">
                        <button className="btn btn-outline-primary" type="button" onClick={() => navigate("/")}>Logout</button>
                    </div>
                </div>
            </nav>
        <div className='body_home'>
            <div className='repos'>
                <div style={{display: "table-cell"}}>
                    <h3>All your repos ({userGit})</h3>
                    <table className="table table-striped rounded">
                        <thead className="table-primary">
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listRepos}
                        </tbody>
                        </table>
                </div>
                
                <ul style={{display: "table-cell"}}>
                    <h3>Favorite Repos</h3>
                    <table className="table table-striped">
                        <thead className="table-primary">
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listFav}
                        </tbody>
                        </table>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Homepage