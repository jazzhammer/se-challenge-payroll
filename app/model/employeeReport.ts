import {PayPeriod} from "@/app/model/payPeriod";

export interface EmployeeReport {
    "employeeId": string;
    "payPeriod": PayPeriod;
    "amountPaid": string;
}