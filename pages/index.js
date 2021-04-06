import Head from "next/head";
import Page from "components/Page.jsx";
import GameList from "Data/GameList.js";
import Link from "next/link"

export default function Home() {
  const title = {
    fontSize: "2rem",
    fontWeight:'600'
  };
  const buildGameList = () => {
    return GameList.map((row, i) => {
      const cardStyle = {
        width: "auto",
        // paddingTop:'56.25%',
        height:'100vh',
        maxHeight:'300px',
        position: "relative",
        backgroundImage: `url('${row.img}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      };

      return (
        <div key={i}>
          <Link href={row.href}>
            <div style={cardStyle}>
              <div className="center" style={title}>
                {row.game}
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };
  return (
    <div>
      <Page title="Game List">
        <div className="flexRow topMargin">{buildGameList()}</div>
      </Page>
    </div>
  );
}
