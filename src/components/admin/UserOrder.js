import React, { useEffect } from "react";
import Header from "./Sidebar";
import ecom from "../../assets/slider-images/ecom-slide-1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../../redux/actions/adminuserorderActions";
import { getJwt } from "../../helper/jwt";
import { updateOrderStatus } from "../../redux/actions/adminorderstatusActions";

function UserOrder() {
  const dispatch = useDispatch();
  const userOrders = useSelector(({ adminuserorder }) => adminuserorder.data);

  const jwt = getJwt();

  useEffect(() => {
    dispatch(getUserOrder(jwt));
  }, []);

  const handleOrderConfirmed = (e, userOrder) => {
    e.preventDefault();

    dispatch(updateOrderStatus(userOrder, jwt));
  };

  const handleAlert = (e, alertmessage) => {
    e.preventDefault();
    alert(alertmessage);
  };

  return (
    <div className="col-md-12 col-sm-12" style={{ marginTop: 50 }}>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">user name</th>
            <th scope="col">user contact</th>
            <th scope="col">address</th>
            <th scope="col">product detail</th>
            <th scope="col">order shipped</th>
            <th scope="col">order in route</th>
            <th scope="col">order deliverd</th>
          </tr>
        </thead>
        <tbody>
          {userOrders &&
            userOrders.map((userOrder) => (
              <tr key={userOrder}>
                <td scope="row">{userOrder.name}</td>
                <td>{userOrder.contact}</td>
                <td>{userOrder.address}</td>
                <td>
                  {userOrder.addtocartId &&
                    userOrder.addtocartId.map((orderproduct) => (
                      <div key={orderproduct}>
                        <span>
                          <img
                            src={`http://localhost:4444/${orderproduct.productId.images}`}
                            style={{ height: 50, width: 50, margin: 10 }}
                          />
                        </span>
                        <span>
                          <i>{orderproduct.productId.title}</i>
                          <b>$ {orderproduct.productId.price}</b>
                        </span>
                      </div>
                    ))}
                </td>
                <td>
                  <button
                    className={`${
                      userOrder.status > 0 ? "isConfirm" : "isnotConfirm"
                    } `}
                    onClick={(e) => handleOrderConfirmed(e, userOrder)}
                  >
                    Shipped
                  </button>
                </td>
                <td>
                  {userOrder.status === 0 ? (
                    <button
                      className={`disablebtn`}
                      onClick={(e) =>
                        handleAlert(
                          e,
                          "first you need to ship confirmed order."
                        )
                      }
                    >
                      on Route
                    </button>
                  ) : (
                    <button
                      className={`${
                        userOrder.status > 1 ? "isConfirm" : "isnotConfirm"
                      } `}
                      onClick={(e) => handleOrderConfirmed(e, userOrder)}
                    >
                      on Route
                    </button>
                  )}
                </td>
                <td>
                  {userOrder.status === 0 || userOrder.status === 1 ? (
                    <button
                      className={`disablebtn`}
                      onClick={(e) =>
                        handleAlert(e, "on route button missed up.")
                      }
                    >
                      Deliverd
                    </button>
                  ) : (
                    <button
                      className={`${
                        userOrder.status > 2 ? "isConfirm" : "isnotConfirm"
                      } `}
                      onClick={(e) => handleOrderConfirmed(e, userOrder)}
                    >
                      Deliverd
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Header(UserOrder);
