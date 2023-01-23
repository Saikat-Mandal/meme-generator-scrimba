import { useEffect, useState } from "react";

export default function Meme() {
  //setting state for html
  const [meme, setMeme] = useState({
    toptext: "",
    bottomtext: "",
    randomImage: "",
  });

  //state for memeImages array
  const [allMemeImages, setMemeImages] = useState([]);
  // console.log(allMemeImages);
  // getting image urls
  function getMemeImage() {
    let memesArray = allMemeImages;
    let item = memesArray[Math.floor(Math.random() * memesArray.length)];
    const url = item.url;
    setMeme((prev) => {
      return {
        ...prev,
        randomImage: url,
      };
    });
  }

  //useEffect
  useEffect(() => {
    //fetching meme images from api
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemeImages(data.data.memes));
  }, []);

  // onChange function
  function handleChange(event) {
    const { name } = event.target;
    setMeme((prevObj) => {
      return {
        ...prevObj,
        [name]: event.target.value,
      };
    });
  }

  return (
    <div>
      <form className="form">
        <input
          className="form-input"
          type="text"
          placeholder="top text"
          onChange={handleChange}
          value={meme.toptext}
          name="toptext"
        ></input>
        <input
          className="form-input"
          type="text"
          placeholder="bottom text"
          onChange={handleChange}
          value={meme.bottomtext}
          name="bottomtext"
        ></input>
      </form>
      <div className="btn-item">
        <button onClick={getMemeImage} className="form-btn">
          Get a new meme image 🖼
        </button>
      </div>
      <div className="img-container">
        <img className="img" src={meme.randomImage} alt="" />
        <h2 className="top-txt">{meme.toptext}</h2>
        <h2 className="bottom-txt">{meme.bottomtext}</h2>
      </div>
    </div>
  );
}
