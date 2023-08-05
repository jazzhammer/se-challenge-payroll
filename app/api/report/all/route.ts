import {NextRequest, NextResponse} from "next/server"
import {EmployeeReport} from "@/app/model/employeeReport";
import {PayrollReport} from "@/app/model/payrollReport";

import {PrismaClient} from "@prisma/client";
import {DateTime} from "luxon";
import JobGroup from "@/app/model/jobGroup";
import {PayPeriod} from "@/app/model/payPeriod";

export async function GET(request: NextRequest) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const amountByIdPeriod: Map<string, Map<string, number>> = new Map();
  const prisma = new PrismaClient();
  const timeReportItems = await prisma.timeReportItem.findMany({
    orderBy: [{
      employeeId: 'asc'
    }, {
      ymd: 'asc'
    }]
  })
  for (const item of timeReportItems) {
    const {year, month, dom} = item;
    let byPeriod = amountByIdPeriod.get(item.employeeId);

    if (!byPeriod) {
      byPeriod = new Map<string, number>();
      amountByIdPeriod.set(
        item.employeeId,
        byPeriod
      );
    }
    // const dt = DateTime.fromMillis(item.ymd.getMilliseconds());
    const startDate = `${year}-${month < 10 ? '0' : ''}${month}-${dom < 16 ? '01':'16'}`;
    const endDate = `${year}-${month < 10 ? '0' : ''}${month}-${dom < 16 ? '15':DateTime.local(year, month).daysInMonth}`;
    const periodIndex = `${startDate}/${endDate}`;
    const amount = byPeriod.get(periodIndex);
    let nextAmount = item.hoursWorked.toNumber() * <number>JobGroup.rateForGroup(item.jobGroup);
    byPeriod.set(periodIndex, (amount ? amount : 0) + nextAmount);
  }
  prisma.$disconnect();
  const employeeReports: EmployeeReport[] = [];
  amountByIdPeriod.forEach((byPeriod, id) => {
    byPeriod.forEach((periodAmount, period) => {
      const payPeriod: PayPeriod = {
        startDate: period.split('/')[0],
        endDate: period.split('/')[1],
      }
      const employeeReport: EmployeeReport = {
        employeeId: id,
        payPeriod: payPeriod,
        amountPaid: formatter.format(periodAmount)
      }
      employeeReports.push(employeeReport);
    });
  });
  const payrollReport =  {
    payrollReport: {
      employeeReports: employeeReports
    }
  }
  return NextResponse.json(payrollReport, {
    status: 200
  });
}


