import {PrismaClient} from "@prisma/client";
import {
    TIME_REPORT_ROW_INDEX_EMPLOYEE_ID,
    TIME_REPORT_ROW_INDEX_HOURS_WORKED, TIME_REPORT_ROW_INDEX_JOB_GROUP,
    TIME_REPORT_ROW_INDEX_YMD
} from "@/app/model/timeReportRow";
import {DateTime} from "luxon";
import path from "path";
import formDataParts from "@/app/util/formDataParts";

/**
 * finds timeReportLines in <filepath>
 * saves timeReportItem for each line
 * @param filepath
 */
const processFormDataParts = async function(filepath: string): Promise<void> {
    const filename = filepath.substring(filepath.lastIndexOf(path.sep) + 1);
    const timeReportFileId = filename.substring(filename.lastIndexOf('-') + 1, filename.indexOf('.csv'));
    const parts = await formDataParts(filepath)

    if ( parts && parts.length > 0 ) {
        const prisma = new PrismaClient();
        const fileId = parseInt(timeReportFileId);
        for (const part of parts) {
            // expecting header, sample row:
            // date,hours worked,employee id,job group
            // 14/11/2023,7.5,1,A
            const lines = part.blob.split('\n');
            const createds = [];
            try {
                for (const line of lines) {
                    if (!line.startsWith("date") && line.trim().length > 0){
                        const fields = line.split(',');
                        const ymd = fields[TIME_REPORT_ROW_INDEX_YMD];
                        const ymds = ymd.split('/');
                        const year = parseInt(ymds[2]);
                        const month = parseInt(ymds[1]);
                        const dom = parseInt(ymds[0]);
                        const ymdIso = DateTime.local(year, month, dom);

                        const hoursWorked = fields[TIME_REPORT_ROW_INDEX_HOURS_WORKED];
                        const employeeId = fields[TIME_REPORT_ROW_INDEX_EMPLOYEE_ID];
                        const jobGroup = fields[TIME_REPORT_ROW_INDEX_JOB_GROUP];

                        const timeReportItem = await prisma.timeReportItem.create({
                            data: {
                                year: year,
                                month: month,
                                dom: dom,
                                ymd: ymdIso.toString(),
                                hoursWorked:  hoursWorked,
                                employeeId: employeeId,
                                jobGroup: jobGroup,
                                timeReportFileId: fileId
                            }
                        })
                        createds.push(timeReportItem);
                    }
                }
            } catch (error) {
                console.error(error)
            }
            console.log(`timeReportItems created: ${createds.length}`);
        }
        await prisma.$disconnect();
    } else {
        console.log(`no parts found in formdata`);
    }
}

export default processFormDataParts;