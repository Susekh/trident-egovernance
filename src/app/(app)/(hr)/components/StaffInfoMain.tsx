'use client';

import { HrProvider } from '../context/createStaffContext';
import { useEffect, useState } from 'react';
import { CreateStaffFormSchema } from '../zodSchema/createStaffSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import StaffInformationForm from './StaffInformationForm';

function StaffInfoMain({ endpoint, method, profileData }: { endpoint: string; method: string; profileData?: any }) {
  const [hrData, setHrData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [staffParticulars, setStaffParticulars] = useState({});

  console.log("Profile Data ::", profileData);

  // Fetch the static input data
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/staff/dynamic-input?entityNames=StaffDepartmentEntity,StaffDesignationEntity,StaffCategoryEntity,StaffStatusEntity,StaffRoleEntity`);
        const data = await response.json();
        console.log("Data in dynamic input ::", data);
        setStaffParticulars(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching staff data:', error);
        setIsLoading(false);
      }
    };

    fetchStaffData();
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(CreateStaffFormSchema),
    defaultValues: {
      staffName: '',
      password: '',
      staffDept: '',
      staffDesignation: '',
      staffCategory: '',
      status: '',
      role: '',
      phoneNumber: '',
      address: '',
      email: '',
      securityQuestion: '',
      securityAnswer: '',
      collegeName: '',
    },
  });

  return (
    <HrProvider value={{ hrData, setHrData }}>
      <section>
        {!isLoading ? (
          <>
            <h1 className="ml-4 text-2xl uppercase text-gray-500 font-bold">
              {endpoint === 'create' ? 'Create a new staff' : 'Edit the staff details'}
            </h1>

            <StaffInformationForm
              register={register}
              endpoint={endpoint}
              method={method}
              profileData={profileData}
              handleSubmit={handleSubmit}
              formState={{ errors }}
              setValue={setValue}
              staffParticulars={staffParticulars}
            />
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </section>
    </HrProvider>
  );
}

export default StaffInfoMain;
