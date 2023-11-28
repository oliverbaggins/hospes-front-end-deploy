import "./propertyList.css"
import Image4 from "../../assets/4.jpg"
import Image5 from "../../assets/5.jpg"
import Image6 from "../../assets/6.jpg"
import Image7 from "../../assets/7.jpg"
import Image8 from "../../assets/8.jpg"
import useFetch from "../../hooks/useFetch"

const PropertyList = () => {

  const { data, loading, error } = useFetch(
    "https://hospes-api.onrender.com/api/hotels/countByType"
  )

  const images = [
    Image4,
    Image5,
    Image6,
    Image7,
    Image8
  ]

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data && 
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img 
                  src={img} 
                  alt="" 
                  className="pListImg" 
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
          ))}
        </>
      )}
    </div>
  )
}

export default PropertyList