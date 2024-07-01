import AddBranchCard from '@/components/layout/Card/AddBranchCard';
import Navbar from '@/components/layout/Navbar';
import BranchesTable from '@/components/layout/Table/BranchesTable';
import UsersTable from '@/components/layout/Table/UsersTable';

export default function Dashboard() {
  return (
    <main className="p-5">
      <Navbar />
      <div className="w-full pt-3 mt-14">
        <AddBranchCard />
        <BranchesTable />
        <UsersTable />
      </div>
    </main>
  );
}
