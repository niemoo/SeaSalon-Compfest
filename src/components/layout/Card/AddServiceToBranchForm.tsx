'use client';

import { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getAllBranches, getAllServices, addServiceToBranch } from '@/actions/actions';

interface Branches {
  id: number;
  name: string;
  location: string;
  opening_time: string;
  closing_time: string;
}

interface Services {
  id: number;
  name: string;
}

const AddServiceToBranchForm = () => {
  const [branches, setBranches] = useState<Branches[] | undefined>([]);
  const [services, setServices] = useState<Services[] | undefined>([]);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    const fetchBranchesAndServices = async () => {
      const responseBranches = await getAllBranches();
      if (responseBranches?.success) {
        setBranches(responseBranches?.data);
      } else {
        console.error(responseBranches.message);
      }
      const responseServices = await getAllServices();
      if (responseServices?.success) {
        setServices(responseServices?.data);
      } else {
        console.error(responseServices.message);
      }
    };
    fetchBranchesAndServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBranch && selectedService) {
      const response = await addServiceToBranch({ branchId: selectedBranch, serviceId: selectedService });
      if (response.success) {
        setSelectedBranch(null);
        setSelectedService(null);
        alert(response.message);
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center border border-blue-300 hover:bg-blue-500 hover:text-white rounded px-3 py-2">
        <IoMdAdd />
        <p>Add Branch Service</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Branch Service</DialogTitle>
          <DialogDescription>
            <hr className="mt-3 mb-5" />
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between">
                <select value={selectedBranch || ''} onChange={(e) => setSelectedBranch(parseInt(e.target.value))} required>
                  <option value="" disabled>
                    Select Branch
                  </option>
                  {branches?.map((branch: { id: number; name: string }) => (
                    <option key={branch?.id} value={branch?.id}>
                      {branch?.name}
                    </option>
                  ))}
                </select>
                <select value={selectedService || ''} onChange={(e) => setSelectedService(parseInt(e.target.value))} required>
                  <option value="" disabled>
                    Select Service
                  </option>
                  {services?.map((service: { id: number; name: string }) => (
                    <option key={service?.id} value={service?.id}>
                      {service?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end mt-5">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Add Service to Branch
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceToBranchForm;
