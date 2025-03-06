
import React, { useState, useEffect } from 'react'
import { ProductsAPI } from '@/service/api'
import { Product} from '@/types/product'
import { Link } from 'react-router'
import Loadings from "@/components/front/loading"
const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]) // ใช้ Product[] แทน Root[]
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductsAPI.getALL()
        console.log(response.data)
        setProducts(response.data['products'])
        console.log(products)
      } catch (error) {
        console.error('Failed to fetch products', error)
      } finally {
        setLoading(false) // ปิด loading
      }
    }
    // เรียกใช้ function fetchProducts
    fetchProducts()
  }, [])
  if (loading) {
    return <Loadings />
  }

  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ours Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.title}
                src={product.images[0]}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}`}  className="font-medium text-gray-900">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
)
}

export default Home
