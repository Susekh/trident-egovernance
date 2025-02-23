import { createContext, SetStateAction, useContext, Dispatch } from 'react';

type HrData = {};

export const HrContext = createContext({
  hrData: {
    // createStaff:  {
    //     staffName: "",
    //     staffDept: "",
    //     staffDesignation: "",
    //     staffCategory: "",
    //     status: "",
    //     role: "",
    //     phoneNumber: "",
    //     address: "",
    //     email: "",
    //     username: "",
    //     collegeName: ""
    // },
  },
  setHrData: (updatedData: Dispatch<SetStateAction<HrData>>) => {},
});

export function useHr() {
  return useContext(HrContext);
}

export const HrProvider = HrContext.Provider;
