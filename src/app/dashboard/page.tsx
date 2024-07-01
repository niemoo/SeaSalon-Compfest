import AddBranchCard from '@/components/layout/Card/AddBranchCard';
import AddServiceCard from '@/components/layout/Card/AddServiceCard';
import AddServiceToBranchForm from '@/components/layout/Card/AddServiceToBranchForm';
import Navbar from '@/components/layout/Navbar';
import BranchesTable from '@/components/layout/Table/BranchesTable';
import UsersTable from '@/components/layout/Table/UsersTable';

export default function Dashboard() {
  return (
    <main className="p-5">
      <Navbar />
      <div className="max-w-screen-xl mx-auto pt-3 mt-14">
        <div>
          <div className="flex items-center justify-between">
            <div className="w-fit">
              <h3 className="text-lg font-semibold">Branches</h3>
              <hr className="border border-blue-500" />
            </div>
            <div className="flex gap-5 mb-5">
              <AddBranchCard />
              <AddServiceToBranchForm />
              <AddServiceCard />
            </div>
          </div>
          <hr className="my-5" />
          <BranchesTable />
        </div>
        <div className="mt-10">
          <div className="w-fit">
            <h3 className="text-lg font-semibold">Users</h3>
            <hr className="border border-blue-500" />
          </div>
          <hr className="my-5" />
          <UsersTable />
        </div>
      </div>
    </main>
  );
}
