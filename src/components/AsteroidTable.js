import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "../axios";
import ReactPaginate from "react-paginate";
import Spinner from "react-spinkit";
import { useDispatch } from "react-redux";
import { addCurrentAsteroid } from "../features/asteroidSlice";
import { openModal } from "../features/modalSlice";
import { jsPDF } from "jspdf";
import ReactTooltip from "react-tooltip";

const AsteroidTable = () => {
  const [totalAsteroidsCount, setTotalAsteroidsCount] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterType, setFilterType] = useState();
  const [apiURL, setApiURL] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef();
  const dispatch = useDispatch();

  const ITEMS_PER_PAGE = 10;
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = asteroids.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(asteroids.length / ITEMS_PER_PAGE);

  const formatDate = (date) => {
    return new Date(date).toISOString().slice(0, 10);
  };

  const getDateForExport = () => {
    let end_date = new Date();
    switch (filterType) {
      case "Today":
        end_date.setDate(end_date.getDate() + 1);
        break;
      case "7 Days":
        end_date.setDate(end_date.getDate() + 7);
        break;
      case "-7 Days":
        end_date.setDate(end_date.getDate() - 7);
        break;
      default:
        return;
    }
    const start_date = formatDate(new Date());
    end_date = formatDate(end_date);
    return { start_date, end_date };
  };

  const fetchURL = (start_date, end_date) => {
    setApiURL(
      `/feed?start_date=${start_date}&end_date=${end_date}&api_key=${process.env.REACT_APP_API_KEY}`
    );
  };

  const fetchAsteroids = async () => {
    if (apiURL) {
      setIsLoading(true);
      const res = await axios.get(apiURL);
      setTotalAsteroidsCount(res.data.element_count);
      let all = res.data.near_earth_objects;
      let asteroids = [];
      let concat_asteroids = [];
      for (let arr in all) {
        asteroids.push(all[arr]);
      }
      asteroids.forEach((arr) => {
        concat_asteroids = concat_asteroids.concat(arr);
      });
      let sortedAsteroids = concat_asteroids.sort(
        (a, b) =>
          new Date(a.close_approach_data[0].close_approach_date) -
          new Date(b.close_approach_data[0].close_approach_date)
      );
      setAsteroids(sortedAsteroids);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilterType(selectRef.current.value);
    const filter_date = getDateForExport();
    if (filter_date) {
      fetchURL(filter_date.start_date, filter_date.end_date);
      fetchAsteroids();
    }
  }, [filterType, apiURL]);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleFilterChange = (e) => {
    setAsteroids([]);
    setApiURL(null);
    setCurrentPage(0);
    setFilterType(e.target.value);
  };

  const formatMagnitude = (mag) => {
    return parseFloat(mag).toFixed(1);
  };

  console.log(asteroids);

  const handleAsteroidClick = (asteroid) => {
    dispatch(
      addCurrentAsteroid({
        name: asteroid.name,
        absolute_magnitude: asteroid.absolute_magnitude_h,
        est_diameter: asteroid.estimated_diameter.kilometers,
        is_hazardous: asteroid.is_potentially_hazardous_asteroid,
        close_approach_date:
          asteroid.close_approach_data[0].close_approach_date,
        miss_distance: asteroid.close_approach_data[0].miss_distance.kilometers,
        relative_velocity:
          asteroid.close_approach_data[0].relative_velocity
            .kilometers_per_second,
        orbiting_body: asteroid.close_approach_data[0].orbiting_body,
      })
    );

    dispatch(openModal());
    document.body.style.overflow = "hidden";
  };

  const generateTableAsPDF = () => {
    const filter_date = getDateForExport();
    const doc = new jsPDF({
      orientation: "p",
      format: "a2",
      unit: "pt",
    });
    doc.html(document.querySelector("#table-data"), {
      callback: function (doc) {
        doc.save(
          `Asteroids List (From ${filter_date.start_date} - To ${
            filter_date.end_date
          }) - page${currentPage + 1}.pdf`
        );
      },
    });
  };

  return (
    <TableContainer id="asteroid-table">
      <TableHeader>
        <Title>
          Asteroids:
          <AsteroidsCount>
            {!isLoading ? totalAsteroidsCount : "--"}
          </AsteroidsCount>
          <DatePick
            ref={selectRef}
            onChange={handleFilterChange}
            defaultValue="Today"
          >
            <DateOption value="-7 Days">-7 Days</DateOption>
            <DateOption value="Today">Today</DateOption>
            <DateOption value="7 Days">+7 Days</DateOption>
          </DatePick>
        </Title>
        <ExportButton onClick={generateTableAsPDF}>Export</ExportButton>
      </TableHeader>
      <Table id="table-data">
        <TableHead>
          <Row>
            <TH>ID</TH>
            <TH>NAME</TH>
            <TH>MAGNITUDE</TH>
            <TH>HAZARDOUS</TH>
            <TH>APPROACH DATE</TH>
          </Row>
        </TableHead>
        <TableBody>
          {!isLoading &&
            currentPageData.map((asteroid) => (
              <DataRow
                key={asteroid.id}
                onClick={() => handleAsteroidClick(asteroid)}
              >
                <Data>{asteroid.neo_reference_id}</Data>
                <Data>{asteroid.name}</Data>
                <Data
                  magnitude={parseFloat(
                    formatMagnitude(asteroid.absolute_magnitude_h)
                  )}
                >
                  {formatMagnitude(asteroid.absolute_magnitude_h)}
                </Data>
                <Data>
                  {asteroid.is_potentially_hazardous_asteroid ? (
                    <HazardousIcon src="/assets/images/is-hazardous.png" />
                  ) : (
                    "-"
                  )}
                </Data>
                <Data>
                  {asteroid.close_approach_data[0].close_approach_date}
                </Data>
              </DataRow>
            ))}
          {isLoading && (
            <Spinner
              name="line-scale-party"
              color="steelblue"
              className="table_loading_spinner"
            />
          )}
        </TableBody>
      </Table>
      {!isLoading && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      )}
    </TableContainer>
  );
};

export default AsteroidTable;

const TableContainer = styled.div`
  width: 100%;
  padding: 40px 110px;
  border-top: 1px solid var(--light-gray);
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;

  .pagination {
    width: max-content;
    display: flex;
    list-style: none;
    cursor: pointer;
    margin-top: 45px;
  }

  .pagination a {
    padding: 7px 20px;
    border-radius: 5px;
    border: 1px solid var(--light-gray);
    color: var(--light-purple);
    margin-right: 10px;
    font-size: 14px;
  }

  .pagination__link {
    background-color: transparent;
    border: 1px solid var(--light-gray);
  }

  .pagination__link--active a {
    background-color: var(--light-purple);
    color: var(--light-gray);
  }

  .pagination__link--disabled {
    cursor: not-allowed;
    display: none;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: var(--dark-purple);
`;

const ExportButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--light-purple);
  color: var(--light-purple);
  padding: 8px 12px;
  min-width: 110px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 250ms ease;

  &:hover {
    background-color: var(--light-purple);
    color: white;
  }
`;

const Table = styled.table`
  position: relative;
  width: 100%;
  margin-top: 12vh;
  border-collapse: collapse;
`;

const Row = styled.tr`
  width: 100%;
  border-bottom: 2px solid var(--light-gray);
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody`
  .table_loading_spinner {
    position: absolute;
    margin-top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const TH = styled.th`
  font-size: 13px;
  font-weight: 400;
  color: var(--dark-purple);
  text-align: center;
  padding-bottom: 10px;
`;

const DataRow = styled.tr`
  width: 100%;
  height: 46px;
  cursor: pointer;
  transition: all 250ms ease;

  &:nth-child(odd) {
    background-color: #faf9f9;
  }

  &:hover {
    background-color: #ffc8df;
  }
`;

const Data = styled.td`
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  color: ${(props) => props.magnitude >= 22.0 && "green"};
  color: ${(props) =>
    props.magnitude > 18.0 && props.magnitude < 22.0 && "orange"};
  color: ${(props) => props.magnitude <= 18.0 && "red"};
  font-weight: ${(props) => props.magnitude && "500"};
`;

const HazardousIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
`;

const DatePick = styled.select`
  font-size: 13px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  padding: 6px 15px;
  border: 1px solid var(--dark-purple);
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    background-color: whitesmoke;
  }
`;

const DateOption = styled.option``;

const AsteroidsCount = styled.span`
  color: var(--purple);
  margin-left: 10px;
`;
