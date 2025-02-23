import CreateStaffMain from "../../components/StaffInfoMain"

function page() {
  return (
    <CreateStaffMain method="POST" endpoint="create"/>
  )
}

export default page