import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForms from "../../components/form/CategoryForms";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  // handle onsubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      setName("");
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  // get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  // useEffect
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row" style={{ marginTop: "70px" }}>
          <div className="col-md-3">{<AdminMenu />}</div>
          <div className="col-md-9">
            <h2>Manage Category</h2>
            <div className="p-3">
              <CategoryForms
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr style={{ color: "white" }}>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody style={{ color: "white" }}>
                  {categories?.map((cate) => (
                    <>
                      <tr>
                        <td key={cate._id}>{cate.name}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
