import React, { useState, useEffect } from 'react'
import { ProductsAPI } from '@/service/api'
import { Product } from '@/types/product'
import { Link } from 'react-router'
import Loadings from "@/components/front/loading"

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]) // ใช้ Product[] แทน Root[]
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('') // สถานะเก็บคำค้นหา

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductsAPI.getALL()
        console.log(response.data)
        setProducts(response.data['products'])
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setLoading(false) // ปิด loading
      }
    }
    // เรียกใช้ function fetchProducts
    fetchProducts()
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = () => {
    // ฟังก์ชันนี้จะทำการค้นหาผลิตภัณฑ์ที่มีคำค้นหาตรงกับชื่อสินค้า
    if (searchTerm.trim()) {
      setProducts(prevProducts =>
        prevProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }

  if (loading) {
    return <Loadings />
  }

  const seenCategories = new Set<string>()
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ours Products</h2>

        {/* ส่วนของ Input Search และ ปุ่มค้นหา */}
        <form className="max-w-md mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" value={searchTerm}  onChange={handleSearchChange} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาสินค้า..." required />
        <button type="submit" className="text-white  onClick={handleSearchSubmit} absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

        

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            // ถ้ายังไม่เคยเจอ category นี้ ให้ทำการ map
            if (!seenCategories.has(product.category)) {
              seenCategories.add(product.category)
              return (
                <div key={product.id} className="group relative">
                  <img
                    alt={product.title}
                    src={product.images[0]}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/products/${product.id}`} className="font-medium text-gray-900">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.category}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.title}</p>
                    </div>
                  </div>
                </div>
              )
            }
            return null // ไม่แสดง element ถ้าเจอ category ซ้ำ
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
