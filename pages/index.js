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
        width: "100%",
        //paddingTop:'56.25%',
        height:'100vh',
        maxHeight:'300px',
        position: "relative",
        backgroundImage: `url('${row.img}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      };

      return (
        <div key={i}>
          <a>
            <Link href={row.href}>
              <div style={cardStyle}>
                <div className="center" style={title}>
                  {row.game}
                </div>
              </div>
            </Link>
          </a>
        </div>
      );
    });
  };
  return (
    <div>
      <Page
        headTitle="Sweaty Guides | Home"
        title="Game List"
        background="https://wallpapercave.com/wp/wp4354331.jpg">
        <div className="grid2 topMargin">{buildGameList()}</div>
      </Page>
    </div>
  );
}
