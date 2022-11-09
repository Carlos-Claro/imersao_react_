import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";


function HomePage() {
  const mensagem = "Bem vindo";
  const estilosDaHomePage = {
    
  };
  return (
    <>
    <CSSReset />
        <div style={estilosDaHomePage}>
        <Menu />
        <Header />
        <Timeline playlists={config.playlists} />
        </div>
    </>

    
  );
}

export default HomePage;



const StyledHeader = styled.div`
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

function Timeline(props) {
  const playlistsNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistsNames.map(function (playlistName) {
        const videos = props.playlists[playlistName];
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
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
