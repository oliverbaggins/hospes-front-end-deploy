import "./featured.css"
import Image1 from "../../assets/1.jpg"
import Image2 from "../../assets/2.jpg"
import Image3 from "../../assets/3.jpg"
import useFetch from "../../hooks/useFetch"

const Featured = () => {

  const { data, loading, error } = useFetch(
    "https://hospes-api.onrender.com/api/hotels/countByCity?cities=berlin,london,austin"
  )

  console.log(data)

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img 
              src={Image1} alt="" 
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img 
              src={Image2} alt="" 
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img 
              src={Image3} alt=""
              className="featuredImg" 
            />
            <div className="featuredTitles">
              <h1>Austin</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Featured