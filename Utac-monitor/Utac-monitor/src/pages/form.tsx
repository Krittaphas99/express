import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { ServiceInfo } from "@/types/ServiceInfo";
import { ServiceInfoAPI } from "@/service/service";


// กำหนดประเภทของ props ที่จะรับเข้ามา
interface FormPopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?:ServiceInfo;
 
}

const FormPopup: React.FC<FormPopupProps> = ({ isOpen, setIsOpen,data}) => {
  const [serviceName, setServiceName] = useState<string>("");
  const [plan, setPlan] = useState<string>("");
  const [Ip, setIp] = useState<string>("");
  const [Port, setPort] = useState<string>();
  const [Endpoint, setEndpoint] = useState<string>("");

  // ใช้ useEffect เพื่อเติมข้อมูลในฟอร์มเมื่อข้อมูลจาก parent มา
  useEffect(() => {
    
    if (data) {
      setServiceName(data.serviceName || "");
      setPlan(data.plan || "");
      setIp(data.ip || "");
      setPort(data.port.toString() || "");
      setEndpoint(data.endpoint || "");
    }
  }, [data]);
  const handleSummit = () => {
    if (!serviceName || !plan ||!Ip || !Port || !Endpoint) {
      alert("Please fill in all fields");
      return;
    }
    else{
      if (data) {
        data.serviceName = serviceName;
        data.plan = plan;
        data.ip = Ip;
        data.port = parseInt(Port);
        data.endpoint = Endpoint;
        ServiceInfoAPI.update(data?.idString,data)
      .then(() => {
        setIsOpen(false)
        alert("Service updated successfully");
     // เมื่อสำเร็จให้ resolve
      })
      .catch((error) => {
        console.error("Error deleting Service:", error);
         // เมื่อเกิดข้อผิดพลาดให้ reject
      });
      }


      
    }
   console.log(serviceName,plan,Ip,Port,Endpoint)
   
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        {/* Overlay ที่ป้องกันไม่ให้คลิกปิด */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed bg-white p-6 rounded-lg w-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* ปุ่มปิด */}
          <button
            onClick={() => setIsOpen(false)} // ปิด Dialog เมื่อคลิกปุ่มนี้
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">Edit</h2>
          <input
            type="ServiceName"
            placeholder="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="plan"
            placeholder="Plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />

          <div className="flex flex-row gap-4"> 
          <input
            type="Ip"
            placeholder="Ip"
            value={Ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
           <input
            type="port"
            placeholder="port"
            value={Port}
            maxLength={5}
            onChange={(e) => setPort(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          
          </div>
          <input
            type="Endpoint"
            placeholder="Endpoint"
            value={Endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />
          <button
            onClick={handleSummit}
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
          >
            save
          </button>

          
          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FormPopup;
function setIsLoggedIn(arg0: boolean) {
    throw new Error("Function not implemented.");
}

