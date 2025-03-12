import React, { useState, useEffect } from "react";


import { Link } from "react-router";
import Loadings from "@/components/front/loading";
import { ProJectInfo} from "@/types/ProJectInfo";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ProJectInfoAPI } from "@/service/api";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProJectInfo[]>([]); // ใช้ Product[] แทน Root[]
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // สถานะเก็บคำค้นหา

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProJectInfoAPI.getALL();
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false); // ปิด loading
      }
    };
    // เรียกใช้ function fetchProducts
    fetchProducts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    // // ฟังก์ชันนี้จะทำการค้นหาผลิตภัณฑ์ที่มีคำค้นหาตรงกับชื่อสินค้า
    // if (searchTerm.trim()) {
    //   setProducts((prevProducts) =>
    //     prevProducts.filter((ProJectInfo) =>
    //       ProJectInfo.serviceNametoLowerCase().includes(searchTerm.toLowerCase())
    //     )
    //   );
    // }
  };

  if (loading) {
    return <Loadings />;
  }

  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Utac Automation Monitor
        </h2>
        
        <div className="flex items-center justify-center mt-6 w-full space-x-4 md:space-x-6">
  <h2 className="text-2xl font-bold -tracking-normal text-gray-900">
    Project
  </h2>
  <form className="flex justify-start max-w-auto w-10xl" >    
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" value={searchTerm}  onChange={handleSearchChange} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหา.." required />
        <button type="submit" className="text-white  onClick={handleSearchSubmit} absolute end-2.5 bottom-2.5 bg-purple-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
  
</div>


{products.map((product) => {
            // ถ้ายังไม่เคยเจอ category นี้ ให้ทำการ map
          
              return (
                <div className="flex items-center bg-white shadow-lg rounded-2xl overflow-hidden relative">
                <img className="w-1/3 h-48 object-cover" src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png" alt="Placeholder" />
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full"></div>
                <div className="p-4 w-2/3">
                    <h2 className="text-xl font-bold">UTL</h2>
                    <p className="text-gray-600 mt-2">ServiceName: yado</p>
                </div>
            </div>
              )
            
           // ไม่แสดง element ถ้าเจอ category ซ้ำ
          })}






      </div>
    </div>
  );
};

export default Home;
