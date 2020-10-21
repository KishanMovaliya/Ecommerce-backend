import { Button, makeStyles, TextField } from "@material-ui/core"
import Axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react"

import Sidebar from "./Sidebar"

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));



function Product(props){
    const classes = useStyles();
    const [showProduct, setShowProduct] = useState([]);
    const [allSubCategory, setAllSubCategory] = useState([]);
    const [image, setImage] = useState([]);
    const [productDetails, setProductDetails] = useState({
      _id:"",
      categoryId: "",
      subcategoryId:"",
      images: "",
      title: "",
      descriptions:"",
      price:""
    });
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [error, setError] = useState([]);

    const selectAllProduct = () => {
      
      Axios.get("http://localhost:4444/products/selectAll")
      .then((res) => {
        setShowProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.status === 400) {
          setError(err.response.data.msg);
        }
      });
    }
    
    const selectAllSubCategory = () => {
      
      Axios.get("http://localhost:4444/subcategories/selectall")
      .then((res) => {
        setAllSubCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.status === 400) {
          setError(err.response.data.msg);
        }
      });
    }
    useEffect(()=>{
      selectAllProduct();
      selectAllSubCategory();

      Axios.get("http://localhost:4444/categories/selectall")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.status === 400) {
          setError(err.response.data.msg);
        }
      });
    }, [])
    const handleCategoryChange = (e) => {
      e.preventDefault();
      setProductDetails({...productDetails, categoryId: e.target.value});
      const id = e.target.value;
      Axios.get(`http://localhost:4444/subcategories/usecategoryid/${id}`)
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.status === 400) {
          setError(err.response.data.msg);
        }
      });
    }

    const handleSubChange = (e) => {
      e.preventDefault();
      setProductDetails({...productDetails, subcategoryId: e.target.value});
    }

    const handleFileChange = (e) => {
      e.preventDefault();
      setProductDetails({...productDetails, images: e.target.files[0]});
    }
    const handleUpdateFileChange = (e) => {
      e.preventDefault();
      setImage( e.target.files[0]);
    }

    const handleChange = (e) => {
      e.preventDefault();
      setProductDetails({...productDetails, [e.target.name]: e.target.value});
    }

    const handleDelete = (e, id) => {
      e.preventDefault();
      
      Axios.delete(`http://localhost:4444/products/deleteproduct/${id}`)
      .then((res) => {
        alert("Deleted Successfully.");
        selectAllProduct();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.status === 400) {
          setError(err.response.data.msg);
        }
      });
    }
    const handleUpdate = (e, id) => {
      e.preventDefault();
      Axios.get(`http://localhost:4444/products/selectproduct/${id}`)
      .then((res) => {
        selectAllSubCategory();   
        setProductDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.status === 400) {
          setError(err.response.data.msg);
        }
      });
    }
   
    const handleSubmit = (e) => {
      e.preventDefault();

      if(productDetails._id){
        const data = new FormData();
        data.append("title", productDetails.title);
        data.append("descriptions", productDetails.descriptions);
        data.append("price", productDetails.price);
        data.append("images", image);
        
        Axios.put(`http://localhost:4444/products/updateproduct/${productDetails._id}`, data)
        .then((res) => {
          setError("updated Successfully.");
          handleReset(e);
          selectAllProduct();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.status === 400) {
            setError(err.response.data.msg);
          }
        });
      } else {
        const data = new FormData();
        data.append("title", productDetails.title);
        data.append("descriptions", productDetails.descriptions);
        data.append("price", productDetails.price);
        data.append("images", productDetails.images);
        
        Axios.post(`http://localhost:4444/products/create/${productDetails.categoryId}/${productDetails.subcategoryId}`, data)
        .then((res) => {
          setError("Created Successfully.");
          handleReset(e);
          selectAllProduct();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.status === 400) {
            setError(err.response.data.msg);
          }
        });
      }
    };
    const handleReset = (e) => {
      e.persist();
      setProductDetails({
        _id:"",
        categoryId: "",
        subcategoryId:"",
        images: "",
        title: "",
        descriptions:"",
        price:""
      })
    }

    return (
      <>
        <div className="col-md-4 col-sm-12">
          {error ? <i style={{color:"red"}}>{error}</i> : ""}
        <form
          method="post"
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {productDetails._id ?
          <>
            <input type="hidden" name="_id" value={productDetails._id} />
            <div className="form-group">
              <label htmlFor="category">Category : </label>
              <select
                className="browser-default custom-select"
                name="category"
                value={productDetails.categoryId}
                >
                {categories.map((category) => {
                  if(productDetails.categoryId === category._id){
                    
                    return <option key={category._id} value={category._id}>{category.category}</option>
                  }
                })}  
                
              </select>
            </div>
          
            <div className="form-group">
              <label htmlFor="category">Sub Category : </label>
              <select
                className="browser-default custom-select"
                name="category"
                value={productDetails.subcategoryId}
                >
                {allSubCategory.map((subcategory) => {
                  if(productDetails.subcategoryId === subcategory._id){
                    
                    return <option key={subcategory._id} value={subcategory._id}>{subcategory.subcategory}</option>
                  }
                })}  
                
              </select>
            </div>
          </>
          : 
          <>
            <div className="form-group">
              <label htmlFor="category">Category : </label>
              <select
                className="browser-default custom-select"
                name="category"
                onChange={handleCategoryChange}
                value={productDetails.categoryId}
                >
                <option value="">--Select Category--</option>
                {categories.map((category) => 
                  <option key={category._id} value={category._id}>{category.category}</option>
                  )}  
                
              </select>
            </div>
          
            <div className="form-group">
              <label htmlFor="category">Sub Category : </label>
              <select
                  className="browser-default custom-select"
                  name="subcategory"
                  onChange={handleSubChange}
                  value={productDetails.subcategoryId}
                >
                  <option value="">--Select Sub Category--</option>
                  {subcategories
                    ? subcategories.map((subcategory) => (
                        <option key={subcategory._id} value={subcategory._id}>
                          {subcategory.subcategory}
                        </option>
                      ))
                    : ""}
                </select>
            </div>
          </>
          }
          
          {productDetails._id ? 
            <input
              type="file"
              name="images"
              onChange={handleUpdateFileChange}
            />     
           : 
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
            />
          }
                          
          <TextField
            label="title"
            name="title"
            type="text"
            style={{ width: 400 }}
            onChange={handleChange}
            value={productDetails.title}
          />
          
          <TextField
            label="descriptions"
            name="descriptions"
            type="text"
            style={{ width: 400 }}
            onChange={handleChange}
            value={productDetails.descriptions}
          />
          
          <TextField
            label="price"
            name="price"
            type="text"
            style={{ width: 400 }}
            onChange={handleChange}
            value={productDetails.price}
          />
          
          <br />
         
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            {productDetails._id ? "Update" : "Submit"}            
          </Button>
          <Button
            variant="contained"
            onClick={handleReset}
            style={{ marginTop: 20 }}
          >
            Cancle
          </Button>
        </form>
        </div>
        <div className="col-md-12 col-sm-12" style={{marginTop: 50}}>
          <table border="1" width="100%">
            <thead>
              <tr>
                <th>Images</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Title</th>
                <th>Descriptions</th>
                <th>Price</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {showProduct.map((product) => 
                <tr key={product._id}>
                  <td>
                    <img src={`http://localhost:4444/${product.images}`} alt={product.images} style={{width: 50, height:50}} />
                  </td>
                  {categories.map((category) => {
                  if(category._id === product.categoryId){
                    return <td key={product.categoryId}>{category.category}</td>;
                  }
                  })}
                  {allSubCategory.map((subcategory) => {
                  if(subcategory._id === product.subcategoryId){
                    return <td key={product.subcategoryId}>{subcategory.subcategory}</td>;
                  }
                  })}
                  <td>{product.title}</td>
                  <td>{product.descriptions}</td>
                  <td>{product.price}</td>
                  <td>
                    <button onClick={(e) => handleDelete(e, product._id)}>Delete</button>
                    <button onClick={(e) => handleUpdate(e, product._id)}>Update</button>
                  </td>
                </tr> 
              )}
            </tbody>
          </table>
        </div>
      </>
    )
}

export default Sidebar(Product)