import Artworks from '../components/Artworks';

function ArtGallery() {
  return (
    <>
      <div className="gallery">
        <h1>Art Gallery Page</h1>
        {/* Shows all existing artworks in the gallery */}
        <Artworks showOnlyMyArtworks={false} />
      </div>
    </>
  );
}

export default ArtGallery;
