import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJwt } from "../helper/jwt";
import { movedToHistory } from "../redux/actions/chckouttohistoryActions";
import { userOrderTrack } from "../redux/actions/userordertrackActions";

import Header from "./Header";

function Tracking() {
  const dispatch = useDispatch();
  const track = useSelector(({ userordertrack }) => userordertrack.data);

  const jwt = getJwt();

  useEffect(() => {
    dispatch(userOrderTrack(jwt));
  }, []);

  useEffect(() => {
    track &&
      track.map((track) => {
        if (track.delivered) {
          dispatch(movedToHistory(jwt));
        }
      });
  }, [track]);

  const handleTrack = (e, track) => {
    e.preventDefault();
    dispatch(userOrderTrack(jwt));
  };

  return (
    <div className="container px-1 px-md-4 py-5 mx-auto">
      {track &&
        track.map((track) => (
          <div key={track}>
            <div className="card">
              <div className="row d-flex justify-content-between px-3 top">
                <div className="d-flex">
                  <h5>
                    ORDER
                    <span className="text-primary font-weight-bold">
                      #{track._id}
                    </span>
                  </h5>
                </div>

                <div className="d-flex text-sm-right">
                  <p>
                    USER NAME
                    <span className="font-weight-bold">#{track.name}</span>
                  </p>
                </div>
                <div className="d-flex flex-column text-sm-right">
                  <p>
                    <span className="font-weight-bold">
                      <i
                        onClick={(e) => handleTrack(e, track)}
                        className="fa fa-refresh refresh"
                      ></i>
                    </span>
                  </p>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-12">
                  <ul id="progressbar" className="text-center">
                    <li className={`active step0`}></li>
                    <li
                      className={`${
                        track.status > 0 || track.status === 1 ? "active" : ""
                      } step0`}
                    ></li>
                    <li
                      className={`${
                        track.status > 1 || track.status === 2 ? "active" : ""
                      } step0`}
                    ></li>
                    <li
                      className={`${
                        track.status > 2 || track.status === 3 ? "active" : ""
                      } step0`}
                    ></li>
                  </ul>
                </div>
              </div>
              <div className="row justify-content-between top">
                <div className="row d-flex icon-content">
                  <img
                    className="icon"
                    src="https://i.imgur.com/9nnc9Et.png"
                    alt="9nnc9Et.png"
                  />
                  <div className="d-flex flex-column">
                    <p className="font-weight-bold">
                      Order
                      <br />
                      Processed
                    </p>
                  </div>
                </div>
                <div className="row d-flex icon-content">
                  {" "}
                  <img
                    className="icon"
                    src="https://i.imgur.com/u1AzR7w.png"
                    alt="u1AzR7w.png"
                  />
                  <div className="d-flex flex-column">
                    <p className="font-weight-bold">
                      Order
                      <br />
                      Shipped
                    </p>
                  </div>
                </div>
                <div className="row d-flex icon-content">
                  <img
                    className="icon"
                    src="https://i.imgur.com/TkPm63y.png"
                    alt="TkPm63y.png"
                  />
                  <div className="d-flex flex-column">
                    <p className="font-weight-bold">
                      Order
                      <br />
                      En Route
                    </p>
                  </div>
                </div>
                <div className="row d-flex icon-content">
                  <img
                    className="icon"
                    src="https://i.imgur.com/HdsziHP.png"
                    alt="HdsziHP.png"
                  />
                  <div className="d-flex flex-column">
                    <p className="font-weight-bold">
                      Order
                      <br />
                      Arrived
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-8">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Images</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Header(Tracking);
