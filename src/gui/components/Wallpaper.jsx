import wallpaperGUI from "../../assets/profile/gallery/wallpaperGUI.png";

export default function Wallpaper() {
  return (
    <>
      <div
        className="desktop-wallpaper"
        style={{
          backgroundImage: `url(${wallpaperGUI})`,
        }}
      >
        {/* <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="aurora aurora-three" /> */}
      </div>

      <div className="desktop-stars" />
      <div className="desktop-noise" />
      <div className="desktop-vignette" />
    </>
  );
}
