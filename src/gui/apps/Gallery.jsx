import "./Gallery.css";

const galleryImages = import.meta.glob(
  "../../assets/profile/gallery/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
);

const images = Object.entries(galleryImages)
  .filter(([path]) => !path.includes("wallpaperGUI"))
  .map(([path, src]) => ({
    src,
    name: path
      .split("/")
      .pop()
      .replace(/\.(png|jpg|jpeg|webp)$/i, ""),
  }));

export default function Gallery() {
  return (
    <div className="app-content">
      <h2>Gallery</h2>

      <div className="galleryGrid">
        {images.map((image) => (
          <div className="galleryItem" key={image.name}>
            <img src={image.src} alt={image.name} />
            <span>{image.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
