'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { securityquestions } from '../zodSchema/createStaffSchema';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useSession } from 'next-auth/react';

const StaffInformationForm = ({
  register,
  handleSubmit,
  endpoint,
  method,
  profileData,
  staffParticulars,
  formState: { errors },
  setValue,
}: any) => {
  const session = useSession();
  const {
    staffDepartments: departments = [], // Default to an empty array if undefined
    staffDesignations: designations = [],
    staffRoles: roles = [],
    staffStatuses: statuses = [],
    staffCategories: categories = [],
  } = staffParticulars || {}; // Ensure staffParticulars itself is not undefined
  

  // Pre-fill form fields when profileData is available
  useEffect(() => {
    if (profileData) {
      setValue('staffName', profileData.staffName || '');
      setValue('staffDept', profileData.staffDept || '');
      setValue('staffDesignation', profileData.staffDesignation || '');
      setValue('staffCategory', profileData.staffCategory || '');
      setValue('status', profileData.status || '');
      setValue('role', profileData.role || '');
      setValue('phoneNumber', profileData.phoneNumber || '');
      setValue('address', profileData.address || '');
      setValue('email', profileData.email || '');
      setValue('collegeName', profileData.collegeName || '');
      setValue('securityQuestion', profileData.securityQuestion || '');
      setValue('securityAnswer', profileData.securityAnswer || '');
    }
  }, [profileData, setValue]);

  const onSubmit = async (data: any) => {
    const token = session.data?.user.accessToken;
    console.log('Token ::', token);

    try {
      console.log('Submitting:', data);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/staff/${endpoint}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      console.log('Staff Dept ::', profileData);
      console.log('Response:', response);
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Staff updated successfully',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  };

  return (
    <Card className="mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle className="text-gray-500">Staff Information Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-2 md:gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="staffName"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Staff Name
              </label>
              <Input
                id="staffName"
                placeholder="Staff Name"
                {...register('staffName')}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="staffDept"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <Select
                id="staffDept"
                onValueChange={(value) => setValue('staffDept', value)}
                defaultValue={profileData?.staffDept}
              >
                <SelectTrigger className="text-neutral-500">
                  <SelectValue placeholder="Select a Department" />
                </SelectTrigger>
                <SelectContent className="text-neutral-500">
                  {Array.isArray(departments) && departments.length > 0 ? (
                    departments.map((dept, index) => (
                      <SelectItem key={index} value={dept}>
                        {dept}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No departments available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="staffDesignation"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Designation
              </label>
              <Select
                id="staffDesignation"
                onValueChange={(value) => setValue('staffDesignation', value)}
                defaultValue={profileData?.staffDesignation}
              >
                <SelectTrigger className="text-neutral-500">
                  <SelectValue placeholder="Select a Designation" />
                </SelectTrigger>
                <SelectContent className="text-neutral-500">
                  {Array.isArray(designations) && designations.length > 0 ? (
                    designations.map((designation, index) => (
                      <SelectItem key={index} value={designation}>
                        {designation}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No designations available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="staffCategory"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <Select
                id="staffCategory"
                onValueChange={(value) => setValue('staffCategory', value)}
                defaultValue={profileData?.staffCategory}
              >
                <SelectTrigger className="text-neutral-500">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent className="text-neutral-500">
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No categories available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <Select
                id="status"
                onValueChange={(value) => setValue('status', value)}
                defaultValue={profileData?.status}
              >
                <SelectTrigger className="text-neutral-500">
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent className="text-neutral-500">
                  {Array.isArray(statuses) && statuses.length > 0 ? (
                    statuses.map((status, index) => (
                      <SelectItem key={index} value={status}>
                        {status}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No statuses available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <Select
                id="role"
                onValueChange={(value) => setValue('role', value)}
                defaultValue={profileData?.role}
              >
                <SelectTrigger className="text-neutral-500">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent className="text-neutral-500">
                  {Array.isArray(roles) && roles.length > 0 ? (
                    roles.map((role, index) => (
                      <SelectItem key={index} value={role}>
                        {role}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No roles available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                placeholder="Phone Number"
                {...register('phoneNumber')}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <Input
                id="address"
                placeholder="Address"
                {...register('address')}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register('email')}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="collegeName"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                College Name
              </label>
              <Input
                id="collegeName"
                placeholder="College Name"
                {...register('collegeName')}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="securityQuestion"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Security Question
              </label>
              <Select
                id="securityQuestion"
                onValueChange={(value) => setValue('securityQuestion', value)}
                defaultValue={profileData?.securityQuestion}
              >
                <SelectTrigger className="text-neutral-500">
                  <SelectValue placeholder="Select a Security Question" />
                </SelectTrigger>
                <SelectContent className="text-neutral-500">
                  {Array.isArray(securityquestions) && securityquestions.length > 0 ? (
                    securityquestions.map((question, index) => (
                      <SelectItem key={index} value={question}>
                        {question}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="">No security questions available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="securityAnswer"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Security Answer
              </label>
              <Input
                id="securityAnswer"
                placeholder="Security Answer"
                {...register('securityAnswer')}
              />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="w-1/4 mt-4 bg-blue-500 hover:bg-blue-600"
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StaffInformationForm;
