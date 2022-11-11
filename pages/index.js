import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";
import { videoService } from "../src/services/videoService";


function HomePage() {
  const mensagem = "Bem vindo";
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});
  const service = videoService();
  React.useEffect(() => {
    service
      .getAllVideos()
      .then((dados) => {
        const novasPlaylists = {...playlists};
        dados.data.forEach((video) => {
          if ( !novasPlaylists[video.playlist] ) novasPlaylists[video.playlist] = []
        novasPlaylists[video.playlist].push(video)
      })
      setPlaylists(novasPlaylists);
  });

  }, []);
  return (
    <>
    <div>

      <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
      <Header />
      <Timeline playlists={playlists} searchValue={valorDoFiltro} />
      <Favorites />
    </div>
    </>

    
  );
}

export default HomePage;



const StyledHeader = styled.div`
  background-color: ${({theme}) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
    margin-top: 50px;
  }
  .banner-topo{
    width: 100%;
    height: 300px;
    display: block;
    object-fit: cover;
    border-radius: unset;
  }
`;
const StyledFavorite = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    display: block;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .favorite-info {
    
    display: inline-block;
    align-items: center;
    
    padding: 0px 32px;
    gap: 16px;
    }
  
`
function Header() {
  const bannerNumber = Math.floor(Math.random() * (config.banners.length - 0));
  const position = (valor) => {
    return {objectPosition:valor};
  }
  return (
    <StyledHeader>
      <img src={`${config.banners[bannerNumber].src}`} className="banner-topo" style={position(config.banners[bannerNumber].position)} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Favorites(){
  const favorites = config.favorites;
  
  return (
    <StyledFavorite>
      <section>

        <h2>Perfis Favoritos</h2>
        {favorites.map((data) => 
        <div className="favorite-info" key={data.github}>
            
              <img src={`https://github.com/${data.github}.png`} />
              <h2>{data.name}</h2>
            
        </div>)}
      </section>
    </StyledFavorite>
  );
}

function Timeline(props) {
  const playlistsNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistsNames.map(function (playlistName) {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalize = video.title.toLowerCase();
                  const searchNormalize = props.searchValue.toLowerCase();
                  return titleNormalize.includes(searchNormalize);
              }) 
                .map((video) => {
                  return (
                    <a href={video.url} key={video.url}>
                      <img src={`${video.thumb}`} />
                      <span>{video.title}</span>
                    </a>
                  );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>

    
  );
}
