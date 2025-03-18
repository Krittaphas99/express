import React, { useState, useEffect, useRef } from "react";

import Loadings from "@/components/front/loading";

import { ServiceInfoAPI } from "@/service/service";
import {
  ArrowPathIcon,
  EllipsisHorizontalCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { ServiceInfo } from "@/types/ServiceInfo";
import { PlusIcon } from "@heroicons/react/24/outline";
import FormPopup from "./form";

const Home: React.FC = () => {
  const [Services, setServices] = useState<ServiceInfo[]>([]);
  const [EditService, setEditService] = useState<ServiceInfo>();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openOptionsId, setOpenOptionsId] = useState<string | null>(null);
  const moreOptionsRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setOpenOptionsId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ServiceInfoAPI.getALL();
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch Services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  
  const handleRefresh = (id: string) => {
    ServiceInfoAPI.refresh(id)
      .then(() => {
        
      })
      .catch((error) => {
        console.error("Error deleting Service:", error);
        // เมื่อเกิดข้อผิดพลาดให้ reject
      });
  };

  
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      setServices((prevServices) =>
        prevServices.filter((Service) =>
          Service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const toggleMoreOptions = (id: string) => {
    setOpenOptionsId(openOptionsId === id ? null : id);
  };

  const handleOptionSelect = (option: string, id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (option === "Delete") {
        // เรียกใช้ API เพื่อลบข้อมูล
        ServiceInfoAPI.delete(id)
          .then(() => {
            // อัปเดตสถานะหลังจากลบข้อมูล
            setServices((prev) =>
              prev.filter((service) => service.idString !== id)
            );
            resolve(); // เมื่อสำเร็จให้ resolve
          })
          .catch((error) => {
            console.error("Error deleting Service:", error);
            reject(error); // เมื่อเกิดข้อผิดพลาดให้ reject
          });
      } else if (option === "Edit") {
        // ค้นหาข้อมูลบริการที่ต้องการแก้ไข
        const editService = Services.find((service) => service.idString === id);

        // ตรวจสอบว่าเจอข้อมูลหรือไม่
        if (editService) {
          setEditService(editService); // กำหนดข้อมูลที่จะแก้ไข
          setIsFormEditOpen(true); // เปิดฟอร์มเพื่อแก้ไข
          resolve(); // เมื่อสำเร็จให้ resolve
        } else {
          console.error("Service not found for editing.");
          reject(new Error("Service not found for editing.")); // reject ถ้าไม่เจอข้อมูล
        }
      }

      // รีเซ็ตตัวเลือกหลังจากทำงานเสร็จ
      setOpenOptionsId(null);
    });
  };

  if (loading) {
    return <Loadings />;
  }

  return (
    <div className="bg-white">
      <div className="absolute bottom-0 right-0 p-4">
        <div className="relative ml-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFormEditOpen(true)}
              type="button"
              className="relative flex items-center gap-2 rounded-full bg-purple-800 p-2 text-cyan-50 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <PlusIcon className="h-5 w-5 text-cyan-50" aria-hidden="true" />
              <span className="text-sm font-semibold">Add</span>
            </button>
            {}

            {/* Popup Login */}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Utac Automation Monitor
        </h2>
        <div className="flex items-center justify-center mt-6 w-full space-x-4 md:space-x-6">
          <FormPopup
            isOpen={isFormEditOpen}
            setIsOpen={setIsFormEditOpen}
            data={EditService}
          />
          <h2 className="text-2xl font-bold text-gray-900">Fine Service</h2>
          <form
            className="flex justify-start max-w-auto w-10xl"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-4 text-sm border rounded-lg"
              placeholder="ค้นหา.."
            />
            <button
              type="submit"
              className="text-white bg-purple-800 rounded-lg px-4 py-2"
            >
              Search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          {Services.map((Service) => (
            <button
              key={Service.idString}
              className="flex items-center bg-gray-200 shadow-lg rounded-2xl relative w-full text-left hover:bg-gray-300 transition-all"
              onClick={() => handleCardClick(Service.idString)} // เมื่อกดการ์ด
            >
              {Service.status === "on" ? (
                <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              ) : Service.status === "refresh" ? (
                <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
              ) : (
                <div className="absolute top-2 left-2 w-6 h-6 bg-red-900 rounded-full animate-pulse"></div>
              )}

              <div className="absolute bottom-5 right-2 ">
                <button
                  className="flex items-center bg-purple-800 p-2 text-white rounded-full transition-all hover:bg-purple-400"
                  onClick={(e) => {
                    e.stopPropagation(); // กันไม่ให้ event bubble ไปที่การ์ด
                    handleRefresh(Service.idString);
                  }}
                >
                  <ArrowPathIcon className="h-5 w-5" />
                  <span className="text-sm font-semibold">Refresh</span>
                </button>
              </div>

              <div className="absolute top-1 right-3">
                <button
                  ref={moreButtonRef}
                  className="p-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMoreOptions(Service.idString);
                  }}
                >
                  <EllipsisHorizontalCircleIcon className="h-5 w-5 text-gray-500" />
                </button>
                {openOptionsId === Service.idString && (
                  <div
                    ref={moreOptionsRef}
                    className="absolute top-4 left-3 bg-white shadow-lg rounded-lg p-2 space-y-2"
                  >
                    <button
                      onClick={() =>
                        handleOptionSelect("Edit", Service.idString)
                      }
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        handleOptionSelect("Delete", Service.idString)
                      }
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 w-2/3 mt-4">
                <h2 className="text-xl font-bold">{Service.plan}</h2>
                <p className="text-gray-600 mt-2">{Service.serviceName}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
