import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { faBed, faCalendarDays, faCar, faHandSparkles, faLocationDot, faMinus, faPerson, faPlane, faPlus, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleOption = (name, operation) => {
    setOptions(prev=>{return {
      ...prev, 
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }});
  }

  const { dispatch } = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate("/hotels", { state: {destination, dates, options} });
  };

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faHandSparkles} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        { type !== "list" &&
          <>
        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">Get a rewarded for your travels - unlock instant savings of 10% or more with a free Hospes account .</p>
        {!user && <button className="headerBtn">Register Now!</button>}
        <div className="headerSearch">
          <div className="headerSerchItem">
            <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />
            <input 
              type="text"
              placeholder="Where are you going?"
              className="headerSearchInput"
              onChange={e=>setDestination(e.target.value)}
            />
          </div>
          <div className="headerSerchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
              {`${format(dates[0].startDate, "dd/MM/yyyy")} to 
                ${format(dates[0].endDate, "dd/MM/yyyy")}`}
            </span>
            {openDate && <DateRange 
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="date"
              minDate={new Date()}
            />}
          </div>
          <div className="headerSerchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
              {`${options.adult} adult • ${options.children} children • ${options.room} room`}
            </span> 
            {openOptions && <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">  
                  <button
                    disabled={options.adult <= 1} 
                    className="optionCounterButton" 
                    onClick={() => handleOption("adult", "d")}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button
                    className="optionCounterButton" 
                    onClick={() => handleOption("adult", "i")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter"> 
                  <button
                      disabled={options.children <= 0} 
                      className="optionCounterButton" 
                      onClick={() => handleOption("children", "d")}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button 
                  className="optionCounterButton" 
                  onClick={() => handleOption("children", "i")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter"> 
                  <button
                    disabled={options.room <= 1} 
                    className="optionCounterButton" 
                    onClick={() => handleOption("room", "d")}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button 
                  className="optionCounterButton" 
                  onClick={() => handleOption("room", "i")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>}
          </div>
          <div className="headerSerchItem">
            <button className="headerBtn2" onClick={handleSearch}>Search</button>
          </div>
        </div></>}
      </div>
    </div>
  )
}

export default Header