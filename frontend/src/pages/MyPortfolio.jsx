import Artworks from '../components/Artworks';

function MyPortfolio() {
  return (
    <>
      <div className="portfolio">
        <h1>Portfolio Page</h1>
        {/* Display artworks of the current user only, i.e. their personal portfolio */}
        <Artworks showOnlyMyArtworks={true} />
      </div>
    </>
  );
}

export default MyPortfolio;
