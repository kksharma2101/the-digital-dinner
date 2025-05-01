import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForms from "../../components/form/CategoryForms";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  console.log(categories);

  // handle onsubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/create-category`,
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
        `${process.env.REACT_APP_API_URL}/category/get-category`
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
      <div className="flex justify-center flex-col gap-16 md:grid md:grid-cols-2 p-4">
        <div className="">
          <h2 className="text-center font-bold mb-4 text-lg">All Category</h2>
          {categories?.map((cate) => (
            <tr>
              <td className="font-serif text-start" key={cate._id}>
                - {cate?.name}
              </td>
            </tr>
          ))}
        </div>
        <div className="flex justify-center flex-col mx-auto">
          <h2 className="text-center font-bold mb-4 text-lg">
            Create Category
          </h2>

          <CategoryForms
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
      </div>
      <div className="mt-20">{<AdminMenu />}</div>
    </Layout>
  );
};

export default CreateCategory;
