import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/font';
import { fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
 
export default async function Page() {
  let revenue: any[] = [];
  let latestInvoices: any[] = [];
  let error: string | null = null;

  try {
    // 并行获取数据
    const [revenueData, invoicesData] = await Promise.all([
      fetchRevenue(),
      fetchLatestInvoices()
    ]);
    revenue = revenueData;
    latestInvoices = invoicesData;
  } catch (err) {
    error = '无法连接到数据库。请检查您的数据库配置或稍后重试。';
    console.error('Dashboard数据获取错误:', err);
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}